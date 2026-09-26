function checkNewDonation(){

 const data=firebaseGet("donations");

 if(!data) return;

 Object.keys(data).forEach(id=>{

  const d=data[id];

  if(d.status==="pending" && !d.notified){

   sendTelegram(
    "🔔 Donasi Baru\nNama: "+
    d.nama+
    "\nNominal: "+
    d.nominal
   );

   sendEmailNotification(
    "Donasi Baru Masuk",
    JSON.stringify(d)
   );

   firebaseUpdate(
    "donations/"+id,
    {notified:true}
   );

  }

 });

}