// Persistent counter via Upstash Redis REST. Configure the two env vars in Vercel.
// POST counts one visit per browser per 24h; GET reads the total.
export default async function handler(req,res){
  if(!['GET','POST'].includes(req.method))return res.status(405).json({error:'Method not allowed'});
  const url=process.env.UPSTASH_REDIS_REST_URL,token=process.env.UPSTASH_REDIS_REST_TOKEN;
  if(!url||!token)return res.status(503).json({error:'Counter not configured'});
  const key='shivdarshan:portfolio:visits';
  const run=async(command)=>{const r=await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(command)});if(!r.ok)throw Error('Redis unavailable');const d=await r.json();if(d.error)throw Error('Redis error');return d.result};
  try{
    let count;
    if(req.method==='POST'){
      const seen=(req.headers.cookie||'').split(';').some(c=>c.trim().startsWith('sj_visited=1'));
      if(!seen){count=await run(['INCR',key]);res.setHeader('Set-Cookie','sj_visited=1; Max-Age=86400; Path=/; SameSite=Lax; Secure; HttpOnly')}
      else count=await run(['GET',key]);
    }else count=await run(['GET',key]);
    res.setHeader('Cache-Control','no-store');return res.status(200).json({count:Number(count||0)});
  }catch{return res.status(503).json({error:'Counter temporarily unavailable'})}
}
