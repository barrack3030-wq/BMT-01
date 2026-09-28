const APP_NAME = 'BMT Al-Muhajirin CMS';
const USERS_FILE_NAME = 'DB_USERS';
const USERS_SHEET_NAME = 'users';
const SESSION_LOGIN = 'IS_LOGIN';
const SESSION_EMAIL = 'USER_EMAIL';
const SESSION_ROLE = 'USER_ROLE';
const SESSION_NAME = 'USER_NAME';

function doGet(e) {
  try {
    const params = e && e.parameter ? e.parameter : {};
    const page = String(params.page || '').toLowerCase();
    const props = PropertiesService.getUserProperties();
    const isLogin = props.getProperty(SESSION_LOGIN) === 'true';

    if (page === 'dashboard' && isLogin) {
      return renderPage_('Dashboard', {
        webAppUrl: ScriptApp.getService().getUrl() || '',
        page: 'dashboard',
        bootError: ''
      });
    }

    if (page === 'login' || !isLogin) {
      return renderPage_('Login', {
        webAppUrl: ScriptApp.getService().getUrl() || '',
        page: 'login',
        bootError: ''
      });
    }

    return renderPage_('Dashboard', {
      webAppUrl: ScriptApp.getService().getUrl() || '',
      page: 'dashboard'
    });
  } catch (error) {
    return renderPage_('Login', {
      webAppUrl: ScriptApp.getService().getUrl() || '',
      page: 'login',
      bootError: safeMessage_(error)
    });
  }
}

function renderPage_(fileName, data) {
  try {
    const template = HtmlService.createTemplateFromFile(fileName);
    Object.keys(data || {}).forEach(function(key) {
      template[key] = data[key];
    });
    return template
      .evaluate()
      .setTitle(APP_NAME)
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (error) {
    return HtmlService.createHtmlOutput(
      '<!doctype html><html><body style="font-family:Arial;padding:30px">' +
      '<h2>CMS tidak dapat dimuat</h2><p>' +
      escapeHtml_(safeMessage_(error)) +
      '</p></body></html>'
    ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
}

function include(filename) {
  try {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  } catch (error) {
    return '<div style="padding:12px;border:1px solid #eccaca;background:#fff4f4;color:#8a3030">Gagal memuat komponen: ' +
      escapeHtml_(safeMessage_(error)) + '</div>';
  }
}

function doLogin(email, password) {
  try {
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPassword = String(password || '');

    if (!cleanEmail || !cleanPassword) {
      return { success: false, message: 'Email dan password wajib diisi.' };
    }

    if (!isValidEmail_(cleanEmail)) {
      return { success: false, message: 'Format email tidak valid.' };
    }

    const sheet = getUsersSheet_();
    const lastRow = sheet.getLastRow();
    const lastColumn = Math.max(sheet.getLastColumn(), 4);

    if (lastRow < 2) {
      return { success: false, message: 'Database users masih kosong.' };
    }

    const values = sheet.getRange(1, 1, lastRow, lastColumn).getDisplayValues();
    const headers = values[0].map(function(value) {
      return String(value || '').trim().toLowerCase();
    });

    const emailCol = headers.indexOf('email');
    const passwordCol = headers.indexOf('password_hash');
    const roleCol = headers.indexOf('role');
    const nameCol = headers.indexOf('nama');

    if (emailCol < 0 || passwordCol < 0 || roleCol < 0 || nameCol < 0) {
      return {
        success: false,
        message: 'Header Sheet users harus: email | password_hash | role | nama.'
      };
    }

    let found = null;

    for (let i = 1; i < values.length; i++) {
      const rowEmail = String(values[i][emailCol] || '').trim().toLowerCase();
      if (rowEmail === cleanEmail) {
        found = {
          email: rowEmail,
          passwordHash: String(values[i][passwordCol] || '').trim(),
          role: String(values[i][roleCol] || '').trim().toLowerCase(),
          nama: String(values[i][nameCol] || '').trim()
        };
        break;
      }
    }

    if (!found) {
      return { success: false, message: 'Email atau password salah.' };
    }

    if (found.role !== 'admin' && found.role !== 'user') {
      return { success: false, message: 'Role pengguna tidak valid. Gunakan admin atau user.' };
    }

    if (!verifyPassword_(cleanPassword, found.passwordHash)) {
      return { success: false, message: 'Email atau password salah.' };
    }

    const props = PropertiesService.getUserProperties();
    props.setProperties({
      IS_LOGIN: 'true',
      USER_EMAIL: found.email,
      USER_ROLE: found.role,
      USER_NAME: found.nama || found.email
    }, true);

    return {
      success: true,
      role: found.role,
      email: found.email,
      nama: found.nama || found.email
    };
  } catch (error) {
    return {
      success: false,
      message: 'Login gagal: ' + safeMessage_(error)
    };
  }
}

function doLogout() {
  try {
    PropertiesService.getUserProperties().deleteAllProperties();
    return true;
  } catch (error) {
    return false;
  }
}

function getCurrentUser() {
  try {
    const props = PropertiesService.getUserProperties();
    if (props.getProperty(SESSION_LOGIN) !== 'true') {
      return null;
    }

    const email = props.getProperty(SESSION_EMAIL) || '';
    const role = props.getProperty(SESSION_ROLE) || '';
    const nama = props.getProperty(SESSION_NAME) || email;

    if (!email || !role) {
      props.deleteAllProperties();
      return null;
    }

    return {
      loggedIn: true,
      email: email,
      role: role,
      nama: nama
    };
  } catch (error) {
    return null;
  }
}

function checkDatabase() {
  try {
    const sheet = getUsersSheet_();
    const headers = sheet.getRange(1, 1, 1, Math.max(4, sheet.getLastColumn()))
      .getDisplayValues()[0]
      .map(function(value) { return String(value || '').trim().toLowerCase(); });

    const required = ['email', 'password_hash', 'role', 'nama'];
    const missing = required.filter(function(item) {
      return headers.indexOf(item) < 0;
    });

    return {
      success: missing.length === 0,
      file: USERS_FILE_NAME,
      sheet: USERS_SHEET_NAME,
      headers: headers,
      missingHeaders: missing,
      rows: Math.max(0, sheet.getLastRow() - 1)
    };
  } catch (error) {
    return {
      success: false,
      message: safeMessage_(error)
    };
  }
}

function makePasswordHash(password) {
  try {
    const value = String(password || '');
    if (!value) {
      return { success: false, message: 'Password kosong.' };
    }
    return { success: true, password_hash: hashPassword_(value) };
  } catch (error) {
    return { success: false, message: safeMessage_(error) };
  }
}

function getUsersSheet_() {
  const files = DriveApp.getFilesByName(USERS_FILE_NAME);

  if (!files.hasNext()) {
    throw new Error('Spreadsheet DB_USERS tidak ditemukan di Google Drive akun pemilik script.');
  }

  const first = files.next();
  const spreadsheet = SpreadsheetApp.open(first);
  const sheet = spreadsheet.getSheetByName(USERS_SHEET_NAME);

  if (!sheet) {
    throw new Error('Sheet users tidak ditemukan di spreadsheet DB_USERS.');
  }

  return sheet;
}

function verifyPassword_(password, storedHash) {
  const inputHash = hashPassword_(password).toLowerCase();
  const stored = String(storedHash || '').trim();

  if (!stored) return false;

  if (inputHash === stored.toLowerCase()) return true;

  const base64Hash = Utilities.base64Encode(
    Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      password,
      Utilities.Charset.UTF_8
    )
  );

  return base64Hash === stored;
}

function hashPassword_(password) {
  const bytes = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    String(password),
    Utilities.Charset.UTF_8
  );

  return bytes.map(function(byte) {
    const value = byte < 0 ? byte + 256 : byte;
    return ('0' + value.toString(16)).slice(-2);
  }).join('');
}

function isValidEmail_(email) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

function safeMessage_(error) {
  try {
    return error && error.message ? String(error.message) : String(error || 'Unknown error');
  } catch (ignore) {
    return 'Unknown error';
  }
}

function escapeHtml_(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
