let cancelGlide:(()=>void)|null=null;
export function glideTo(id:string){
  cancelGlide?.();const el=document.getElementById(id);if(!el)return;
  window.dispatchEvent(new CustomEvent('inna:navigate',{detail:id}));
  const start=window.scrollY,target=Math.max(0,el.getBoundingClientRect().top+start-24);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){window.scrollTo(0,target);return;}
  const duration=Math.min(3400,Math.max(1100,Math.abs(target-start)*.32));let frame=0;const begin=performance.now();
  const cleanup=()=>{removeEventListener('wheel',cancel);removeEventListener('touchstart',cancel);removeEventListener('keydown',cancel);if(cancelGlide===cancel)cancelGlide=null};
  const cancel=()=>{cancelAnimationFrame(frame);cleanup()};cancelGlide=cancel;
  const tick=(now:number)=>{const t=Math.min(1,(now-begin)/duration),e=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;window.scrollTo(0,start+(target-start)*e);if(t<1)frame=requestAnimationFrame(tick);else cleanup()};
  addEventListener('wheel',cancel,{passive:true});addEventListener('touchstart',cancel,{passive:true});addEventListener('keydown',cancel);frame=requestAnimationFrame(tick);
}
