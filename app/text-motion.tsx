'use client';
import {Children,cloneElement,isValidElement,useEffect,useId,useRef,useState,type CSSProperties,type ReactNode} from 'react';
import data from './charcoal-glyphs.json';
const witnessed=new Set<string>();
function useOnce(label:string){
  const id=useId(),key=id+label,ref=useRef<HTMLSpanElement>(null);
  const [armed,setArmed]=useState(false),[shown,setShown]=useState(()=>witnessed.has(key));
  useEffect(()=>{const node=ref.current;if(!node)return;
    if(witnessed.has(key)||matchMedia('(prefers-reduced-motion: reduce)').matches){setShown(true);return;}
    setArmed(true);const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){witnessed.add(key);setShown(true);observer.disconnect()}},{threshold:.45,rootMargin:'0px 0px -8% 0px'});observer.observe(node);return()=>observer.disconnect();
  },[key]);
  return {ref,className:(armed?'text-armed ':'')+(shown?'text-shown':'')};
}
function plain(node:ReactNode):string{return Children.toArray(node).map(n=>typeof n==='string'||typeof n==='number'?String(n):isValidElement<{children?:ReactNode}>(n)?n.type==='br'?'\n':plain(n.props.children):'').join('')}
export function AnimatedText({children,kind='ink'}:{children:ReactNode,kind?:'ink'|'bubble'}){
  const text=plain(children),once=useOnce(kind+text);let position=0;
  const convert=(nodes:ReactNode):ReactNode=>Children.map(nodes,node=>{
    if(typeof node==='string'||typeof node==='number')return String(node).split(/(\s+)/).map((word,wi)=>/^\s+$/.test(word)?word:<span className="motion-word" key={wi}>{Array.from(word).map((c)=>{const i=position++;const delay=kind==='bubble'?((i*29+text.length*13)%47)/47*1200:i/Math.max(1,text.replace(/\s/g,'').length)*1250;return <span key={i} className={kind==='bubble'?'bubble-letter':'ink-letter'} style={{'--letter-delay':delay+'ms','--letter-tilt':((i*7)%9-4)+'deg'} as CSSProperties}>{c}</span>})}</span>);
    if(isValidElement<{children?:ReactNode}>(node)&&node.props.children)return cloneElement(node,{},convert(node.props.children));
    return node;
  });
  return <span ref={once.ref} className={'animated-text '+kind+'-text '+once.className} aria-label={text}><span aria-hidden="true">{convert(children)}</span></span>;
}
export function Handwriting({children}:{children:ReactNode}){
  const text=plain(children),once=useOnce('drawn:'+text);let index=0;
  const count=Math.max(1,text.replace(/\s/g,'').length);
  const glyphs=data.glyphs as Record<string,{d:string,advance:number}>;
  return <span ref={once.ref} className={'handwriting '+once.className} aria-label={text}>
    <span aria-hidden="true">{text.split('\n').map((line,lineIndex)=><span className="ink-line" key={lineIndex}>{line.split(' ').map((word,wordIndex)=>{
      let x=20;const paths=Array.from(word).map(c=>{const glyph=glyphs[c]||glyphs['?'];const item={...glyph,x,index:index++};x+=glyph.advance;return item});
      return <span className="ink-word" key={wordIndex}><svg viewBox={`0 0 ${x+20} 1175`} style={{width:(x+20)/1000+'em'}}><g transform={`translate(0 ${data.ascent}) scale(1 -1)`}>{paths.map(g=><path key={g.index} d={g.d} transform={`translate(${g.x} 0)`} pathLength="1" className="pencil-letter" style={{'--letter-delay':g.index/count*1450+'ms'} as CSSProperties}/>)}</g></svg></span>;
    })}</span>)}</span>
  </span>;
}
export function animateInformation(nodes:ReactNode):ReactNode{
  return Children.map(nodes,node=>{
    if(!isValidElement<{children?:ReactNode,className?:string}>(node)||!node.props.children)return node;
    const type=node.type;
    if(type==='h2')return cloneElement(node,{},node.props.className?.includes('bubble-heading')?<AnimatedText kind="bubble">{node.props.children}</AnimatedText>:<Handwriting>{node.props.children}</Handwriting>);
    if(node.props.className?.includes('drawn-copy'))return cloneElement(node,{},<Handwriting>{node.props.children}</Handwriting>);
    if(type==='h3'||type==='p')return cloneElement(node,{},<AnimatedText>{node.props.children}</AnimatedText>);
    return cloneElement(node,{},animateInformation(node.props.children));
  });
}
