(() => {
const motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let views = [
  {label:'故事化测评概念书籍，可随鼠标轻微旋转',type:'book',content:'<div class="book-object sculpture-object"><div class="book-back"></div><div class="book-spine"><span>NARRATIVE / BIG SIX</span></div><div class="book-pages"></div><div class="book-bottom"></div><div class="book-cover"><small>RESEARCH IN PROGRESS</small><h4>A story.<br>A different<br>perspective.</h4><p>从测试题目，到完整故事。<br>AI × 人格测评</p><div class="book-symbol"></div></div></div>',caption:'NARRATIVE / 故事化测评'},
  {label:'多源数据分层概念图，可随鼠标旋转，随滚动展开',type:'layers',content:`<div class="layers-object sculpture-object"><div class="data-plane" style="--layer:-1"><span class="plane-label">SOCIOECONOMIC CONTEXT</span><div class="dot-grid">${Array.from({length:30},(_,index)=>`<span style="--dot-opacity:${.2+(index%7)/10}"></span>`).join('')}</div><span class="plane-index">01 / CONTEXT</span></div><div class="data-plane" style="--layer:0"><span class="plane-label">PSYCHOLOGICAL FACTORS</span><div class="line-field">${Array.from({length:6},(_,index)=>`<i style="--line:${index}"></i>`).join('')}</div><span class="plane-index">02 / EXPERIENCE</span></div><div class="data-plane" style="--layer:1"><span class="plane-label">INTERPRETABLE MODELS</span><div class="contour-field">${Array.from({length:6},(_,index)=>`<i style="--ring:${index}"></i>`).join('')}</div><span class="plane-index">03 / UNDERSTANDING</span></div></div>`,caption:'PERSPECTIVES / 多个视角'},
  {label:'身心健康球体概念雕塑，可随鼠标旋转',type:'orb',content:`<div class="orb-object sculpture-object"><div class="orb-core"></div>${Array.from({length:6},(_,index)=>`<div class="orb-latitude" style="--ring:${index}"></div>`).join('')}<div class="orb-orbit"></div><span class="orb-caption">PAUSE. NOTICE.</span></div>`,caption:'WELLBEING / 关注身心'}
];
views = [
  {type:'book',label:'极简装帧概念书，随滚动翻转',caption:'NARRATIVE / 不同的观察方式',content:'<div class="book-object sculpture-object"><div class="book-back"></div><div class="book-spine"><span>WAYS OF SEEING / 06</span></div><div class="book-pages"></div><div class="book-bottom"></div><div class="book-cover"><div class="cover-top"><span>XI WEN WAN</span><span>RESEARCH NOTES</span></div><div class="cover-art"><span class="cover-number">06</span><div class="cover-aperture"></div></div><div class="cover-bottom"><h4>Ways<br>of seeing.</h4><span>人格 · 故事 · 视角</span></div></div></div>'},
  {type:'network',label:'空间节点网络，随下滑从聚集状态展开为相互连接的结构',caption:'CONNECTIONS / 从个体到环境',content:'<div class="canvas-object"><canvas class="network-canvas" aria-hidden="true"></canvas><div class="network-note"><span>INDIVIDUAL</span><span>CONTEXT</span></div></div>'},
  {type:'waves',label:'连续波场，随下滑从起伏变化为平缓，非研究数据',caption:'A MOMENT OF STILLNESS / 片刻平静',content:'<div class="canvas-object"><canvas class="wave-canvas" aria-hidden="true"></canvas><div class="wave-word">Breathe.</div></div>'}
];
const visualStates = [];
document.querySelectorAll('.flow-project').forEach((project,index)=>{
  const view=views[index];
  const visual=document.createElement('div');
  visual.className=`sculpture sculpture-${view.type}`;
  visual.setAttribute('role','img');
  visual.setAttribute('aria-label',view.label.replace('可随鼠标轻微旋转','随下滑自动旋转').replace('可随鼠标旋转，随滚动展开','随下滑自动旋转并分层展开').replace('可随鼠标旋转','随下滑自动旋转'));
  visual.innerHTML=`<div class="sculpture-glow"></div><div class="sculpture-ground"></div><div class="sculpture-stage">${view.content}</div><div class="sculpture-label"><span>${view.caption}</span><span class="pointer-hint">概念示意 · 非研究数据</span></div>`;
  project.querySelector('div').append(visual);
  const state={element:visual,object:visual.querySelector('.sculpture-object'),canvas:visual.querySelector('canvas'),type:view.type};
  visualStates.push(state);
});
const publicationVisual=document.createElement('div');
publicationVisual.className='publication-orbit';
publicationVisual.setAttribute('aria-hidden','true');
publicationVisual.innerHTML='<div class="type-strip"><span>THINK.</span><span>QUESTION.</span><span>WRITE.</span></div><div class="sculpture-label"><span>IDEAS IN MOTION</span><span>让思考落于文字</span></div>';
document.querySelector('.flow-publications .flow-heading').after(publicationVisual);
let animationFrame=0;
const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
function canvasContext(canvas){
  const width=canvas.clientWidth;
  const height=canvas.clientHeight;
  const ratio=Math.min(window.devicePixelRatio||1,2);
  if(canvas.width!==Math.round(width*ratio)||canvas.height!==Math.round(height*ratio)){canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);}
  const context=canvas.getContext('2d');
  context.setTransform(ratio,0,0,ratio,0,0);
  context.clearRect(0,0,width,height);
  return {context,width,height};
}
function drawNetwork(canvas,progress){
  const {context,width,height}=canvasContext(canvas);
  const angle=-.7+progress*1.8;
  const spread=.32+progress*.8;
  const radius=Math.min(width*.38,height*.34)*spread;
  const nodes=Array.from({length:42},(_,index)=>{
    const latitude=Math.acos(1-2*(index+.5)/42);
    const longitude=index*2.39996;
    const originalX=Math.sin(latitude)*Math.cos(longitude);
    const originalZ=Math.sin(latitude)*Math.sin(longitude);
    const rotatedX=originalX*Math.cos(angle)-originalZ*Math.sin(angle);
    const rotatedZ=originalX*Math.sin(angle)+originalZ*Math.cos(angle);
    const perspective=1+rotatedZ*.22;
    return {x:width/2+rotatedX*radius*perspective,y:height/2+Math.cos(latitude)*radius*perspective,z:rotatedZ,index};
  });
  nodes.forEach((node,index)=>nodes.slice(index+1).forEach(other=>{
    const distance=Math.hypot(node.x-other.x,node.y-other.y);
    if(distance<radius*.66&&Math.abs(node.index-other.index)%3!==0){context.strokeStyle=`rgba(192,214,165,${(.08+(1-distance/(radius*.66))*.22)*(1+(node.z+other.z)*.2)})`;context.lineWidth=.7;context.beginPath();context.moveTo(node.x,node.y);context.lineTo(other.x,other.y);context.stroke();}
  }));
  nodes.sort((first,second)=>first.z-second.z).forEach(node=>{
    const size=1.8+(node.z+1)*1.5;
    context.fillStyle=node.index%7===0?'#dafa68':`rgba(228,234,214,${.35+(node.z+1)*.3})`;
    context.beginPath();context.arc(node.x,node.y,size,0,Math.PI*2);context.fill();
    if(node.index%7===0){context.strokeStyle='#dafa6830';context.beginPath();context.arc(node.x,node.y,size+7,0,Math.PI*2);context.stroke();}
  });
}
function drawWaves(canvas,progress){
  const {context,width,height}=canvasContext(canvas);
  const amplitude=(1-progress*.8)*height*.18;
  for(let row=0;row<34;row++){
    const depth=row/33;
    context.strokeStyle=`rgba(${150+Math.round(depth*60)},${180+Math.round(depth*38)},${120+Math.round(depth*45)},${.16+depth*.5})`;
    context.lineWidth=.65+depth*.45;
    context.beginPath();
    for(let point=0;point<=100;point++){
      const horizontal=point/100;
      const envelope=Math.sin(horizontal*Math.PI);
      const wave=Math.sin(horizontal*Math.PI*3.2+depth*2.8-progress*6)*amplitude*envelope;
      const secondWave=Math.cos(horizontal*Math.PI*5-depth*2+progress*3)*amplitude*.23*envelope;
      const vertical=height*.4+depth*height*.3+wave+secondWave;
      if(point===0)context.moveTo(0,vertical);else context.lineTo(horizontal*width,vertical);
    }
    context.stroke();
  }
}
function draw(){
  animationFrame=0;
  visualStates.forEach(state=>{
    const bounds=state.element.getBoundingClientRect();
    if(bounds.bottom<0||bounds.top>window.innerHeight)return;
    const progress=clamp((window.innerHeight-bounds.top)/(window.innerHeight+bounds.height),0,1);
    const phase=clamp((progress-.15)/.7,0,1);
    const eased=motionReduced.matches?.5:phase*phase*(3-2*phase);
    if(state.canvas){
      if(state.type==='network')drawNetwork(state.canvas,eased);else drawWaves(state.canvas,eased);
      state.element.style.setProperty('--word-opacity',`${.2+eased*.65}`);
      return;
    }
    state.object.style.setProperty('--rx',`${22-eased*38}deg`);
    state.object.style.setProperty('--ry',`${-42+eased*(state.type==='orb'?160:92)}deg`);
    state.object.style.setProperty('--rz',`${-8+eased*16}deg`);
    state.element.style.setProperty('--light-x',`${20+eased*65}%`);
    state.element.style.setProperty('--light-y',`${25+eased*35}%`);
    state.element.style.setProperty('--shine',`${-90+eased*180}%`);
    state.element.style.setProperty('--spread',`${4+eased*48}px`);
    state.element.style.setProperty('--layer-depth',`${8+eased*78}px`);
    state.element.style.setProperty('--orbit-turn',`${-30+eased*180}deg`);
    state.element.style.setProperty('--core-scale',`${.87+Math.sin(phase*Math.PI)*.13}`);
    state.element.style.setProperty('--lift',`${26-eased*52}px`);
  });
  const paperBounds=publicationVisual.getBoundingClientRect();
  if(paperBounds.bottom>0&&paperBounds.top<window.innerHeight){
    const progress=clamp((window.innerHeight-paperBounds.top)/(window.innerHeight+paperBounds.height),0,1);
    publicationVisual.style.setProperty('--type-shift',`${motionReduced.matches?0:-12+progress*24}%`);
  }
}
function animate(){if(!animationFrame)animationFrame=requestAnimationFrame(draw);}
window.addEventListener('scroll',animate,{passive:true});
window.addEventListener('resize',animate);
motionReduced.addEventListener('change',()=>{
  visualStates.forEach(state=>{if(state.object){state.object.style.removeProperty('--rx');state.object.style.removeProperty('--ry');}});
  animate();
});
animate();
})();
