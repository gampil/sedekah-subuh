function uploadImageToImgBB(base64Image){

 const url =
 "https://api.imgbb.com/1/upload?key=" +
 CONFIG.IMGBB_API_KEY;

 const payload={
   image:base64Image
 };

 const response=UrlFetchApp.fetch(url,{
   method:"post",
   payload:payload
 });

 const result=JSON.parse(response.getContentText());

 return result.data.url;
}