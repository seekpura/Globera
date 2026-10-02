export const safeRatio=(a:number,b:number)=>b===0?0:a/b;
export const pct=(a:number,b:number)=>safeRatio(a,b)*100;
export const gpm=(gmv:number,views:number)=>safeRatio(gmv,views)*1000;
export const contribution=(revenue:number,costs:number[])=>revenue-costs.reduce((a,b)=>a+b,0);
