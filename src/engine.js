let started = false;

export function initEditor() {
  if (started) return;
  started = true;
  window.__buildOn=true;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $=function(s){return document.querySelector(s)};
  var ease={
    out:function(t){return 1-Math.pow(1-t,3)},
    io:function(t){return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}
  };
  function lerp(a,b,t){return a+(b-a)*t}
  function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
  function fmt(n){return (n>=0?'+':'')+Math.round(n)}

  var props={
    Hero:[['Layout','Auto layout, 2 columns'],['Size','1100 × Hug'],['Display','Big Shoulders 900'],['Image','Portrait, flips on click']],
    Experience:[['Layout','Vertical stack'],['Items','4 roles'],['Latest','Iconic Styles'],['Span','Sep 2025 to now']],
    Projects:[['Layout','3D barrel, 5 faces'],['Projects','5'],['Most used','React, FastAPI'],['Deployed on','Vercel, Railway']],
    Background:[['Layout','2 column grid'],['Degree','B.Tech CSE'],['Institute','IIIT-NR'],['Years','2024 to 2028'],['Paper','IEEE format']],
    Skills:[['Layout','2 column grid'],['Groups','6'],['Languages','6'],['Focus','Web, APIs, LLMs']],
    Contact:[['Layout','Vertical stack'],['Email','Copyable'],['Links','GitHub, LinkedIn'],['Status','Open to roles']]
  };
  var crumb=$('#crumb'),dockcrumb=$('#dockcrumb'),ptitle=$('#ptitle'),prows=$('#prows'),selline=$('#selline');
  var layersEl=$('#layers'),layerRows=[];
  var tools=document.querySelectorAll('.tool');

  function setFrame(name){
    crumb.textContent='/ '+name;
    dockcrumb.textContent=name;
    ptitle.textContent=name;
    prows.innerHTML=(props[name]||[]).map(function(r){return '<div class="prow"><span>'+r[0]+'</span><em>'+r[1]+'</em></div>'}).join('');
    renderLayers(name);
  }
  function setTool(n){tools.forEach(function(t){if(t.dataset.t!=='inspect')t.classList.toggle('on',t.dataset.t===n)})}
  var frames=[].slice.call(document.querySelectorAll('.frame[data-name]'));
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting)setFrame(e.target.dataset.name)});
  },{rootMargin:'-45% 0px -50% 0px'});
  frames.forEach(function(f){io.observe(f)});
  setFrame('Hero');

  $('#theme').addEventListener('click',function(){
    var root=document.documentElement;
    var cur=root.dataset.theme||'dark';
    root.dataset.theme=cur==='dark'?'light':'dark';
  });

  var emailEl=$('#email'),copyBtn=$('#copy');
  copyBtn.addEventListener('click',function(){
    function done(t){copyBtn.textContent=t;setTimeout(function(){copyBtn.textContent='Copy'},1600)}
    function fallback(){
      var r=document.createRange();r.selectNodeContents(emailEl);
      var s=getSelection();s.removeAllRanges();s.addRange(r);done('Selected');
    }
    try{navigator.clipboard.writeText(emailEl.textContent).then(function(){done('Copied')},fallback)}catch(e){fallback()}
  });

  var wrap=$('#barrel'),ring=$('#ring'),cards=[].slice.call(ring.children),bcount=$('#bcount');
  var N=cards.length,step=360/N,theta=0,R=420,animId=0,drag=null,rollBusy=false,lastMoved=false;

  function apply(){
    ring.style.transform='translateZ('+(-R)+'px) rotateY('+theta+'deg)';
    var front=((Math.round(-theta/step)%N)+N)%N;
    cards.forEach(function(c,i){
      var d=Math.abs((((i*step+theta)%360)+540)%360-180);
      c.style.opacity=clamp(1.05-d/120,.15,1).toFixed(3);
    });
    var label=cards[front].dataset.title+' · '+(front+1)+' / '+N;
    if(bcount.textContent!==label)bcount.textContent=label;
  }
  function layout(){
    var W=Math.min(360,wrap.clientWidth-56);
    R=Math.round((W/2)/Math.tan(Math.PI/N)*1.7);
    cards.forEach(function(c,i){
      c.style.width=W+'px';
      c.style.marginLeft=(-W/2)+'px';
      c.style.transform='rotateY('+(i*step)+'deg) translateZ('+R+'px)';
    });
    apply();
  }
  function animateTo(to,dur){
    var from=theta,t0=performance.now(),id=++animId;
    if(reduce){theta=to;apply();return}
    function f(now){
      if(id!==animId)return;
      var p=Math.min(1,(now-t0)/dur);
      theta=lerp(from,to,ease.out(p));apply();
      if(p<1)requestAnimationFrame(f);
    }
    requestAnimationFrame(f);
  }
  function rollBy(n){animateTo(Math.round(theta/step)*step-n*step,520)}
  layout();
  addEventListener('resize',layout);
  $('#bprev').addEventListener('click',function(){rollBy(-1)});
  $('#bnext').addEventListener('click',function(){rollBy(1)});
  wrap.addEventListener('keydown',function(e){
    if(e.key==='ArrowRight'){e.preventDefault();rollBy(1)}
    if(e.key==='ArrowLeft'){e.preventDefault();rollBy(-1)}
  });
  wrap.addEventListener('pointerdown',function(e){
    animId++;
    drag={x:e.clientX,th:theta,lx:e.clientX,lt:performance.now(),v:0,moved:false};
    try{wrap.setPointerCapture(e.pointerId)}catch(err){}
    wrap.classList.add('grab');
  });
  wrap.addEventListener('pointermove',function(e){
    if(!drag)return;
    var dx=e.clientX-drag.x;
    if(Math.abs(dx)>4)drag.moved=true;
    var now=performance.now(),dt=Math.max(1,now-drag.lt);
    drag.v=lerp(drag.v,(e.clientX-drag.lx)/dt,.4);
    drag.lx=e.clientX;drag.lt=now;
    theta=drag.th+dx*.32;apply();
  });
  function release(){
    if(!drag)return;
    var d=drag;drag=null;lastMoved=d.moved;
    wrap.classList.remove('grab');
    var proj=theta+d.v*.32*140;
    animateTo(Math.round(proj/step)*step,520);
  }
  wrap.addEventListener('pointerup',release);
  wrap.addEventListener('pointercancel',release);

  var photo=$('#photo'),flip=$('#flip'),blank=$('#blank');
  var flipDeg=0,revealed=false,photoBusy=false,photoNext=Infinity;
  function setFlip(deg,z){flip.style.transform='rotateY('+deg+'deg) rotateZ('+(z||0)+'deg)'}
  function userFlip(){
    if(photoBusy||!isBuilt(photo))return;
    photoBusy=true;
    flip.style.transition=reduce?'none':'transform .9s cubic-bezier(.2,.8,.2,1)';
    flipDeg+=180;setFlip(flipDeg,0);
    if(!revealed){revealed=true;setTimeout(function(){blank.style.display='none'},450)}
    setTimeout(function(){flip.style.transition='none';photoBusy=false;photoNext=performance.now()+16000},reduce?10:950);
  }
  photo.addEventListener('click',userFlip);
  photo.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();userFlip()}});

  var layer=$('#layer'),sels=document.querySelectorAll('.sel');
  var cfg=[['agent_layout','--yellow'],['agent_copy','--red'],['agent_review','--orange']];
  var cursorSvg='<svg viewBox="0 0 22 22"><path d="M3 2L3 17L7.2 13.2L10 19.5L12.4 18.4L9.7 12.3L15.5 12.3Z"/></svg>';
  var corners=[[0,0],[1,0],[0,1],[1,1]];
  var t00=performance.now();

  var agents=cfg.map(function(c,i){
    var color='var('+c[1]+')';
    var el=document.createElement('div');el.className='cur';el.style.setProperty('--c',color);
    el.innerHTML=cursorSvg+'<span>'+c[0]+'</span>';
    var box=document.createElement('div');box.className='selbox';box.style.setProperty('--c',color);
    box.innerHTML='<i class="tl"></i><i class="tr"></i><i class="bl"></i><i class="br"></i><b></b>';
    layer.appendChild(box);layer.appendChild(el);
    return {name:c[0],el:el,box:box,tag:box.querySelector('b'),tagText:'',override:'',
      x:innerWidth*(.2+.15*i),y:innerHeight*.3,state:'idle',wait:t00+450+i*420,
      target:null,script:null,act:null,noAct:false,rx:0,ry:0,t0:0,dur:1,until:0};
  });

  function usableWidth(){return innerWidth-(innerWidth>=1180?300:0)}
  function visible(el){
    if(el.classList.contains('frame')){var fr=rectOf(el);return fr.height>120&&fr.width>40&&fr.left<usableWidth()-24}
    var r=el.getBoundingClientRect(),cy=(r.top+r.bottom)/2;
    return r.width>40&&r.height>14&&cy>96&&cy<innerHeight-96&&r.right>24&&r.left<usableWidth()-24;
  }
  function pick(a){
    var taken=agents.filter(function(o){return o!==a&&o.target}).map(function(o){return o.target});
    if(ptr.has&&ptr.mouse&&Math.random()<.4){
      var hov=document.elementFromPoint(ptr.x,ptr.y),hs=hov&&hov.closest?hov.closest('.sel'):null;
      if(hs&&hs!==photo&&hs!==a.target&&taken.indexOf(hs)<0&&isBuilt(hs)&&visible(hs))return hs;
    }
    var c=[];
    [].forEach.call(sels,function(el){
      if(el===a.target||el===photo||taken.indexOf(el)>=0||!isBuilt(el)||!visible(el))return;
      c.push(el);
      if(el.dataset.action){c.push(el,el,el)}
    });
    if(!c.length)return null;
    return c[Math.floor(Math.random()*c.length)];
  }
  function cornerPt(r,fx,fy){return {x:r.left+fx*r.width,y:r.top+fy*r.height}}
  function seg(e,ds){
    var s=0;
    for(var i=0;i<ds.length;i++){if(e<s+ds[i])return {i:i,p:(e-s)/ds[i]};s+=ds[i]}
    return {i:ds.length,p:1};
  }
  function resetEl(el){el.style.transform='';el.style.transition='';el.style.transformOrigin=''}
  function photoVisible(){
    var r=photo.getBoundingClientRect(),cy=(r.top+r.bottom)/2;
    return cy>110&&cy<innerHeight-110&&r.left<usableWidth()-20;
  }
  function photoWants(now){
    if(photoBusy||now-t00<350||!isBuilt(photo))return false;
    if(!revealed)return photoVisible();
    return now>photoNext&&photoVisible();
  }

  function setBox(a,l,t,w,h,text){
    a.box.style.transform='translate3d('+l+'px,'+t+'px,0)';
    a.box.style.width=w+'px';
    a.box.style.height=h+'px';
    if(text!==a.tagText){a.tag.textContent=text;a.tagText=text}
  }
  function begin(a,t,now,script){
    a.target=t;a.script=script;a.override='';
    var c=script==='photo'?[0,0]:corners[Math.floor(Math.random()*4)];
    a.sx=c[0];a.sy=c[1];
    a.fx=a.x;a.fy=a.y;
    var r=rectOf(t),p=cornerPt(r,c[0],c[1]);
    a.state='travel';a.t0=now;
    a.dur=reduce?1:(a.build?clamp(Math.hypot(p.x-a.x,p.y-a.y)/4.5,120,300):clamp(Math.hypot(p.x-a.x,p.y-a.y)/3,170,420));
  }
  function abort(a){
    a.box.classList.remove('on','drawing');
    if(a.target)resetEl(a.target);
    if(a.script==='photo'){photoBusy=false;photoNext=performance.now()+4000;setFlip(flipDeg,0)}
    if(a.act==='roll'){rollBusy=false;animateTo(Math.round(theta/step)*step,200)}
    if(a.build&&a.target&&a.target.classList.contains('frame'))a.target._doing=false;
    a.build=false;
    a.target=null;a.script=null;a.act=null;a.override='';a.noAct=false;
    a.state='idle';a.wait=performance.now()+200;
  }
  function startAct(a,type,now,r){
    a.state='act';a.act=type;a.t0=now;a.px=a.x;a.py=a.y;a.offx=0;a.offy=0;
    var el=a.target;
    if(type==='drag'){
      el.style.transition='none';
      a.dx=(Math.random()<.5?-1:1)*(14+Math.random()*14);
      a.dy=(Math.random()<.5?-1:1)*(8+Math.random()*10);
      a.rot=(Math.random()<.5?-1:1)*(.5+Math.random()*.6);
    }
    if(type==='resize'){el.style.transition='none';el.style.transformOrigin='0 0';a.nw=r.width}
    if(type==='roll'){rollBusy=true;animId++;a.th0=Math.round(theta/step)*step}
    if(type==='photo'){
      a.deg0=flipDeg;
      a.v0x=r.right+16-(r.left+r.width/2);
      a.v0y=r.bottom+16-(r.top+r.height/2);
      flip.style.transition='none';
    }
  }
  function arrive(a,now,r){
    var t=a.target;
    a.rx=a.x-(r.left+r.width/2);a.ry=a.y-(r.top+r.height/2);
    selline.innerHTML='<b>'+a.name+'</b> selected '+(t.dataset.label||'Layer');
    setTool(t.dataset.tool||'move');
    highlightLayer(t,a.box.style.getPropertyValue('--c'));
    if(a.build){
      a.build=false;buildDone(t);
      selline.innerHTML='<b>'+a.name+'</b> built '+(t.dataset.label||'Layer');
      a.state='hold';a.until=now+150;return;
    }
    if(a.noAct){a.noAct=false;a.state='hold';a.until=now+2200;return}
    if(a.script==='photo'){startAct(a,'photo',now,r);return}
    if(!reduce){
      if(t.dataset.action==='roll'&&!rollBusy&&!drag){startAct(a,'roll',now,r);return}
      if(t.matches('.card,.stat,.now')){
        var q=Math.random();
        if(q<.3){startAct(a,'drag',now,r);return}
        if(q<.55){startAct(a,'resize',now,r);return}
      }
    }
    a.state='hold';a.until=now+(reduce?5000:1000+Math.random()*1100);
  }
  function finishAct(a,now,r){
    var type=a.act;
    if(type==='photo'){
      flipDeg=a.deg0+180;setFlip(flipDeg,0);
      revealed=true;blank.style.display='none';
      photoBusy=false;photoNext=now+16000;
    }
    if(type==='roll'){rollBusy=false;theta=a.th0-step;apply()}
    resetEl(a.target);
    a.act=null;a.script=null;a.override='';
    var rr=rectOf(a.target);
    a.rx=a.x-(rr.left+rr.width/2);a.ry=a.y-(rr.top+rr.height/2);
    a.state='hold';a.until=now+(reduce?5000:450+Math.random()*450);
  }
  function runAct(a,now,r){
    var e=now-a.t0,el=a.target,s,q,k,cx=r.left+r.width/2,cy=r.top+r.height/2;
    if(a.act==='drag'){
      s=seg(e,[180,300,200,260]);
      var bx=cx-a.offx,by=cy-a.offy;
      if(s.i===0){q=ease.out(s.p);a.x=lerp(a.px,bx,q);a.y=lerp(a.py,by,q)}
      else{
        k=s.i===1?ease.io(s.p):s.i===2?1:s.i===3?1-ease.io(s.p):0;
        a.offx=a.dx*k;a.offy=a.dy*k;
        el.style.transform='translate('+a.offx+'px,'+a.offy+'px) rotate('+(a.rot*k)+'deg)';
        a.x=bx+a.offx;a.y=by+a.offy;
        a.override='Move · X '+fmt(a.offx)+'  Y '+fmt(a.offy);
      }
      if(s.i>=4)finishAct(a,now,r);
    }else if(a.act==='resize'){
      s=seg(e,[200,320,200,260]);
      if(s.i===0){q=ease.out(s.p);a.x=lerp(a.px,r.right,q);a.y=lerp(a.py,r.bottom,q)}
      else{
        k=s.i===1?ease.io(s.p):s.i===2?1:s.i===3?1-ease.io(s.p):0;
        el.style.transform='scale('+(1+k*Math.min(.06,22/a.nw))+')';
        a.x=r.right;a.y=r.bottom;
      }
      if(s.i>=4)finishAct(a,now,r);
    }else if(a.act==='roll'){
      s=seg(e,[200,440,260]);
      if(s.i===0){q=ease.out(s.p);a.x=lerp(a.px,cx+110,q);a.y=lerp(a.py,cy+40,q)}
      else{
        q=s.i===1?ease.io(s.p):1;
        a.x=lerp(cx+110,cx-110,q);a.y=cy+40;
        theta=a.th0-step*q;apply();
        a.override='Drag · barrel';
      }
      if(s.i>=3)finishAct(a,now,r);
    }else if(a.act==='photo'){
      s=seg(e,[260,140,820,300]);
      if(s.i===0){q=ease.out(s.p);a.x=lerp(a.px,cx+a.v0x,q);a.y=lerp(a.py,cy+a.v0y,q)}
      else if(s.i===1){a.x=cx+a.v0x;a.y=cy+a.v0y}
      else{
        q=s.i===2?ease.io(s.p):1;
        var phi=-1.05*q,co=Math.cos(phi),si=Math.sin(phi);
        a.x=cx+a.v0x*co-a.v0y*si;
        a.y=cy+a.v0x*si+a.v0y*co;
        setFlip(a.deg0+180*q,-7*Math.sin(q*Math.PI));
        if(q>.5&&!revealed){blank.style.display='none';revealed=true}
        a.override='Rotate · '+Math.round(180*q)+'°';
      }
      if(s.i>=4)finishAct(a,now,r);
    }
  }

  function step1(a,now){
    var t=a.target,r=t?rectOf(t):null;
    if(a.state==='idle'){
      if(t&&!visible(t)){a.box.classList.remove('on');a.target=null;t=null}
      if(t){a.x=r.left+r.width/2+a.rx;a.y=r.top+r.height/2+a.ry}
      if(now>=a.wait){
        if(photoWants(now)){photoBusy=true;begin(a,photo,now,'photo')}
        else{
          var bt=buildMode?nextBuild():null;
          if(bt){a.build=true;begin(a,bt,now,null)}
          else{var nt=pick(a);if(nt)begin(a,nt,now,null);else a.wait=now+300}
        }
      }
    }else{
      if(!t||!(a.build?visibleB(t):visible(t))){abort(a);return}
      var p,e;
      if(a.state==='travel'){
        p=Math.min(1,(now-a.t0)/a.dur);e=ease.out(p);
        var c0=cornerPt(r,a.sx,a.sy);
        a.x=lerp(a.fx,c0.x,e);a.y=lerp(a.fy,c0.y,e);
        if(p>=1){
          a.state='press';a.t0=now;a.dur=reduce?1:(a.build?70:110);
          a.box.classList.remove('on','drawing');
          a.el.classList.add('click');
        }
      }else if(a.state==='press'){
        var c1=cornerPt(r,a.sx,a.sy);a.x=c1.x;a.y=c1.y;
        if(now-a.t0>=a.dur){
          a.el.classList.remove('click');
          a.state='draw';a.t0=now;
          a.dur=reduce?1:(a.build?clamp(Math.hypot(r.width,r.height)/3.4,220,440):clamp(Math.hypot(r.width,r.height)/2.2,300,560));
          a.box.classList.add('on','drawing');
        }
      }else if(a.state==='draw'){
        p=Math.min(1,(now-a.t0)/a.dur);e=ease.io(p);
        var s0=cornerPt(r,a.sx,a.sy),o0=cornerPt(r,1-a.sx,1-a.sy);
        a.x=lerp(s0.x,o0.x,e);a.y=lerp(s0.y,o0.y,e);
        var l=Math.min(s0.x,a.x),tp=Math.min(s0.y,a.y),w=Math.abs(a.x-s0.x),h=Math.abs(a.y-s0.y);
        setBox(a,l,tp,w,h,Math.round(w)+' × '+Math.round(h));
        if(p>=1){a.box.classList.remove('drawing');arrive(a,now,r)}
      }else if(a.state==='act'){
        runAct(a,now,r);
      }else if(a.state==='hold'){
        a.x=r.left+r.width/2+a.rx;a.y=r.top+r.height/2+a.ry;
        if(now>a.until){a.state='idle';a.wait=now+(reduce?2500:60+Math.random()*200)}
      }
    }
    if(a.target&&a.state!=='draw'&&a.state!=='travel'&&a.state!=='press'&&a.box.classList.contains('on')){
      var rr=rectOf(a.target);
      var text=a.override||((a.target.dataset.label||'Layer')+' · '+Math.round(rr.width)+' × '+Math.round(rr.height));
      setBox(a,rr.left,rr.top,rr.width,rr.height,text);
    }
    a.el.style.transform='translate3d('+a.x+'px,'+a.y+'px,0)';
  }

  var present=false,pending=null;
  var ptr={x:0,y:0,has:false,mouse:false};
  var meEl=$('#me');

  function direct(el){
    if(!el)return;
    if(buildMode)revealNow(el);
    el.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});
    pending={el:el,until:performance.now()+3500};
  }
  function servePending(now){
    if(!pending)return;
    if(now>pending.until){pending=null;return}
    if(!visible(pending.el))return;
    var a=agents.filter(function(o){return o.state==='idle'||o.state==='hold'})[0]||agents[0];
    abort(a);
    begin(a,pending.el,now,null);
    a.noAct=true;
    pending=null;
  }
  function rollTo(idx){
    var base=Math.round(theta/step)*step;
    var front=((Math.round(-theta/step)%N)+N)%N;
    var d=((idx-front)%N+N)%N;
    if(d>N/2)d-=N;
    animateTo(base-d*step,520);
  }

  function renderLayers(name){
    var html='',counts={};
    layerRows=[];
    frames.forEach(function(f){
      var act=f.dataset.name===name;
      html+='<button class="ly lt'+(act?' act':'')+'" type="button" data-f="'+f.dataset.name+'"><svg viewBox="0 0 24 24"><path d="M7 3v18M17 3v18M3 7h18M3 17h18"/></svg>'+f.dataset.name+'</button>';
      if(act){
        counts={};
        [].forEach.call(f.querySelectorAll('.sel'),function(el){
          if(layerRows.length>=12)return;
          var l=el.dataset.label||'Layer';
          counts[l]=(counts[l]||0)+1;
          html+='<button class="ly child" type="button" data-k="'+layerRows.length+'">'+(counts[l]>1?l+' '+counts[l]:l)+'</button>';
          layerRows.push(el);
        });
      }
    });
    layersEl.innerHTML=html;
  }
  function highlightLayer(el,color){
    [].forEach.call(layersEl.querySelectorAll('.child'),function(r){
      var on=layerRows[+r.dataset.k]===el;
      r.classList.toggle('hi',on);
      if(on)r.style.setProperty('--c',color);
    });
  }
  layersEl.addEventListener('click',function(e){
    var b=e.target.closest('.ly');
    if(!b)return;
    if(b.dataset.f){
      var f=frames.filter(function(x){return x.dataset.name===b.dataset.f})[0];
      direct(f.querySelector('.sel'));
    }else if(b.dataset.k){
      direct(layerRows[+b.dataset.k]);
    }
  });

  var pins=[
    {sel:'.stats .stat:nth-child(2)',who:'agent_review',c:'--orange',text:'Validated against 93 hand-rated responses. The judge scored 0.16 on open-ended content, so it is strongest on factual and support tasks.'},
    {sel:'.timeline .job:nth-child(1)',who:'agent_copy',c:'--red',text:'Reports and dashboards run on Google Sheets, Excel and internal APIs.'},
    {sel:'.timeline .job:nth-child(3)',who:'agent_review',c:'--orange',text:'The results fed into 2 candidate publications.'},
    {sel:'.bg-grid .card:nth-child(2)',who:'agent_layout',c:'--yellow',text:'10,000+ Raipur air quality readings, formatted to IEEE conference standards.'},
    {sel:'#barrel',who:'agent_copy',c:'--red',text:'CMLRE is deployed on Vercel and Railway. Prism has an IEEE-style report.',inside:true}
  ];
  function closePins(){
    [].forEach.call(document.querySelectorAll('.pinwrap.open'),function(w){
      w.classList.remove('open');
      w.querySelector('.pin').setAttribute('aria-expanded','false');
    });
  }
  pins.forEach(function(p,i){
    var host=document.querySelector(p.sel);
    if(!host)return;
    host.classList.add('pin-host');
    var w=document.createElement('span');
    w.className='pinwrap'+(p.inside?' in':'');
    w.style.setProperty('--c','var('+p.c+')');
    w.innerHTML='<button class="pin" type="button" aria-expanded="false" aria-label="Comment '+(i+1)+' by '+p.who+'">'+(i+1)+'</button><div class="bubble" role="dialog"><span class="who">'+p.who+'</span><p>'+p.text+'</p><button class="btn rs" type="button">Resolve</button></div>';
    host.appendChild(w);
    w.addEventListener('pointerdown',function(e){e.stopPropagation()});
    w.addEventListener('click',function(e){
      e.stopPropagation();
      if(e.target.closest('.rs')){
        var done=w.classList.toggle('resolved');
        e.target.closest('.rs').textContent=done?'Reopen':'Resolve';
        return;
      }
      if(e.target.closest('.pin')){
        var was=w.classList.contains('open');
        closePins();
        if(!was){w.classList.add('open');w.querySelector('.pin').setAttribute('aria-expanded','true')}
      }
    });
  });
  document.addEventListener('click',function(e){if(!e.target.closest('.pinwrap'))closePins()});

  var drawer=$('#drawer'),vers=$('#vers'),bver=$('#bver');
  var versions=[
    {v:'v1',date:'Aug 2024',title:'Started B.Tech in CSE at IIIT Naya Raipur',sel:'.bg-grid .card:first-child'},
    {v:'v2',date:'Sep 2025',title:'Technical Intern at Rootvestors',sel:'.timeline .job:nth-child(4)'},
    {v:'v3',date:'Summer 2026',title:'Research Intern at IIT Jammu',sel:'.timeline .job:nth-child(3)'},
    {v:'v4',date:'Sep to Oct 2026',title:'Founder\'s Office Intern at FlowSet Hub',sel:'.timeline .job:nth-child(2)'},
    {v:'v5',date:'Nov 2026',title:'SDE Intern at Iconic Styles',sel:'.timeline .job:nth-child(1)'}
  ];
  vers.innerHTML=versions.slice().reverse().map(function(x,i){
    return '<button class="ver'+(i===0?' cur':'')+'" type="button" data-s="'+x.sel+'"><span class="vd"></span><span class="vb"><span class="vt">'+x.v+(i===0?' · Current':'')+'</span><b>'+x.title+'</b><span class="vs">'+x.date+'</span></span></button>';
  }).join('');
  function openDrawer(){drawer.classList.add('open');bver.setAttribute('aria-expanded','true')}
  function closeDrawer(){drawer.classList.remove('open');bver.setAttribute('aria-expanded','false')}
  bver.addEventListener('click',function(){drawer.classList.contains('open')?closeDrawer():openDrawer()});
  $('#dclose').addEventListener('click',closeDrawer);
  vers.addEventListener('click',function(e){
    var b=e.target.closest('.ver');
    if(b)direct(document.querySelector(b.dataset.s));
  });

  function setPresent(on){
    present=on;
    document.body.classList.toggle('present',on);
    if(on){closePalette();closeDrawer();closePins();agents.forEach(function(a){abort(a)});drawInspect()}
  }
  $('#bpresent').addEventListener('click',function(){setPresent(true)});
  $('#exitp').addEventListener('click',function(){setPresent(false)});

  var insp=$('#inspect'),tinspect=$('#tinspect');
  var altHeld=false,latched=false;
  function mk(cls){var d=document.createElement('div');d.className=cls;insp.appendChild(d);return d}
  var ip={box:mk('i-box'),par:mk('i-par'),size:mk('i-size'),ln:[mk('i-line'),mk('i-line'),mk('i-line'),mk('i-line')],lb:[mk('i-lab'),mk('i-lab'),mk('i-lab'),mk('i-lab')]};
  function placeRect(d,l,t,w,h){
    d.style.transform='translate3d('+l+'px,'+t+'px,0)';
    d.style.width=w+'px';d.style.height=h+'px';
  }
  function placeLabel(d,x,y,text,anchor){
    d.textContent=text;
    d.style.transform='translate3d('+x+'px,'+y+'px,0) translate('+anchor+')';
    d.style.display='block';
  }
  function hideSide(i){ip.ln[i].style.display='none';ip.lb[i].style.display='none'}
  function drawInspect(){
    if(present||!(altHeld||latched)||!ptr.has){insp.style.display='none';return}
    var h=document.elementFromPoint(ptr.x,ptr.y);
    var el=h&&h.closest?h.closest('.sel'):null;
    var par=el&&el.parentElement?el.parentElement.closest('.frame'):null;
    if(!el||!par){insp.style.display='none';return}
    insp.style.display='block';
    var e=el.getBoundingClientRect(),p=par.getBoundingClientRect();
    var ex=(e.left+e.right)/2,ey=(e.top+e.bottom)/2;
    placeRect(ip.box,e.left,e.top,e.width,e.height);
    placeRect(ip.par,p.left,p.top,p.width,p.height);
    var sides=[
      {len:e.left-p.left,x:p.left,y:ey,w:e.left-p.left,h:1,lx:(p.left+e.left)/2,ly:ey},
      {len:p.right-e.right,x:e.right,y:ey,w:p.right-e.right,h:1,lx:(p.right+e.right)/2,ly:ey},
      {len:e.top-p.top,x:ex,y:p.top,w:1,h:e.top-p.top,lx:ex,ly:(p.top+e.top)/2},
      {len:p.bottom-e.bottom,x:ex,y:e.bottom,w:1,h:p.bottom-e.bottom,lx:ex,ly:(p.bottom+e.bottom)/2}
    ];
    sides.forEach(function(s,i){
      if(s.len<4){hideSide(i);return}
      ip.ln[i].style.display='block';
      placeRect(ip.ln[i],s.x,s.y,s.w,s.h);
      placeLabel(ip.lb[i],s.lx,s.ly,Math.round(s.len),'-50%,-50%');
    });
    placeLabel(ip.size,ex,e.bottom+8,Math.round(e.width)+' × '+Math.round(e.height),'-50%,0');
  }
  tinspect.addEventListener('click',function(){
    latched=!latched;
    tinspect.classList.toggle('latched',latched);
    tinspect.setAttribute('aria-pressed',latched?'true':'false');
    drawInspect();
  });
  addEventListener('keydown',function(e){
    if(e.key==='Alt'){altHeld=true;e.preventDefault();drawInspect()}
  });
  addEventListener('keyup',function(e){
    if(e.key==='Alt'){altHeld=false;e.preventDefault();drawInspect()}
  });
  addEventListener('blur',function(){altHeld=false;drawInspect()});
  addEventListener('scroll',drawInspect,{passive:true});
  addEventListener('pointermove',function(e){
    ptr.x=e.clientX;ptr.y=e.clientY;ptr.has=true;ptr.mouse=e.pointerType==='mouse';
    if(ptr.mouse&&!present){
      meEl.style.transform='translate3d('+(e.clientX+14)+'px,'+(e.clientY+18)+'px,0)';
      meEl.style.opacity='1';
    }
    drawInspect();
  },{passive:true});
  addEventListener('pointerdown',function(e){
    ptr.x=e.clientX;ptr.y=e.clientY;ptr.has=true;ptr.mouse=e.pointerType==='mouse';
    drawInspect();
  },{passive:true});
  document.documentElement.addEventListener('mouseleave',function(){meEl.style.opacity='0';ptr.has=false;drawInspect()});

  var palBack=$('#palback'),palIn=$('#palin'),palList=$('#pallist');
  var palOpen=false,palSel=0,palItems=[],lastFocus=null;
  var isMac=/Mac|iPhone|iPad/.test(navigator.platform||'');
  $('#kbdhint').textContent=isMac?'⌘K':'Ctrl K';
  var cmds=[];
  frames.forEach(function(f){
    cmds.push({g:'Jump to',label:f.dataset.name,hint:'Section',run:function(){direct(f.querySelector('.sel'))}});
  });
  cards.forEach(function(c,i){
    cmds.push({g:'Projects',label:c.dataset.title,hint:'Barrel face '+(i+1),run:function(){rollTo(i);direct(wrap)}});
  });
  [].forEach.call(document.querySelectorAll('.job'),function(j){
    cmds.push({
      g:'Experience',
      label:j.querySelector('h3').textContent+' · '+j.querySelector('.org').textContent,
      hint:j.querySelector('.when').innerHTML.replace(/<br>/g,' '),
      run:function(){direct(j)}
    });
  });
  cmds.push({g:'Actions',label:'Version history',hint:'Open timeline',run:openDrawer});
  cmds.push({g:'Actions',label:'Present mode',hint:'Hide the editor',run:function(){setPresent(true)}});
  cmds.push({g:'Actions',label:'Toggle inspect',hint:'Measure spacing',run:function(){tinspect.click()}});
  cmds.push({g:'Actions',label:'Toggle theme',hint:'Dark or light',run:function(){$('#theme').click()}});
  cmds.push({g:'Actions',label:'Flip portrait',hint:'Other photo',run:function(){direct(photo);setTimeout(function(){photo.click()},500)}});
  cmds.push({g:'Actions',label:'Copy email',hint:'To clipboard',run:function(){direct(emailEl);copyBtn.click()}});

  function renderPal(){
    var q=palIn.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    palItems=cmds.filter(function(c){
      var hay=(c.label+' '+c.hint+' '+c.g).toLowerCase();
      return q.every(function(t){return hay.indexOf(t)>=0});
    });
    if(palSel>=palItems.length)palSel=0;
    var html='',last='';
    palItems.forEach(function(c,i){
      if(c.g!==last){html+='<div class="pg">'+c.g+'</div>';last=c.g}
      html+='<div class="po'+(i===palSel?' on':'')+'" role="option" id="po'+i+'" aria-selected="'+(i===palSel)+'" data-i="'+i+'"><span>'+c.label+'</span><em>'+c.hint+'</em></div>';
    });
    if(!palItems.length)html='<div class="pe">No matches</div>';
    palList.innerHTML=html;
    palIn.setAttribute('aria-activedescendant',palItems.length?'po'+palSel:'');
    var on=palList.querySelector('.po.on');
    if(on)on.scrollIntoView({block:'nearest'});
  }
  function openPalette(){
    lastFocus=document.activeElement;
    palOpen=true;palBack.classList.add('open');
    palIn.value='';palSel=0;renderPal();palIn.focus();
  }
  function closePalette(){
    if(!palOpen)return;
    palOpen=false;palBack.classList.remove('open');
    if(lastFocus&&lastFocus.focus)lastFocus.focus();
  }
  function runPal(i){
    var c=palItems[i];
    if(!c)return;
    closePalette();
    c.run();
  }
  $('#bsearch').addEventListener('click',openPalette);
  palIn.addEventListener('input',function(){palSel=0;renderPal()});
  palIn.addEventListener('keydown',function(e){
    if(e.key==='ArrowDown'){e.preventDefault();if(palItems.length){palSel=(palSel+1)%palItems.length;renderPal()}}
    else if(e.key==='ArrowUp'){e.preventDefault();if(palItems.length){palSel=(palSel-1+palItems.length)%palItems.length;renderPal()}}
    else if(e.key==='Enter'){e.preventDefault();runPal(palSel)}
  });
  palList.addEventListener('mousemove',function(e){
    var o=e.target.closest('.po');
    if(o&&+o.dataset.i!==palSel){palSel=+o.dataset.i;renderPal()}
  });
  palList.addEventListener('click',function(e){
    var o=e.target.closest('.po');
    if(o)runPal(+o.dataset.i);
  });
  palBack.addEventListener('pointerdown',function(e){if(e.target===palBack)closePalette()});
  addEventListener('keydown',function(e){
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();palOpen?closePalette():openPalette();return}
    if(e.key==='Escape'){
      if(palOpen){closePalette();return}
      if(drawer.classList.contains('open')){closeDrawer();return}
      if(document.querySelector('.pinwrap.open')){closePins();return}
      if(present)setPresent(false);
    }
  });

  var buildMode=document.documentElement.classList.contains('build');
  if(!buildMode&&!reduce){buildMode=true;document.documentElement.classList.add('build')}
  function rectOf(el){
    var r=el.getBoundingClientRect();
    if(!el.classList.contains('frame'))return r;
    var top=Math.max(r.top,64),bottom=Math.min(r.bottom,innerHeight-72);
    return {left:r.left,right:r.right,top:top,bottom:bottom,width:r.width,height:Math.max(0,bottom-top)};
  }
  function isBuilt(el){return !buildMode||el.classList.contains('built')}
  function unbuiltOf(f){
    return [].filter.call(f.querySelectorAll('.sel'),function(el){return !el.classList.contains('built')});
  }
  function markBuilt(el,anim){
    el.classList.add('built');
    if(anim&&!el.classList.contains('frame')){
      el.classList.add('just-built');
      setTimeout(function(){el.classList.remove('just-built')},650);
    }
  }
  function finishCheck(){
    if(!buildMode)return;
    var all=frames.every(function(f){return f.classList.contains('built')&&!unbuiltOf(f).length});
    if(all){buildMode=false;document.documentElement.classList.remove('build')}
  }
  function buildDone(t){
    markBuilt(t,true);
    if(t.classList.contains('frame'))t._doing=false;
    finishCheck();
  }
  function revealNow(el){
    var f=el.closest('.frame');
    if(f&&!f.classList.contains('built'))markBuilt(f,false);
    if(!el.classList.contains('frame')&&!el.classList.contains('built'))markBuilt(el,true);
    finishCheck();
  }
  function buildAll(f){
    markBuilt(f,false);
    unbuiltOf(f).forEach(function(el){markBuilt(el,false)});
    finishCheck();
  }
  frames.forEach(function(f){f.dataset.label='Frame · '+f.dataset.name;f.dataset.tool='frame'});
  var bio=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting&&!e.target._t)e.target._t=performance.now()});
  },{rootMargin:'0px 0px -10% 0px'});
  frames.forEach(function(f){bio.observe(f)});
  function visibleB(el){
    if(el.classList.contains('frame'))return visible(el);
    var r=el.getBoundingClientRect();
    return r.width>40&&r.height>14&&r.top<innerHeight-30&&r.bottom>70&&r.right>24&&r.left<usableWidth()-24;
  }
  function replay(){
    reduce=false;
    agents.forEach(function(a){abort(a)});
    pending=null;
    closePalette();closeDrawer();closePins();
    frames.forEach(function(f){
      f.classList.remove('built');f._doing=false;f._t=0;
      [].forEach.call(f.querySelectorAll('.sel'),function(el){el.classList.remove('built','just-built')});
    });
    flipDeg=0;setFlip(0,0);blank.style.display='';revealed=false;photoNext=Infinity;photoBusy=false;
    buildMode=true;
    document.documentElement.classList.add('build');
    scrollTo({top:0,behavior:'auto'});
    frames.forEach(function(f){bio.unobserve(f);bio.observe(f)});
  }
  $('#breplay').addEventListener('click',replay);
  cmds.push({g:'Actions',label:'Replay build',hint:'Rebuild from scratch',run:replay});
  var xpanel=$('#xpanel'),bexport=$('#bexport');
  function setExport(o){xpanel.classList.toggle('open',o);bexport.setAttribute('aria-expanded',o?'true':'false')}
  bexport.addEventListener('click',function(e){e.stopPropagation();setExport(!xpanel.classList.contains('open'))});
  document.addEventListener('click',function(e){if(!e.target.closest('#xpanel'))setExport(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')setExport(false)});
  cmds.push({g:'Actions',label:'Export resume',hint:'PDF or PNG',run:function(){setExport(true)}});


  var cc=$('#codecard');
  if(cc){
    var cl=[].slice.call(cc.querySelectorAll('.ln')),cbody=cc.querySelector('.cbody'),ccur=cc.querySelector('.ccur'),
        cbar=cc.querySelector('.cbar u'),cpct=cc.querySelector('.cpct'),cstat=cc.querySelector('.cstat'),
        secret=cc.querySelector('.secret'),cout=cc.querySelector('.cout'),cot=cc.querySelector('.ot'),
        cprog=0,ctgt=0,cdone=false,cbusy=false,cdone2=false;
    cl.forEach(function(l){l._t=l.querySelector('.t')});
    function cpaint(){
      var n=cl.length,x=cprog*n,full=Math.floor(x),frac=x-full,front=null;
      cl.forEach(function(l,i){
        var t=l._t;
        if(i<full||cprog>=1){l.style.opacity=1;t.style.clipPath='none'}
        else if(i===full){l.style.opacity=1;t.style.clipPath='inset(0 '+((1-frac)*100)+'% 0 0)';front=l}
        else{l.style.opacity=0;t.style.clipPath='none'}
      });
      if(front){
        ccur.style.opacity=1;
        ccur.style.transform='translate('+(front._t.offsetLeft+front._t.offsetWidth*frac)+'px,'+front._t.offsetTop+'px)';
      }else ccur.style.opacity=0;
      var pc=Math.round(cprog*100);
      cpct.textContent=pc+'%';cbar.style.width=pc+'%';
      if(cprog>=1&&!cdone){
        cdone=true;cc.classList.add('done');
        cstat.lastChild.textContent='Build complete';
        secret.setAttribute('aria-disabled','false');
      }
    }
    function ctarget(){
      var gated=document.documentElement.classList.contains('build')&&!cc.classList.contains('built');
      if(gated)return;
      var r=cbody.getBoundingClientRect();
      var v=(innerHeight*.8-r.top)/Math.max(r.height,1);
      ctgt=Math.max(ctgt,Math.min(1,Math.max(0,v)));
      if(!craf)craf=requestAnimationFrame(cstep);
    }
    var craf=0;
    function cstep(){
      craf=0;
      var d=ctgt-cprog;
      if(reduce||Math.abs(d)<.0008)cprog=ctgt;else cprog+=d*.16;
      cpaint();
      if(cprog!==ctgt)craf=requestAnimationFrame(cstep);
    }
    addEventListener('scroll',ctarget,{passive:true});
    addEventListener('resize',ctarget);
    cpaint();ctarget();
    var glyphs='!<>-_/[]{}=+*^?#%';
    function say(str,done){
      cout.classList.add('on');cot.textContent='';
      var i=0;
      (function k(){
        cot.textContent=str.slice(0,i);
        if(i++<str.length)setTimeout(k,reduce?0:28);else if(done)done();
      })();
    }
    secret.addEventListener('click',function(){
      if(!cdone||cbusy||cdone2)return;
      cbusy=true;
      var sv=secret.querySelector('.sv'),fin='agentic-ai',t0=performance.now(),dur=reduce?1:1100;
      (function f(now){
        var k=Math.min(1,(now-t0)/dur),n=Math.floor(k*fin.length),o='';
        for(var i=0;i<fin.length;i++)o+=i<n?fin[i]:glyphs[Math.floor(Math.random()*glyphs.length)];
        sv.textContent=o;
        if(k<1)requestAnimationFrame(f);
        else{
          sv.textContent=fin;secret.classList.add('open');cc.classList.add('opened');cdone2=true;cbusy=false;
          say('Currently experimenting with agentic AI.');
        }
      })(t0);
    });
    function resetCode(){
      cprog=0;ctgt=0;cdone=false;cdone2=false;cbusy=false;
      cc.classList.remove('done','opened');secret.classList.remove('open');
      secret.setAttribute('aria-disabled','true');
      secret.querySelector('.sv').textContent='\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592\u2592';
      cstat.lastChild.textContent='Under construction';
      cout.classList.remove('on');cot.textContent='';
      cpaint();
    }
    $('#breplay').addEventListener('click',resetCode);
    cmds.forEach(function(c){if(c.label==='Replay build'){var o=c.run;c.run=function(){o();resetCode()}}});
    cmds.push({g:'Actions',label:'Run the secret',hint:'Decrypt the last line',run:function(){direct(cc);var w=setInterval(function(){if(cdone){clearInterval(w);secret.click()}},400);setTimeout(function(){clearInterval(w)},15000)}});
  }

  var thread=$('#thread'),hunting=false;
  function bugHunt(){
    if(hunting)return;
    var host=$('#nowbuild');
    if(!host)return;
    hunting=true;
    host.style.position='relative';
    direct(host);
    var script=[
      ['agent_review','Reproduced. The backend card returns a 500.',2],
      ['agent_layout','Not a layout bug. Checked twice.',0],
      ['agent_copy','Works on my machine.',1],
      ['agent_review','Patched and shipped.',2]
    ];
    thread.innerHTML='<h4>Bug hunt</h4>';
    thread.classList.add('open');
    setTimeout(function(){host.classList.add('bugged')},600);
    var cols=['--yellow','--red','--orange'];
    script.forEach(function(m,i){
      setTimeout(function(){
        var p=document.createElement('p');
        p.innerHTML='<b style="--c:var('+cols[m[2]]+')">'+m[0]+'</b>'+m[1];
        thread.appendChild(p);
      },1400+i*1300);
    });
    setTimeout(function(){
      host.classList.remove('bugged');
      var ok=document.createElement('p');ok.className='ok';ok.textContent='Resolved';thread.appendChild(ok);
    },1400+script.length*1300);
    setTimeout(function(){thread.classList.remove('open');hunting=false},1400+script.length*1300+2600);
  }
  cmds.push({g:'Actions',label:'Start bug hunt',hint:'Send the agents after a bug',run:bugHunt});
  var seq='';
  document.addEventListener('keydown',function(e){
    var t=e.target;
    if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable)||e.ctrlKey||e.metaKey||e.altKey||e.key.length!==1)return;
    seq=(seq+e.key.toLowerCase()).slice(-3);
    if(seq==='bug'){seq='';bugHunt()}
  });

  function nextBuild(){
    for(var i=0;i<frames.length;i++){
      var f=frames[i];
      if(!f._t)continue;
      if(!f.classList.contains('built')){
        if(f._doing)return null;
        if(!visible(f))continue;
        f._doing=true;
        return f;
      }
      var taken=agents.map(function(o){return o.target});
      var list=unbuiltOf(f);
      for(var j=0;j<list.length;j++){
        if(taken.indexOf(list[j])<0&&visibleB(list[j]))return list[j];
      }
    }
    return null;
  }
  var lastSweep=0;
  function buildSweep(now){
    if(now-lastSweep<500)return;
    lastSweep=now;
    frames.forEach(function(f){
      var fr=f.getBoundingClientRect();
      if(fr.bottom<-80){buildAll(f);return}
      if(!f._t)return;
      unbuiltOf(f).forEach(function(el){
        if(el.getBoundingClientRect().bottom<-40)markBuilt(el,false);
      });
    });
    finishCheck();
  }

  function tick(now){
    window.__alive=now;
    if(buildMode)buildSweep(now);
    if(!present){
      servePending(now);
      agents.forEach(function(a){step1(a,now)});
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
