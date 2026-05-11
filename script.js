// SMOKE BACKGROUND
const canvas=document.getElementById("smoke");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

function Particle(){
this.x=Math.random()*canvas.width;
this.y=canvas.height;
this.size=Math.random()*6;
this.speedY=Math.random()*1;
this.color=Math.random()>0.5?"#00ff9d":"#b026ff";
}

function loop(){
if(particles.length<60)particles.push(new Particle());
ctx.clearRect(0,0,canvas.width,canvas.height);
for(let p of particles){
p.y-=p.speedY;
ctx.fillStyle=p.color;
ctx.globalAlpha=0.12;
ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fill();
}
requestAnimationFrame(loop);
}
loop();

// REAL DATA FROM GITHUB JSON
async function loadStrains(){
const res=await fetch("./strains.json");
const data=await res.json();
const container=document.getElementById("container");
container.innerHTML="";

data.forEach(s=>{
container.innerHTML+=`
<div class='card'>
<img src='${s.image}' />
<h3>${s.name}</h3>
<p>${s.type} • ${s.thc}</p>
<p>${s.desc}</p>
</div>
`;
});
}

loadStrains();