const APP_NAME='BMT Al-Muhajirin CMS';
const CMS_VERSION='1.0-github-json';
const DB_KEY='CMS_ACCESS_KEY';
const FILES={
  settings:'public/content/site-settings.json',
  about:'public/content/about.json',
  products:'public/content/products.json',
  articles:'public/content/articles.json',
  board:'public/content/board-members.json',
  testimonials:'public/content/testimonials.json',
  branches:'public/content/branches.json',
  faq:'public/content/faq.json'
};

function doGet(e){
  if(e && e.parameter && e.parameter.api==='health'){
    return jsonResponse_({
      ok:true,
      service:APP_NAME,
      version:CMS_VERSION,
      status:'online',
      timestamp:new Date().toISOString()
    });
  }
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle(APP_NAME);
}

function cmsHealth(){
  return {
    ok:true,
    service:APP_NAME,
    version:CMS_VERSION,
    status:'online',
    timestamp:new Date().toISOString()
  };
}

function cmsApi(data){
  if(!data) throw new Error('Request data tidak ditemukan.');
  checkAccessKey_(data.accessKey);
  const action=String(data.action||'');
  if(action==='getContent') return {ok:true,content:getContent_()};
  if(action==='saveSection') return {ok:true,content:saveSection_(data.section,data.value)};
  if(action==='saveItem') return {ok:true,item:saveItem_(data.section,data.item)};
  if(action==='deleteItem') return {ok:true,deleted:deleteItem_(data.section,data.id)};
  if(action==='uploadImage') return {ok:true,image:uploadImage_(data)};
  throw new Error('Action tidak dikenal: '+action);
}

function doPost(e){
  try{
    if(!e||!e.postData||!e.postData.contents) throw new Error('Request data tidak ditemukan.');
    const data=JSON.parse(e.postData.contents);
    checkAccessKey_(data.accessKey);
    const action=String(data.action||'');
    if(action==='getContent') return jsonResponse_({ok:true,content:getContent_()});
    if(action==='saveSection') return jsonResponse_({ok:true,content:saveSection_(data.section,data.value)});
    if(action==='saveItem') return jsonResponse_({ok:true,item:saveItem_(data.section,data.item)});
    if(action==='deleteItem') return jsonResponse_({ok:true,deleted:deleteItem_(data.section,data.id)});
    if(action==='uploadImage') return jsonResponse_({ok:true,image:uploadImage_(data)});
    throw new Error('Action tidak dikenal: '+action);
  }catch(error){
    return jsonResponse_({ok:false,error:safeMessage_(error)});
  }
}

function checkAccessKey_(value){
  const expected=PropertiesService.getScriptProperties().getProperty(DB_KEY);
  if(!expected) throw new Error('CMS_ACCESS_KEY belum diset di Script Properties.');
  if(!value||String(value)!==String(expected)) throw new Error('CMS access key tidak valid.');
}

function getContent_(){
  return {
    settings:readJsonFile_(FILES.settings),
    about:readJsonFile_(FILES.about),
    products:readJsonFile_(FILES.products),
    articles:readJsonFile_(FILES.articles),
    board:readJsonFile_(FILES.board),
    testimonials:readJsonFile_(FILES.testimonials),
    branches:readJsonFile_(FILES.branches),
    faq:readJsonFile_(FILES.faq)
  };
}

function saveSection_(section,value){
  if(!FILES[section]) throw new Error('Section tidak valid: '+section);
  const path=FILES[section];
  const current=githubGetFile_(path);
  const result=githubUpdateFile_(path,JSON.stringify(value,null,2)+'\n','CMS: Update '+section,current.sha);
  return value;
}

function saveItem_(section,item){
  if(!FILES[section]) throw new Error('Section tidak valid: '+section);
  if(section==='settings'||section==='about') throw new Error('Gunakan saveSection untuk '+section+'.');
  if(!item||!item.id) throw new Error('Data item tidak lengkap.');
  const path=FILES[section];
  const current=githubGetFile_(path);
  const list=Array.isArray(current.data)?current.data:[];
  const index=list.findIndex(function(row){return String(row.id)===String(item.id);});
  if(index>=0) list[index]=item; else list.push(item);
  githubUpdateFile_(path,JSON.stringify(list,null,2)+'\n','CMS: Save '+section+' '+item.id,current.sha);
  return item;
}

function deleteItem_(section,id){
  if(!FILES[section]||section==='settings'||section==='about') throw new Error('Section tidak valid.');
  const current=githubGetFile_(FILES[section]);
  const list=Array.isArray(current.data)?current.data:[];
  const before=list.length;
  const next=list.filter(function(row){return String(row.id)!==String(id);});
  if(next.length===before) throw new Error('Data tidak ditemukan.');
  githubUpdateFile_(FILES[section],JSON.stringify(next,null,2)+'\n','CMS: Delete '+section+' '+id,current.sha);
  return true;
}

function uploadImage_(data){
  let bytes,mime,fileName='bmt-image.jpg';
  if(data.dataUrl){
    const match=String(data.dataUrl).match(/^data:([^;]+);base64,(.+)$/s);
    if(!match) throw new Error('Format upload gambar tidak valid.');
    mime=String(match[1]).toLowerCase();
    bytes=Utilities.base64Decode(match[2]);
    fileName=String(data.fileName||fileName);
  }else if(data.imageUrl){
    const source=String(data.imageUrl).trim();
    if(!/^https?:\/\//i.test(source)) throw new Error('URL gambar harus http:// atau https://.');
    const response=UrlFetchApp.fetch(source,{method:'get',followRedirects:true,muteHttpExceptions:true});
    if(response.getResponseCode()<200||response.getResponseCode()>=300) throw new Error('Gambar dari URL tidak bisa diambil.');
    bytes=response.getContent();
    mime=String(response.getHeaders()['Content-Type']||response.getBlob().getContentType()||'image/jpeg').toLowerCase();
    fileName=String(response.getBlob().getName()||fileName);
  }else{
    throw new Error('Pilih file gambar atau masukkan URL gambar.');
  }
  if(bytes.length>8*1024*1024) throw new Error('Ukuran gambar maksimal 8 MB.');
  if(mime.indexOf('image/')!==0) throw new Error('File harus berupa gambar.');
  const ext=extensionForMime_(mime,fileName);
  const base=slug_(fileName.replace(/\.[^.]+$/,''))||'bmt-image';
  const finalName=base+'-'+Utilities.formatDate(new Date(),'Asia/Makassar','yyyyMMddHHmmss')+'.'+ext;
  const path='public/content/media/'+finalName;
  githubCreateBinaryFile_(path,bytes,'CMS: Add image '+finalName);
  return {url:'/BMT-01/content/media/'+finalName,path:path,name:finalName};
}

function extensionForMime_(mime,name){
  if(mime==='image/jpeg') return 'jpg';
  if(mime==='image/png') return 'png';
  if(mime==='image/webp') return 'webp';
  if(mime==='image/gif') return 'gif';
  if(mime==='image/svg+xml') return 'svg';
  const match=String(name||'').toLowerCase().match(/\.(jpg|jpeg|png|webp|gif|svg)$/);
  return match?(match[1]==='jpeg'?'jpg':match[1]):'jpg';
}

function readJsonFile_(path){return githubGetFile_(path).data;}

function githubConfig_(){
  const p=PropertiesService.getScriptProperties();
  const token=p.getProperty('GITHUB_TOKEN');
  const owner=p.getProperty('GITHUB_OWNER');
  const repo=p.getProperty('GITHUB_REPO');
  const branch=p.getProperty('GITHUB_BRANCH')||'main';
  if(!token||!owner||!repo) throw new Error('GITHUB_TOKEN, GITHUB_OWNER, dan GITHUB_REPO wajib diset.');
  return {token:token,owner:owner,repo:repo,branch:branch};
}

function githubHeaders_(cfg){
  return {
    Authorization:'Bearer '+cfg.token,
    Accept:'application/vnd.github+json',
    'X-GitHub-Api-Version':'2022-11-28'
  };
}

function githubGetFile_(path){
  const cfg=githubConfig_();
  const url='https://api.github.com/repos/'+cfg.owner+'/'+cfg.repo+'/contents/'+path+'?ref='+encodeURIComponent(cfg.branch);
  const response=UrlFetchApp.fetch(url,{method:'get',headers:githubHeaders_(cfg),muteHttpExceptions:true});
  if(response.getResponseCode()<200||response.getResponseCode()>=300) throw new Error('GitHub read error ('+response.getResponseCode()+'): '+response.getContentText());
  const raw=JSON.parse(response.getContentText());
  if(raw.type!=='file') throw new Error('GitHub path bukan file: '+path);
  const bytes=Utilities.base64Decode(String(raw.content||'').replace(/\s/g,''));
  const text=Utilities.newBlob(bytes).getDataAsString('UTF-8');
  let data;
  try{data=JSON.parse(text);}catch(error){throw new Error('JSON GitHub tidak valid: '+path);}
  return {path:path,sha:raw.sha,data:data,text:text};
}

function githubUpdateFile_(path,content,message,sha){
  const cfg=githubConfig_();
  const url='https://api.github.com/repos/'+cfg.owner+'/'+cfg.repo+'/contents/'+path;
  const payload={
    message:message,
    content:Utilities.base64Encode(Utilities.newBlob(String(content),'text/plain','content.json').getBytes()),
    branch:cfg.branch,
    sha:sha
  };
  const response=UrlFetchApp.fetch(url,{
    method:'put',
    contentType:'application/json',
    headers:githubHeaders_(cfg),
    payload:JSON.stringify(payload),
    muteHttpExceptions:true
  });
  if(response.getResponseCode()<200||response.getResponseCode()>=300) throw new Error('GitHub update error ('+response.getResponseCode()+'): '+response.getContentText());
  return JSON.parse(response.getContentText());
}

function githubCreateBinaryFile_(path,bytes,message){
  const cfg=githubConfig_();
  const url='https://api.github.com/repos/'+cfg.owner+'/'+cfg.repo+'/contents/'+path;
  const payload={
    message:message,
    content:Utilities.base64Encode(bytes),
    branch:cfg.branch
  };
  const response=UrlFetchApp.fetch(url,{
    method:'put',
    contentType:'application/json',
    headers:githubHeaders_(cfg),
    payload:JSON.stringify(payload),
    muteHttpExceptions:true
  });
  if(response.getResponseCode()<200||response.getResponseCode()>=300) throw new Error('GitHub image error ('+response.getResponseCode()+'): '+response.getContentText());
  return JSON.parse(response.getContentText());
}

function makePasswordHash(password){
  try{
    const bytes=Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,String(password),Utilities.Charset.UTF_8);
    const hash=bytes.map(function(byte){const v=byte<0?byte+256:byte;return ('0'+v.toString(16)).slice(-2);}).join('');
    return {ok:true,password_hash:hash};
  }catch(error){return {ok:false,error:safeMessage_(error)};}
}

function slug_(value){
  return String(value||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,100);
}

function safeMessage_(error){
  try{return error&&error.message?String(error.message):String(error||'Unknown error');}
  catch(ignore){return 'Unknown error';}
}

function jsonResponse_(data){
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
