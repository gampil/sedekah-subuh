(function(){
"use strict";
const cfg=window.SEDEKAH_CONFIG||{};
const db=cfg.firebaseDatabaseUrl.replace(/\/$/,"");

async function getRTDB(path){
 const r=await fetch(`${db}/${path}.json`);
 if(!r.ok) throw new Error("Firebase error");
 return await r.json();
}
async function setRTDB(path,data){
 const r=await fetch(`${db}/${path}.json`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
 if(!r.ok) throw new Error("Firebase error");
 return await r.json();
}
async function pushRTDB(path,data){
 const r=await fetch(`${db}/${path}.json`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
 return await r.json();
}

window.SedekahAPI={
 isConfigured:()=>!!db,
 getBootstrap:async()=>{
  return {settings:await getRTDB("settings")||{}, programs:Object.entries(await getRTDB("programs")||{}).map(([id,v])=>({...v,id})), banks:await getRTDB("banks")||{}, packages:await getRTDB("packages")||{}, gallery:await getRTDB("gallery")||{}};
 },
 getProgram:async(slug)=>{
  const p=Object.entries(await getRTDB("programs")||{}).find(([id,v])=>v.slug===slug);
  return p?{program:{id:p[0],...p[1]},settings:await getRTDB("settings")||{}}:null;
 },
 getPublicDonations:async()=>{
  const d=await getRTDB("donations")||{};
  return {items:Object.entries(d).map(([id,v])=>({id,...v})).filter(x=>x.status==="approved"),hasMore:false};
 },
 createDonation:async(payload)=>{
  payload.status="pending"; payload.createdAt=new Date().toISOString();
  return await pushRTDB("donations",payload);
 },
 submitTransferProof:async(payload)=>setRTDB("donations/"+payload.id,payload),
 getDonationStatus:async(id)=>getRTDB("donations/"+id),
 addAamiin:async()=>true,
 admin:async(action,payload)=>{
   if(action==="adminDashboard"){
    const [donations,programs]=await Promise.all([getRTDB("donations")||{},getRTDB("programs")||{}]);
    return {donations:Object.entries(donations||{}).map(([id,v])=>({id,...v})),programs:Object.entries(programs||{}).map(([id,v])=>({id,...v}))};
   }
   if(action==="adminGetTransferProof") return getRTDB("donations/"+payload.id);
   if(action==="adminSaveSettings") return setRTDB("settings",payload.settings);
   if(action==="adminUploadImage") throw new Error("Gunakan Apps Script ImgBB upload gateway.");
   if(action==="adminExportDonations") return window.SedekahAPI["admin"]("adminDashboard",{});
   throw new Error("Aksi belum tersedia");
 },
 clearPublicCache:()=>{}
};
})();