'use client';
import {useEffect,useRef,useState} from 'react';
import './journey.css';
export default function Journey(){
  const video=useRef<HTMLVideoElement>(null),visible=useRef(false),manualPause=useRef(false);
  const [paused,setPaused]=useState(false);
  useEffect(()=>{
    const node=video.current;if(!node)return;
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    manualPause.current=preference.matches;setPaused(preference.matches);
    const sync=()=>{if(visible.current&&!document.hidden&&!manualPause.current)node.play().catch(()=>setPaused(true));else node.pause()};
    const observer=new IntersectionObserver(([entry])=>{visible.current=entry.isIntersecting;sync()},{threshold:.08});
    const change=()=>{manualPause.current=preference.matches;setPaused(preference.matches);sync()};
    observer.observe(node);document.addEventListener('visibilitychange',sync);preference.addEventListener('change',change);
    return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);preference.removeEventListener('change',change);node.pause()};
  },[]);
  const toggle=()=>{const node=video.current;if(!node)return;manualPause.current=!manualPause.current;setPaused(manualPause.current);if(manualPause.current)node.pause();else node.play().catch(()=>setPaused(true))};
  return <section id="journey" className="journey-film" aria-label="A silent charcoal animation following one bunch of kelp from the sea into a brine jar in a garden">
    <video ref={video} autoPlay muted loop playsInline preload="metadata" poster="/assets/journey-loop-poster.jpg" aria-label="Looping sea-to-table charcoal animation"><source src="/assets/journey-loop.mp4" type="video/mp4"/></video>
    <button className="journey-film-toggle" onClick={toggle} aria-label={paused?'Play journey animation':'Pause journey animation'}><svg viewBox="0 0 24 24" aria-hidden="true">{paused?<path d="M8 5 L19 12 L8 19 Z"/>:<path d="M8 5 V19 M16 5 V19"/>}</svg></button>
  </section>;
}
