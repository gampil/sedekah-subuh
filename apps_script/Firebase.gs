function firebaseGet(path){
 const url = CONFIG.FIREBASE_URL + "/" + path + ".json";
 return JSON.parse(UrlFetchApp.fetch(url).getContentText());
}

function firebaseUpdate(path,data){
 const url = CONFIG.FIREBASE_URL + "/" + path + ".json";
 return UrlFetchApp.fetch(url,{
   method:"patch",
   contentType:"application/json",
   payload:JSON.stringify(data)
 });
}