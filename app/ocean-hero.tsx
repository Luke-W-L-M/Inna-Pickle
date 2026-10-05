'use client';
import {useEffect,useRef,useState} from 'react';

export default function OceanHero({paused}:{paused:boolean}){
  const ref=useRef<HTMLDivElement>(null);
  const [resting,setResting]=useState(false);
  const [loaded,setLoaded]=useState({background:false,jar:false});
  useEffect(()=>{
    const el=ref.current;if(!el)return;
    const background=el.querySelector<HTMLImageElement>(".ocean-background");const jar=el.querySelector<HTMLImageElement>(".floating-jar img");
    setLoaded({background:!!background?.complete&&!!background.naturalWidth,jar:!!jar?.complete&&!!jar.naturalWidth});
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    let visible=true;
    const sync=()=>setResting(!visible||document.hidden||media.matches);
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()},{threshold:.01});
    observer.observe(el);document.addEventListener('visibilitychange',sync);media.addEventListener('change',sync);sync();
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);media.removeEventListener('change',sync)};
  },[]);
  return <div ref={ref} className={'ocean-scene '+(paused||resting?'motion-resting ':'')+(loaded.background&&loaded.jar?'scene-ready':'scene-loading')} role="img" aria-label="An Inna Pickle jar with straight hollow kelp tube pieces, gently bobbing on the Scottish sea">
    <div className="ocean-framing">
      <img onLoad={()=>setLoaded(s=>({...s,background:true}))} className="ocean-background" src="/assets/ocean-background.webp" alt="" fetchPriority="high"/>
      <div className="surface-drift"/>
      <div className="jar-reflection"><img src="/assets/ocean-jar.webp" alt=""/></div>
      <div className="floating-jar"><img onLoad={()=>setLoaded(s=>({...s,jar:true}))} src="/assets/ocean-jar.webp" alt="" fetchPriority="high"/></div>
      <div className="contact-ripple ripple-one"/><div className="contact-ripple ripple-two"/>
      <div className="ocean-foreground"/>
    </div>
  </div>
}
