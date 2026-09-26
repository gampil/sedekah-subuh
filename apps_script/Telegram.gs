function sendTelegram(text){

 CONFIG.TELEGRAM_ADMIN_ID.forEach(id=>{

 const url="https://api.telegram.org/bot"+
 CONFIG.TELEGRAM_TOKEN+
 "/sendMessage";

 UrlFetchApp.fetch(url,{
  method:"post",
  contentType:"application/json",
  payload:JSON.stringify({
   chat_id:id,
   text:text,
   parse_mode:"HTML"
  })
 });

 });

}