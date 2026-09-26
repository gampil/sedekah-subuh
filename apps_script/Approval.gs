function approveDonation(id){

 firebaseUpdate(
  "donations/"+id,
  {
   status:"approved",
   approvedAt:new Date().toISOString()
  }
 );

}

function rejectDonation(id){

 firebaseUpdate(
  "donations/"+id,
  {
   status:"rejected",
   rejectedAt:new Date().toISOString()
  }
 );

}