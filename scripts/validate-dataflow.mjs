import fs from 'node:fs';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const flow=read('src/data/t01/dataflow.json');
const tools=new Set(read('src/data/t01/tools.json').tools.map(x=>x.code));
const ws=new Set(read('src/data/t01/workshops.json').machines.map(x=>x.code));
const co=new Set(read('src/data/t01/coaching.json').machines.map(x=>x.code));
const results=new Set(Array.from({length:10},(_,i)=>`T01-R${String(i+1).padStart(2,'0')}`));
const known=id=>tools.has(id)||ws.has(id)||co.has(id)||results.has(id);
const errors=[];for(const e of flow.edges)for(const id of [...e.from,...e.to])if(!known(id))errors.push(`unknown ${id}`);
for(const code of tools)if(!flow.edges.some(e=>e.to.includes(code)))errors.push(`tool has no dataflow source ${code}`);
for(const pair of ['T01-W03>T01-W04','T01-W05>T01-W06','T01-W06>T01-W11','T01-P04>T01-R06','T01-P05>T01-R08']){const[a,b]=pair.split('>');if(!flow.edges.some(e=>e.from.includes(a)&&e.to.includes(b)))errors.push(`missing edge ${pair}`)}
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`PASS dataflow edges=${flow.edges.length} tools=${tools.size}`);
