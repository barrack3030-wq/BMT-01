const APP_NAME='BMT Al-Muhajirin CMS',DB_KEY='CMS_SPREADSHEET_ID',PW_KEY='CMS_PASSWORD_HASH',ADMIN_PASSWORD_KEY='CMS_ADMIN_PASSWORD',FOLDER_KEY='CMS_MEDIA_FOLDER_ID',SESSION_TTL=21600;

function doGet(e){
  const a=e?.parameter?.action||'';
  if(a==='public') return publicApi_(e);
  return HtmlService.createTemplateFromFile('Index').evaluate().setTitle(APP_NAME).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
function setupCms(){
  const db=getDb_(); ensureHeaders_(db); ensureDefaults_(db); getMediaFolder_();
  return {ok:true,spreadsheetUrl:db.getUrl(),webAppUrl:ScriptApp.getService().getUrl()||''};
}
function setAdminPassword(password){
  if(!password||String(password).length<5) throw new Error('Password minimal 5 karakter.');
  PropertiesService.getScriptProperties().setProperty(PW_KEY,hash_(String(password))); return {ok:true};
}
function login(password){
  const expected=PropertiesService.getScriptProperties().getProperty(ADMIN_PASSWORD_KEY);
  if(!expected) throw new Error('Password CMS belum diatur. Tambahkan Script Property CMS_ADMIN_PASSWORD.');
  const entered=String(password||'');
  if(entered.length<5) throw new Error('Password minimal 5 karakter.');
  if(entered!==String(expected)) throw new Error('Password salah.');
  const token=Utilities.getUuid()+Utilities.getUuid();
  CacheService.getScriptCache().put('session:'+token,'1',SESSION_TTL);
  return {ok:true,token,bootstrap:getBootstrapData_()};
}
function logout(token){if(token)CacheService.getScriptCache().remove('session:'+token);return{ok:true};}
function getBootstrap(token){assertSession_(token);return getBootstrapData_();}
function saveRecord(token,section,record){
  assertSession_(token); if(!section||!record?.id)throw new Error('Data tidak lengkap.');
  const sh=ensureHeaders_(getDb_()), rows=sh.getDataRange().getValues(), vals=[section,String(record.id),JSON.stringify(record),new Date()];
  let row=-1; for(let i=1;i<rows.length;i++){if(String(rows[i][0])===String(section)&&String(rows[i][1])===String(record.id)){row=i+1;break;}}
  if(row<0)sh.appendRow(vals);else sh.getRange(row,1,1,4).setValues([vals]); return{ok:true,record};
}
function savePage(token,id,data){return saveRecord(token,'pages',Object.assign({id},data));}
function saveSettings(token,data){return saveRecord(token,'settings',Object.assign({id:'global'},data));}
function deleteRecord(token,section,id){
  assertSession_(token);const sh=ensureHeaders_(getDb_()),rows=sh.getDataRange().getValues();
  for(let i=1;i<rows.length;i++){if(String(rows[i][0])===String(section)&&String(rows[i][1])===String(id)){sh.deleteRow(i+1);break;}}
  return{ok:true};
}
function uploadImage(token,base64,fileName,mime){
  assertSession_(token);const f=getMediaFolder_(), b=Utilities.newBlob(Utilities.base64Decode(String(base64).replace(/^data:[^;]+;base64,/,'')),mime||'image/jpeg',sanitize_(fileName));
  const file=f.createFile(b);try{file.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW)}catch(e){}
  return{url:'https://drive.google.com/uc?export=view&id='+file.getId(),id:file.getId(),name:file.getName()};
}
function exportData(token){assertSession_(token);return getBootstrapData_();}
function importData(token,payload){
  assertSession_(token);const sh=ensureHeaders_(getDb_()),r=sh.getDataRange().getValues();if(r.length>1)sh.deleteRows(2,r.length-1);
  const out=[];
  Object.keys(payload||{}).forEach(s=>{
    if(s==='meta')return;
    const v=payload[s];
    if(s==='settings' && v && typeof v==='object') out.push(['settings','global',JSON.stringify(v),new Date()]);
    else if(s==='pages' && v?.about) out.push(['pages','about',JSON.stringify(v.about),new Date()]);
    else if(Array.isArray(v)) v.forEach(x=>x?.id&&out.push([s,String(x.id),JSON.stringify(x),new Date()]));
  });
  if(out.length)sh.getRange(2,1,out.length,4).setValues(out);return getBootstrapData_();
}
function publicApi_(e){
  const data=getBootstrapData_(),json=JSON.stringify(data),cb=e?.parameter?.callback||'';
  if(cb&&/^[A-Za-z_$][0-9A-Za-z_$.]*$/.test(cb))return ContentService.createTextOutput(cb+'('+json+');').setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
function getBootstrapData_(){
  const all=readRecords_(getDb_());
  return {
    settings:all.settings?.[0]||{},pages:{about:all.pages?.find(x=>x.id==='about')||{}},
    products:all.products||[],articles:all.articles||[],board:all.board||[],testimonials:all.testimonials||[],branches:all.branches||[],faq:all.faq||[],
    meta:{updatedAt:new Date().toISOString(),webAppUrl:ScriptApp.getService().getUrl()||''}
  };
}
function readRecords_(db){
  const v=ensureHeaders_(db).getDataRange().getValues(),o={};
  for(let i=1;i<v.length;i++){const s=String(v[i][0]||''),j=String(v[i][2]||'');if(!s||!j)continue;try{(o[s]||(o[s]=[])).push(JSON.parse(j))}catch(e){}}
  return o;
}
function ensureDefaults_(db){
  const all=readRecords_(db);if(Object.keys(all).some(k=>all[k]?.length))return;
  const d=getDefaultData_(),sh=ensureHeaders_(db),rows=[];
  Object.keys(d).forEach(s=>{
    const v=d[s];
    if(s==='settings' && v && typeof v==='object') rows.push(['settings','global',JSON.stringify(v),new Date()]);
    else if(s==='pages' && v && typeof v==='object') rows.push(['pages','about',JSON.stringify(v),new Date()]);
    else if(Array.isArray(v)) v.forEach(x=>rows.push([s,String(x.id),JSON.stringify(x),new Date()]));
  });
  if(rows.length)sh.getRange(2,1,rows.length,4).setValues(rows);
}
function getDefaultData_(){
  return {
    settings:{id:'global',siteName:'BMT Al-Muhajirin Toili',tagline:'Berjuang Bersama Ummat Keluar Dari Riba',logoUrl:'/BMT-01/images/logo/logo%20BMT.png',logoWidth:160,heroImages:[
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2000&q=85',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=85'],backgroundImage:'',promoImage:'',promoTitle:'Promo & Ucapan Hari Besar',promoDescription:'Informasi promo atau ucapan hari besar.',chatLabel:'Chat Admin',chatUrl:'',instagramUrl:'https://www.instagram.com/bmtalmuhajirin_official/',facebookUrl:'https://web.facebook.com/profile.php?id=61573199156163',topbarText:'KANTOR PUSAT TOILI',operatingHours:'Senin – Jumat 08.00 – 16.00 WITA'},
    pages:{id:'about',title:'Tentang Kami',heading:'KSPPS BMT Al-Muhajirin Toili',paragraphs:['BMT Al-Muhajirin hadir untuk melayani kebutuhan keuangan masyarakat melalui prinsip syariah.','Baitul Maal mengelola dana sosial, sedangkan Baitul Tamwil menjalankan layanan simpanan dan pembiayaan produktif anggota.'],vision:'Menjadi lembaga keuangan syariah yang mandiri, sehat, dan dipercaya dalam menopang perekonomian masyarakat.',mission:['Menghimpun dan menyalurkan dana sesuai prinsip syariah.','Memperkuat permodalan usaha anggota.','Mendukung program sosial dan pemberdayaan masyarakat.'],legality:'Informasi legalitas, pengawasan, dan kepatuhan lembaga.'},
    products:[
      {id:'simpanan-mudharabah',badge:'Bagi Hasil',title:'Simpanan Mudharabah',description:'Simpanan dengan skema bagi hasil kemitraan.',features:['Skema bagi hasil','Tanpa biaya administrasi bulanan','Dana dikelola pada usaha riil halal'],image:'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80',imageAlt:'Layanan simpanan syariah',akad:'Akad Mudharabah Muthlaqah',active:true,order:1},
      {id:'pembiayaan-syariah',badge:'Margin Tetap',title:'Pembiayaan Syariah',description:'Pembiayaan modal kerja, barang dagangan, dan kebutuhan produktif.',features:['Margin disepakati di awal','Jadwal angsuran fleksibel','Untuk usaha produktif'],image:'https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&w=800&q=80',imageAlt:'Layanan pembiayaan syariah',akad:'Akad Murabahah',active:true,order:2},
      {id:'tabungan-qurban',badge:'Terencana',title:'Tabungan Qurban',description:'Simpanan terencana untuk persiapan pengadaan hewan qurban.',features:['Setoran fleksibel','Tanpa biaya administrasi','Mendukung peternak lokal'],image:'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',imageAlt:'Persiapan qurban',akad:'Akad Wadiah',active:true,order:3}],
    articles:[
      {id:'art-01',category:'Pemberdayaan',date:'24 Sep 2026',meta:'24 Sep 2026',title:'Kiprah Pemberdayaan Ekonomi Petani dan Pedagang di Toili',excerpt:'Penyaluran pembiayaan produktif dan pendampingan usaha bagi masyarakat Toili.',image:'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80',imageAlt:'Petani di persawahan Toili',tags:['Pertanian','Toili'],featured:true,contentParagraphs:['BMT Al-Muhajirin memperkuat peran ta’awun dalam menggerakkan ekonomi riil masyarakat.','Pendampingan tata kelola keuangan terus dilakukan untuk membantu anggota mengelola usaha dengan lebih tertib.'],published:true},
      {id:'art-02',category:'Laporan',date:'19 Sep 2026',meta:'19 Sep 2026',title:'RAT: Aset Koperasi Tumbuh 24%',excerpt:'Laporan pertanggungjawaban tahunan dan perkembangan layanan anggota.',image:'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',imageAlt:'Kantor BMT',tags:['RAT','Koperasi'],featured:false,contentParagraphs:['Rapat Anggota Tahunan menjadi ruang transparansi dan evaluasi bersama anggota.'],published:true},
      {id:'art-03',category:'Layanan',date:'10 Sep 2026',meta:'10 Sep 2026',title:'Armada Kas Keliling Layani Transaksi di Pasar Sentral Toili',excerpt:'Fasilitas layanan transaksi bagi pedagang pasar dan anggota.',image:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',imageAlt:'Petugas layanan BMT',tags:['Layanan'],featured:false,contentParagraphs:['Layanan kas keliling membantu anggota bertransaksi lebih dekat dengan aktivitas usaha mereka.'],published:true}],
    board:[
      {id:'board-01',name:'Nama Ketua',role:'Ketua',badge:'Pengurus',photo:'',quote:'Menjaga amanah anggota dengan tata kelola yang transparan.',order:1,active:true},
      {id:'board-02',name:'Nama Sekretaris',role:'Sekretaris',badge:'Pengurus',photo:'',quote:'Membangun layanan yang tertib, cepat, dan ramah.',order:2,active:true},
      {id:'board-03',name:'Nama Bendahara',role:'Bendahara',badge:'Pengurus',photo:'',quote:'Menjaga pengelolaan keuangan tetap disiplin dan bertanggung jawab.',order:3,active:true}],
    testimonials:[
      {id:'testi-1',name:'Nama Anggota',role:'Anggota',location:'Toili',memberSince:'Anggota sejak 2024',productUsed:'Pembiayaan Syariah',quote:'Pelayanan BMT membantu kami mengembangkan usaha secara lebih terencana.',avatarText:'NA',avatarImage:'',rating:5,active:true},
      {id:'testi-2',name:'Nama Anggota 2',role:'Pedagang',location:'Toili',memberSince:'Anggota sejak 2023',productUsed:'Simpanan',quote:'Layanan yang dekat dengan kebutuhan usaha dan keluarga.',avatarText:'NA',avatarImage:'',rating:5,active:true}],
    branches:[
      {id:'toili',name:'Kantor Pusat Toili',badgeTitle:'Kantor Pusat',address:'Toili, Kab. Banggai, Sulawesi Tengah',hours:'Senin – Jumat : 08.00 – 16.00 WITA',phone:'',whatsapp:'',mapsUrl:'https://maps.google.com/?q=Toili,+Kabupaten+Banggai,+Sulawesi+Tengah',image:'',mapEmbedQuery:'Toili, Kabupaten Banggai, Sulawesi Tengah',active:true,order:1},
      {id:'luwuk',name:'Cabang Luwuk',badgeTitle:'Cabang Pelayanan',address:'Luwuk, Kab. Banggai, Sulawesi Tengah',hours:'Senin – Jumat : 08.00 – 16.00 WITA',phone:'',whatsapp:'',mapsUrl:'https://maps.google.com/?q=Luwuk,+Kabupaten+Banggai,+Sulawesi+Tengah',image:'',mapEmbedQuery:'Luwuk, Kabupaten Banggai, Sulawesi Tengah',active:true,order:2}],
    faq:[
      {id:'faq-1',question:'Apa itu BMT?',answer:'BMT adalah lembaga yang mengelola fungsi Baitul Maal dan Baitul Tamwil dengan prinsip syariah.',active:true,order:1},
      {id:'faq-2',question:'Bagaimana cara menjadi anggota?',answer:'Hubungi kantor atau admin untuk mendapatkan informasi dan formulir keanggotaan.',active:true,order:2}]
  };
}
function getDb_(){
  const p=PropertiesService.getScriptProperties();let id=p.getProperty(DB_KEY);
  if(id)try{return SpreadsheetApp.openById(id)}catch(e){}
  const db=SpreadsheetApp.create(APP_NAME+' Database');p.setProperty(DB_KEY,db.getId());return db;
}
function ensureHeaders_(db){
  let sh=db.getSheetByName('CMS_DATA');if(!sh)sh=db.insertSheet('CMS_DATA');
  if(sh.getLastRow()===0){sh.getRange(1,1,1,4).setValues([['section','id','json','updatedAt']]);sh.setFrozenRows(1);}
  return sh;
}
function getMediaFolder_(){
  const p=PropertiesService.getScriptProperties(),id=p.getProperty(FOLDER_KEY);
  if(id)try{return DriveApp.getFolderById(id)}catch(e){}
  const f=DriveApp.createFolder(APP_NAME+' Media');p.setProperty(FOLDER_KEY,f.getId());return f;
}
function assertSession_(t){if(!t||CacheService.getScriptCache().get('session:'+t)!=='1')throw new Error('Sesi login berakhir. Silakan login kembali.');}
function hash_(v){return Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,v,Utilities.Charset.UTF_8).map(b=>{const x=(b<0?b+256:b).toString(16);return x.length===1?'0'+x:x}).join('');}
function sanitize_(n){return String(n).replace(/[^a-zA-Z0-9._-]+/g,'-').slice(0,120);}
