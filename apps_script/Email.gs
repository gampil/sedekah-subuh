function sendEmailNotification(subject,message){

 CONFIG.ADMIN_EMAIL.forEach(email=>{
  MailApp.sendEmail(email,subject,message);
 });

}