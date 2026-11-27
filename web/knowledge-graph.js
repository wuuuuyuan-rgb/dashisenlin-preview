/* Workbook knowledge edges and shared catalog; WB-style book-list exploration. */
window.ForestGraph = (() => {
  'use strict';
  const books=window.FOREST.catalogBooks, bookIds=new Set(books.map(book=>book.id));
  const d={...window.FOREST_GRAPH,bookLinks:window.FOREST_GRAPH.bookLinks.filter(link=>bookIds.has(link.book_id))};
  const nodes=new Map(d.nodes.map(n=>[n.node_id,n])), domains=new Map(d.domains.map(n=>[n.domain_id,n]));
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const roles={core:'核心',extension:'延伸',method:'方法'};
  const graphColors={math:'#a3d24a',science:'#68baa0',literature:'#d7b777',polhis:'#c8a45c',philosophy:'#b3a0d2'};
  let ambientEdgeIds=new Set();
  const ambientNodeSize=i=>[5,6,7,8,5,9,6,12,7,15,6,10,5,18,7,8,23][i%17];
  function domainNodes(area){
    const own=new Set(d.nodes.filter(n=>n.domain_id===area).map(n=>n.node_id)),ids=new Set(own);
    for(const e of d.edges)if(own.has(e.source_id)||own.has(e.target_id)){ids.add(e.source_id);ids.add(e.target_id);}
    return ids;
  }
  const ambientNodes=()=>new Set([...domainNodes('science'),...domainNodes('literature')]);
  function sampleAmbientEdges(){
    const ids=ambientNodes(),pool=d.edges.filter(e=>ids.has(e.source_id)&&ids.has(e.target_id));
    for(let i=pool.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
    ambientEdgeIds=new Set(pool.slice(0,Math.floor(pool.length/2)).map(e=>e.edge_id));
  }
  let chart,resize,pulse,frame,dragging=false,draggedNode='',hoverEdge='',domain='',selected='',selectedEdge='',bookId='',positions=new Map(),currentIds=[];
  const adjacent=id=>d.edges.filter(e=>e.source_id===id||e.target_id===id);
  /* Editorial display paths, separate from source knowledge edges/book links.
     These connect concrete concepts to broader ideas for book highlighting;
     they are not claimed as extra direct book matches or academic tree edges. */
  const parentGroups={
    math:{3:[5,8,26,33,35,39,43,44],2:[4,17],1:[6,9,11],41:[16,25,42,45,46],4:[7,10,12,13,14,21,29],5:[15,33,35,39],9:[18,26],11:[19],16:[20,22,23,27,30],40:[24,32,38],24:[28,31,34,36],10:[28],45:[37]},
    science:{1:[5,8,26,32],2:[6,7,9,15,22,23],4:[10,11,14,16,18,20,24,25,33,34,35,36,37,38,43],3:[13,28,41,45],11:[12,13,15],16:[17,31],18:[19],20:[21,22],25:[26,27,28,29,30,44],36:[39,40,42]},
    literature:{1:[5,6,7],2:[8,9,10,11,12,13,14,15,16,17,26,27],4:[12,13,14,15,16,17,19,29,32],3:[18,20,21,22,23,24,25],18:[28,30],26:[30,31],19:[32]},
    polhis:{1:[5,6,8,10,15,16,17,18,19,20,21,35],2:[9,11,12,13,22,25,28,29,30],3:[12,13,22,23,27,28],4:[7,14,24,26,31,32,33,34,35],8:[15,16],10:[17,18,19,20,21],29:[11,25,30],31:[32],22:[33],26:[34]},
    philosophy:{1:[4],2:[5,8,10,11,12,13],3:[6,7,9,14,15],5:[11],6:[9,14]}
  };
  const pathParents=new Map(d.nodes.map(n=>[n.node_id,new Set()]));
  const pathId=(area,n)=>area+'-'+String(n).padStart(3,'0');
  for(const [area,groups] of Object.entries(parentGroups))for(const [parent,children] of Object.entries(groups))for(const child of children)pathParents.get(pathId(area,child)).add(pathId(area,parent));
  // The existing computer/AI connection also links AI to information and systems.
  pathParents.get('math-037').add('science-028');
  for(const e of d.edges)if(e.relation==='包含')pathParents.get(e.target_id).add(e.source_id);
  d.highlightParents=Object.fromEntries([...pathParents].map(([id,parents])=>[id,[...parents]]));
  // Merge task-split entries; explicitly different publication editions stay separate.
  const bookKey = b => (b.classicId||b.id)+'|'+b.title;
  const bookGroup = id => {const b=books.find(b=>b.id===id);return b?books.filter(x=>bookKey(x)===bookKey(b)):[];};
  const graphBookId = id => bookGroup(id)[0]?.id||id;
  const tasksForBook = id => {const linked=new Map(bookGroup(id).flatMap(book=>window.FOREST.coursesForBook(book.id)).map(course=>[course.id,course]));return Object.keys(window.FOREST.courses).filter(id=>linked.has(id)).map(id=>linked.get(id));};
  function bookHighlight(visibleIds){
    const ids=new Set(bookGroup(bookId).map(b=>b.id)),lit=new Set(d.bookLinks.filter(l=>ids.has(l.book_id)&&visibleIds.has(l.node_id)).map(l=>l.node_id));
    const queue=[...lit];
    for(let i=0;i<queue.length;i++)for(const parent of pathParents.get(queue[i])||[]){
      if(!lit.has(parent)){
        lit.add(parent);queue.push(parent);
      }
    }
    return lit;
  }
  function html(){return `<section class="container graph-page network-page"><header class="network-heading"><h1>知识图谱</h1><p>让思想在关联中延申。</p></header><div class="network-layout network-ambient"><aside class="network-book-list" aria-label="学科知识地图与经典书目"><nav class="network-domains" aria-label="知识领域">${d.domains.map(n=>`<div class="network-domain-group"><button class="network-domain" style="--domain-color:${graphColors[n.domain_id]}" data-domain="${esc(n.domain_id)}"><i aria-hidden="true"></i>${esc(n.name)}</button></div>`).join('')}</nav><button class="mobile-book-picker" id="mobile-book-picker" aria-haspopup="dialog" aria-controls="mobile-book-drawer"><span id="mobile-book-choice">选择经典</span><span class="mobile-picker-action">选择经典 <span aria-hidden="true">⌃</span></span></button><div id="network-books"></div></aside><section class="network-stage is-ambient"><button id="graph-fit" class="graph-fit" aria-label="恢复图谱初始视角" title="显示全图"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4l-7 7m0-6v6h6M4 20l7-7m-6 0h6v6"/></svg></button><div id="knowledge-canvas" role="img" aria-label="无文字呼吸点阵，选择领域进入知识图谱"></div></section><aside class="network-panel" id="graph-detail-panel" tabindex="-1" aria-label="知识与经典详情"><div id="network-detail"></div></aside></div><button id="mobile-detail-hint" class="mobile-detail-hint" aria-controls="graph-detail-panel" hidden>查看书籍详情 <span aria-hidden="true">↓</span></button><dialog id="mobile-book-drawer" class="mobile-book-drawer" aria-labelledby="mobile-book-drawer-title"><div class="mobile-drawer-handle" aria-hidden="true"></div><div class="mobile-drawer-heading"><h2 id="mobile-book-drawer-title">选择经典</h2><button id="mobile-drawer-close" aria-label="关闭书目选择">×</button></div><div id="mobile-drawer-books"></div></dialog></section>`;}
  function selection(){
    if(!domain)return ambientNodes();
    const own=new Set(d.nodes.filter(n=>n.domain_id===domain).map(n=>n.node_id)),ids=new Set(own);
    for(const e of d.edges)if(own.has(e.source_id)||own.has(e.target_id)){ids.add(e.source_id);ids.add(e.target_id);}
    if(selected){ids.add(selected);for(const e of adjacent(selected)){ids.add(e.source_id);ids.add(e.target_id);}}
    if(bookId)for(const id of bookHighlight(ids))ids.add(id);
    return ids;
  }
  function domainBooks(){
    const seen=new Set();
    return books.filter(b=>d.bookLinks.some(l=>l.book_id===b.id&&nodes.get(l.node_id).domain_id===domain))
      .filter(b=>{const key=bookKey(b);if(seen.has(key))return false;seen.add(key);return true;})
      .map(b=>books.find(x=>x.id===graphBookId(b.id)))
      .sort((a,b)=>Number(tasksForBook(b.id).length>0)-Number(tasksForBook(a.id).length>0));
  }
  function renderBooks(){
    const list=document.getElementById('network-books'),activeButton=document.querySelector('[data-domain="'+domain+'"]'),mobile=matchMedia('(max-width:700px)').matches;
    if(mobile)document.getElementById('mobile-drawer-books').appendChild(list);else{closeBookDrawer();if(activeButton)activeButton.parentElement.appendChild(list);else document.querySelector('.network-book-list').appendChild(list);}
    const choice=document.getElementById('mobile-book-choice'),picker=document.getElementById('mobile-book-picker');
    choice.innerHTML=bookId?`《${esc(books.find(b=>b.id===bookId).title)}》${tasksForBook(bookId).length>0?'<small class="graph-task-badge">任务</small>':''}`:(domain?'请选择一本经典':'先选择知识领域');picker.disabled=!domain;
    document.getElementById('mobile-book-drawer-title').textContent=domain?domains.get(domain).name+' · 选择经典':'选择经典';
    document.getElementById('network-books').innerHTML=domain?domainBooks().map(b=>`<button class="network-list-book" data-book="${esc(b.id)}" aria-pressed="${bookId===b.id}"><span>《${esc(b.title)}》${tasksForBook(b.id).length>0?'<small class="graph-task-badge">任务</small>':''}</span></button>`).join(''):'';
    document.querySelectorAll('#network-books [data-book]').forEach(b=>b.onclick=()=>selectBook(b.dataset.book));
  }
  function nodeButton(id){const n=nodes.get(id);return `<button class="network-node-link" data-node="${esc(id)}"><i style="background:${domains.get(n.domain_id).color}" aria-hidden="true"></i>${esc(n.name)}${n.kind==='method'?'<small>方法</small>':''}</button>`;}
  function bookCard(id){
    const b=books.find(b=>b.id===id),detail=window.FOREST.books.find(b=>b.id===id)||{},cover=window.FOREST.bookCovers[id],tasks=tasksForBook(id),intro=b.intro||detail.intro||'';
    const grades=['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','十年级','十一年级','十二年级'];
    const labelRow = labels => '<div class="graph-book-labels">'+[...new Set(labels.filter(Boolean))].map(label=>'<span>'+esc(label)+'</span>').join('')+'</div>';
    const taskBlocks=tasks.map(c=>'<section class="graph-task-group" data-course="'+esc(c.id)+'">'+labelRow([c.grade,...(c.subjects||[]),...(Number.isFinite(c.totalHours)&&c.totalHours>0?[c.totalHours+'课时']:[])])+'<a class="graph-task-entry" href="#/course/'+esc(c.id)+'"><span class="graph-task-name">'+esc(c.title)+'</span><span class="graph-task-action">进入任务 <span aria-hidden="true">›</span></span></a></section>').join('');
    const bookLabels=tasks.length?'':labelRow([...(b.gradeLabels||[]).map(g=>grades[g-1]),...(b.subjects||[])]);
    return `<article class="graph-book-card"><div class="graph-card-head">${cover?`<img class="graph-card-cover" src="${esc(cover)}" alt="《${esc(b.title)}》书影">`:'<div class="graph-card-placeholder" aria-label="暂无书影">书</div>'}<div class="graph-card-title"><h2>《${esc(b.title)}》</h2>${b.author?`<p class="graph-card-author">${esc(b.author)}</p>`:''}</div></div>${tasks.length?'<div class="graph-task-groups">'+taskBlocks+'</div>':bookLabels}${intro?`<p class="graph-card-intro">${esc(intro)}</p>`:''}${tasks.length?'':'<p class="graph-task-coming">任务课程制作中，敬请期待</p>'}</article>`;
  }

  function renderPanel(){
    const panel=document.getElementById('network-detail');document.querySelector('.network-layout').classList.toggle('has-detail',!!(bookId||selected||selectedEdge));
    if(!domain){panel.innerHTML='';return;}
    if(selectedEdge){const e=d.edges.find(e=>e.edge_id===selectedEdge);panel.innerHTML=`<p class="network-kicker">知识关系</p><h2>${esc(e.relation)}</h2><div class="network-edge-pair">${nodeButton(e.source_id)}<span>${e.relation==='关联'?'与':'至'}</span>${nodeButton(e.target_id)}</div><p class="network-description">${esc(e.description)}</p>`;}
    else if(bookId){panel.innerHTML=bookCard(bookId);}
    else if(selected){const n=nodes.get(selected),edges=adjacent(selected),links=[...new Map(d.bookLinks.filter(l=>l.node_id===selected).map(l=>[graphBookId(l.book_id),{...l,book_id:graphBookId(l.book_id)}])).values()];panel.innerHTML=`<p class="network-kicker">${esc(domains.get(n.domain_id).name)} · ${n.kind==='method'?'研究或思考方法':'知识概念'}</p><h2>${esc(n.name)}</h2><section class="network-detail-group"><h3>相连知识</h3>${edges.map(e=>`<div class="network-neighbor">${nodeButton(e.source_id===selected?e.target_id:e.source_id)}<button class="network-relation" data-edge="${esc(e.edge_id)}">${esc(e.relation)}</button></div>`).join('')}</section><section class="network-detail-group"><h3>关联经典 <small>待核定</small></h3>${links.length?links.map(l=>{const b=books.find(b=>b.id===l.book_id);return `<button class="network-book" data-book="${esc(b.id)}"><strong>《${esc(b.title)}》</strong><small>${roles[l.role]}关联 · 待核定</small></button>`;}).join(''):'<p class="network-description">该节点暂无直接关联书目。</p>'}</section>`;}
    else{panel.innerHTML='';}
    panel.querySelectorAll('[data-node]').forEach(b=>b.onclick=()=>{selected=b.dataset.node;selectedEdge='';bookId='';draw(true);});
    panel.querySelectorAll('[data-edge]').forEach(b=>b.onclick=()=>{selectedEdge=b.dataset.edge;renderPanel();});
    panel.querySelectorAll('[data-book]').forEach(b=>b.onclick=()=>selectBook(b.dataset.book));
    updateDetailHint();
  }
  function updateDetailHint(){
    const hint=document.getElementById('mobile-detail-hint'),panel=document.getElementById('graph-detail-panel');
    if(!hint||!panel)return;
    hint.hidden=!(bookId&&!selectedEdge&&matchMedia('(max-width:700px)').matches&&panel.getBoundingClientRect().top>innerHeight-220);
  }
  function setupDetailHint(){
    document.getElementById('mobile-detail-hint').onclick=()=>{
      const panel=document.getElementById('graph-detail-panel');
      panel.focus({preventScroll:true});
      panel.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});
    };
    window.addEventListener('scroll',updateDetailHint,{passive:true});
    window.addEventListener('resize',updateDetailHint);
  }
  function closeBookDrawer(){const dialog=document.getElementById('mobile-book-drawer');if(dialog?.open)dialog.close();document.body.classList.remove('book-drawer-open');}
  function selectBook(id){id=graphBookId(id);bookId=bookId===id?'':id;selected='';selectedEdge='';closeBookDrawer();draw(true);}
  function setupBookDrawer(){
    const dialog=document.getElementById('mobile-book-drawer');
    document.getElementById('mobile-book-picker').onclick=()=>{if(!domain)return;dialog.showModal();document.body.classList.add('book-drawer-open');};
    document.getElementById('mobile-drawer-close').onclick=closeBookDrawer;
    dialog.addEventListener('close',()=>document.body.classList.remove('book-drawer-open'));
    dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeBookDrawer();});
  }
  /* Seed a full-window point cloud, relax only real edges, then fit with label gutters.
     No synthetic nodes, roots or source knowledge edges. */
  function layout(ids){
    const list=[...ids],w=Math.max(140,chart.getWidth()-130),h=Math.max(160,chart.getHeight()-80);
    const pts=list.map((id,i)=>{const radius=Math.sqrt((i+.5)/list.length),angle=i*2.399963;return {id,x:w/2+Math.cos(angle)*radius*w*.48,y:h/2+Math.sin(angle)*radius*h*.48};});
    const byId=new Map(pts.map(p=>[p.id,p]));
    const edges=d.edges.filter(e=>ids.has(e.source_id)&&ids.has(e.target_id));
    for(let step=0;step<110;step++){
      const forces=pts.map(()=>[0,0]);
      for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,dist=Math.max(8,Math.hypot(dx,dy)),strength=Math.min(4,1800/(dist*dist));
        forces[i][0]+=dx/dist*strength;forces[i][1]+=dy/dist*strength;forces[j][0]-=dx/dist*strength;forces[j][1]-=dy/dist*strength;
      }
      for(const e of edges){const a=byId.get(e.source_id),b=byId.get(e.target_id),i=list.indexOf(a.id),j=list.indexOf(b.id),dx=b.x-a.x,dy=b.y-a.y,dist=Math.max(1,Math.hypot(dx,dy)),f=(dist-Math.sqrt(w*h/list.length)*1.45)*.006;forces[i][0]+=dx/dist*f;forces[i][1]+=dy/dist*f;forces[j][0]-=dx/dist*f;forces[j][1]-=dy/dist*f;}
      pts.forEach((p,i)=>{p.x+=forces[i][0];p.y+=forces[i][1];if(p.x<0)p.x*=.97;if(p.x>w)p.x=w+(p.x-w)*.97;if(p.y<0)p.y*=.97;if(p.y>h)p.y=h+(p.y-h)*.97;});
    }
    const xs=pts.map(p=>p.x),ys=pts.map(p=>p.y),minX=Math.min(...xs),minY=Math.min(...ys),sx=Math.max(...xs)-minX||1,sy=Math.max(...ys)-minY||1;
    return new Map(pts.map(p=>[p.id,[(p.x-minX)/sx*w,(p.y-minY)/sy*h]]));
  }
  function overlayLayout(){
    const merged=new Map();
    for(const [area,sign] of [['science',-1],['literature',1]])for(const [id,p] of layout(domainNodes(area))){
      const point=[p[0]+sign*chart.getWidth()*.08,p[1]-sign*chart.getHeight()*.05],old=merged.get(id);
      merged.set(id,old?[(old[0]+point[0])/2,(old[1]+point[1])/2]:point);
    }
    const values=[...merged.values()],minX=Math.min(...values.map(p=>p[0])),minY=Math.min(...values.map(p=>p[1])),sx=Math.max(...values.map(p=>p[0]))-minX||1,sy=Math.max(...values.map(p=>p[1]))-minY||1;
    return new Map([...merged].map(([id,p])=>[id,[(p[0]-minX)/sx*(chart.getWidth()-36),(p[1]-minY)/sy*(chart.getHeight()-36)]]));
  }
  function applyEdgeHover(){
    if(!chart||!hoverEdge)return;
    const series=chart.getOption().series[0],edgeIndex=series.links.findIndex(e=>e.edge_id===hoverEdge),edge=series.links[edgeIndex];if(!edge)return;
    chart.dispatchAction({type:'highlight',seriesIndex:0,dataType:'edge',dataIndex:edgeIndex});
    const endpoints=series.data.map((n,i)=>n.id===edge.source||n.id===edge.target?i:-1).filter(i=>i>=0);
    chart.dispatchAction({type:'highlight',seriesIndex:0,dataType:'node',dataIndex:endpoints});
  }
  function setEdgeHover(id){
    if(!chart)return;
    if(hoverEdge){const series=chart.getOption().series[0],index=series.links.findIndex(e=>e.edge_id===hoverEdge),edge=series.links[index];if(edge){chart.dispatchAction({type:'downplay',seriesIndex:0,dataType:'edge',dataIndex:index});chart.dispatchAction({type:'downplay',seriesIndex:0,dataType:'node',dataIndex:series.data.map((n,i)=>n.id===edge.source||n.id===edge.target?i:-1).filter(i=>i>=0)});}}
    hoverEdge=id;applyEdgeHover();
  }
  function keepNodesRound(){
    if(!chart)return;
    const data=chart.getModel().getSeriesByIndex(0)?.getData();
    data?.eachItemGraphicEl(symbol=>{
      const transform=symbol.getComputedTransform(),shape=symbol.childAt(0);
      if(!transform||!shape)return;
      const x=Math.hypot(transform[0],transform[1]),y=Math.hypot(transform[2],transform[3]);
      if(x&&y)shape.attr({scaleY:shape.scaleX*x/y});
    });
  }
  function draw(keep=false){
    clearInterval(pulse);pulse=null;
    if(hoverEdge)setEdgeHover('');
    const ambient=!domain,root=document.querySelector('.network-layout'),stage=document.querySelector('.network-stage');
    if(stage.classList.contains('is-ambient')!==ambient)chart.clear();
    root.classList.toggle('network-ambient',ambient);root.classList.toggle('has-detail',!!(bookId||selected||selectedEdge));stage.classList.toggle('is-ambient',ambient);
    chart.resize();const ids=selection();currentIds=[...ids];
    if(ambient)positions=overlayLayout();
    else if(!keep)positions=layout(ids);
    else if(currentIds.some(id=>!positions.has(id))){const extra=layout(ids);for(const id of currentIds)if(!positions.has(id))positions.set(id,extra.get(id));}
    const active=new Set(selected?[selected,...adjacent(selected).flatMap(e=>[e.source_id,e.target_id])]:[]),bookNodes=bookHighlight(ids);
    const points=currentIds.map((id,i)=>{
      const n=nodes.get(id),area=domains.get(n.domain_id),pos=positions.get(id),focus=selected?active.has(id):bookId?bookNodes.has(id):true;
      return {id,name:n.name,x:pos[0],y:pos[1],symbol:'circle',symbolSize:ambient?ambientNodeSize(i):n.tier===1?18:n.kind==='method'?11:8,itemStyle:{color:ambient?(i%3===0?'#d6bb77':'#83b67c'):focus&&(bookId||selected)?'#b9dd7c':graphColors[n.domain_id],opacity:ambient?.45+(i%6)*.08:focus?.78:.13,borderWidth:0,shadowBlur:ambient?3:focus?4:1,shadowColor:ambient?'#a7d78380':focus&&(bookId||selected)?'#b9dd7c99':graphColors[n.domain_id]+'80'},label:{show:!ambient,position:'right',distance:4,fontSize:n.tier===1?9.1:7.7,color:'#e8efe6',opacity:focus?1:.2,fontFamily:'DengXian, Microsoft YaHei, PingFang SC, sans-serif',fontWeight:n.tier===1?'bold':'normal'},emphasis:{scale:false,label:{show:!ambient},itemStyle:{borderWidth:0,opacity:.95,color:ambient?(i%3===0?'#f5dfa1':'#c8eeab'):'#d8efac',shadowBlur:4}}};
    });
    const edges=d.edges.filter(e=>ids.has(e.source_id)&&ids.has(e.target_id)&&(!ambient||ambientEdgeIds.has(e.edge_id))).map(e=>({...e,source:e.source_id,target:e.target_id,symbol:['none',ambient||e.relation==='关联'?'none':'arrow'],symbolSize:4,lineStyle:{color:ambient?'#a3c69a':graphColors[nodes.get(e.source_id).domain_id],opacity:ambient?.22:selected?((e.source_id===selected||e.target_id===selected)?.75:.06):bookId?(bookNodes.has(e.source_id)&&bookNodes.has(e.target_id)?.7:.07):.3,width:1,curveness:.06}}));
    // Ambient rotation is a visual-only transform on the reused graph view.
    // Reset its pivot before normal graph rendering, otherwise native wheel
    // zoom uses a different origin from the actual pixels on screen.
    if(!ambient){const model=chart.getModel()?.getSeriesByIndex(0),group=model&&chart.getViewOfSeriesModel(model)?.group;if(group){group.attr({rotation:0,originX:0,originY:0});group.updateTransform();}}
    const previous=keep&&!ambient?chart.getOption().series?.[0]:null,viewState=previous?{zoom:previous.zoom,center:previous.center}:{zoom:1,center:null};
    document.getElementById('graph-fit').hidden=ambient;
    const viewport=ambient?{left:36,right:36,top:36,bottom:36}:{left:24,right:106,top:35,bottom:45};
    chart.setOption({animation:!ambient&&!matchMedia('(prefers-reduced-motion: reduce)').matches,animationDurationUpdate:350,tooltip:{show:!ambient,confine:true,textStyle:{fontSize:9.8},formatter:p=>p.dataType==='edge'?esc(p.data.relation)+'<br>'+esc(p.data.description):esc(p.name)},series:[{type:'graph',layout:'none',...viewport,...viewState,nodeScaleRatio:0,roam:!ambient,draggable:!ambient,scaleLimit:{min:.4,max:4},data:points,links:edges,emphasis:{focus:'none',scale:false,lineStyle:{width:1,opacity:1,color:'#edf5c8'}}}]},!keep);
    document.querySelectorAll('[data-domain]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.domain===domain)));

    document.getElementById('knowledge-canvas').setAttribute('aria-label',ambient?'无文字呼吸点阵，选择上方领域进入知识图谱':domains.get(domain).name+'知识图谱，点击书目点亮关联节点');
    keepNodesRound();renderBooks();renderPanel();
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches)startMotion(points,edges,ambient);
  }
  /* Springs stay anchored to the spacious initial layout, so motion never
     collapses into the centre. Explicit graph edges couple neighboring motion. */
  function startMotion(points,edges,ambient){
    const live=points.map(p=>({x:p.x,y:p.y,vx:0,vy:0})),index=new Map(points.map((p,i)=>[p.id,i]));let tick=0;const started=performance.now();
    pulse=setInterval(()=>{
      if(!chart||dragging)return;tick+=ambient?40/180:1;
      if(!ambient){
        const forces=points.map((p,i)=>[(p.x-live[i].x)*.045+Math.sin(tick*.18+i*1.7)*.33,(p.y-live[i].y)*.045+Math.cos(tick*.16+i*1.3)*.33]);
        for(const e of edges){const a=index.get(e.source),b=index.get(e.target),dx=((live[b].x-live[a].x)-(points[b].x-points[a].x))*.008,dy=((live[b].y-live[a].y)-(points[b].y-points[a].y))*.008;forces[a][0]+=dx;forces[a][1]+=dy;forces[b][0]-=dx;forces[b][1]-=dy;}
        live.forEach((p,i)=>{p.vx=(p.vx+forces[i][0])*.82;p.vy=(p.vy+forces[i][1])*.82;p.x=points[i].x+Math.max(-12,Math.min(12,p.x+p.vx-points[i].x));p.y=points[i].y+Math.max(-12,Math.min(12,p.y+p.vy-points[i].y));});
      }
      const animated=points.map((p,i)=>ambient?({...p,x:p.x+Math.sin(tick*.3+i)*1.4,y:p.y+Math.cos(tick*.25+i*1.3)*1.4,symbolSize:ambientNodeSize(i)+Math.sin(tick*.4+i*.9)*1.3,itemStyle:{...p.itemStyle,opacity:.28+(1+Math.sin(tick*.38+i*.63))*.32}}):({...p,x:live[i].x,y:live[i].y}));
      if(ambient)chart.setOption({series:[{data:animated}]});
      else{
        // Update layouts in-place: rebuilding graph data would refit the coordinate
        // bounds and override the user's cursor-centred zoom/pan on every tick.
        const model=chart.getModel().getSeriesByIndex(0),data=model.getData(),graph=model.getGraph();
        animated.forEach((p,i)=>data.setItemLayout(i,[p.x,p.y]));
        graph.eachEdge(edge=>{const a=edge.node1.getLayout(),b=edge.node2.getLayout(),curve=edge.getModel().get(['lineStyle','curveness'])||0;edge.setLayout([a.slice(),b.slice(),curve?[(a[0]+b[0])/2-(b[1]-a[1])*curve,(a[1]+b[1])/2+(b[0]-a[0])*curve]:null]);});
        chart.getViewOfSeriesModel(model).updateLayout(model);
      }
      if(ambient){const model=chart.getModel().getSeriesByIndex(0),group=chart.getViewOfSeriesModel(model).group,rect=model.coordinateSystem.getBoundingRect(),data=model.getData();group.attr({originX:rect.x+rect.width/2,originY:rect.y+rect.height/2,rotation:(performance.now()-started)/360000*Math.PI*2});group.updateTransform();const pts=[];for(let i=0;i<data.count();i++)pts.push(group.transformCoordToGlobal(...data.getItemLayout(i)));const xs=pts.map(p=>p[0]),ys=pts.map(p=>p[1]),origin=group.transformCoordToGlobal(group.originX,group.originY),scale=Math.min((chart.getWidth()/2-36)/Math.max(...xs.map(x=>Math.abs(x-origin[0]))),(chart.getHeight()/2-36)/Math.max(...ys.map(y=>Math.abs(y-origin[1]))));group.attr({scaleX:group.scaleX*scale,scaleY:group.scaleY*scale});group.updateTransform();const centre=group.transformCoordToGlobal(group.originX,group.originY);group.attr({x:group.x+chart.getWidth()/2-centre[0],y:group.y+chart.getHeight()/2-centre[1]});group.updateTransform();}
      keepNodesRound();applyEdgeHover();
    },ambient?40:180);
    // Dragged nodes establish a new local anchor, rather than snapping back.
    chart.off('mousedown');chart.off('mouseup');
    chart.on('mousedown',p=>{dragging=true;draggedNode=p.dataType==='node'?p.data.id:'';});
    chart.on('mouseup',()=>{if(draggedNode){const i=index.get(draggedNode),data=chart.getModel().getSeriesByIndex(0).getData(),pos=i===undefined?null:data.getItemLayout(i);if(pos){points[i].x=pos[0];points[i].y=pos[1];positions.set(draggedNode,[...pos]);live[i]={x:pos[0],y:pos[1],vx:0,vy:0};}}dragging=false;draggedNode='';});
  }
  function zoomAtPointer(event){
    if(!chart||!domain)return;
    event.preventDefault();event.stopImmediatePropagation();
    const rect=event.currentTarget.getBoundingClientRect(),model=chart.getModel().getSeriesByIndex(0),zoom=model.coordinateSystem.getZoom();
    const delta=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?rect.height:1);
    const next=Math.max(.4,Math.min(4,zoom*Math.exp(-delta*.0015)));
    if(next===zoom)return;
    // Same graphRoam action as legacy ECharts roam:true; use browser client
    // coordinates explicitly, including CSS-scaled embedded browser surfaces.
    chart.getViewOfSeriesModel(model)._controller.trigger('zoom',{scale:next/zoom,
      originX:(event.clientX-rect.left)*chart.getWidth()/rect.width,
      originY:(event.clientY-rect.top)*chart.getHeight()/rect.height});
    keepNodesRound();
  }
  function releasePointer(){dragging=false;draggedNode="";}
  function mount(){document.body.classList.add('graph-dark');setupBookDrawer();setupDetailHint();document.getElementById('graph-fit').onclick=()=>draw();sampleAmbientEdges();window.addEventListener("mouseup",releasePointer);window.addEventListener("touchend",releasePointer);dragging=false;domain='';selected='';selectedEdge='';bookId='';positions=new Map();chart=echarts.init(document.getElementById('knowledge-canvas'));document.getElementById('knowledge-canvas').addEventListener('wheel',zoomAtPointer,{capture:true,passive:false});let width=chart.getWidth(),height=chart.getHeight();resize=new ResizeObserver(()=>{if(!chart)return;const el=document.getElementById('knowledge-canvas');if(width===el.clientWidth&&height===el.clientHeight)return;width=el.clientWidth;height=el.clientHeight;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{if(chart)draw(true);});});resize.observe(document.getElementById('knowledge-canvas'));document.querySelectorAll('[data-domain]').forEach(b=>b.onclick=()=>{domain=domain===b.dataset.domain?'':b.dataset.domain;selected='';selectedEdge='';bookId='';draw();});chart.on('mouseover',p=>{if(p.dataType==='edge'&&p.data.edge_id)setEdgeHover(p.data.edge_id);});chart.on('mouseout',p=>{if(p.dataType==='edge'&&p.data.edge_id===hoverEdge)setEdgeHover('');});chart.getZr().on('globalout',()=>setEdgeHover(''));chart.on('click',p=>{if(!domain)return;if(p.dataType==='node'&&nodes.has(p.data.id)){selected=p.data.id;selectedEdge='';bookId='';draw(true);}else if(p.dataType==='edge'&&p.data.edge_id){selectedEdge=p.data.edge_id;renderPanel();}});draw();}
  function dispose(){window.removeEventListener('scroll',updateDetailHint);window.removeEventListener('resize',updateDetailHint);document.getElementById('knowledge-canvas')?.removeEventListener('wheel',zoomAtPointer,true);closeBookDrawer();hoverEdge='';document.body.classList.remove('graph-dark');window.removeEventListener("mouseup",releasePointer);window.removeEventListener("touchend",releasePointer);dragging=false;clearInterval(pulse);cancelAnimationFrame(frame);resize?.disconnect();chart?.dispose();chart=null;}
  return {html,mount,dispose};
})();
