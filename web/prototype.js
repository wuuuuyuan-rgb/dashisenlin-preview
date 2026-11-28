/* Public book catalog and direct task details. */
(() => {
  'use strict';
  const data = window.FOREST;
  const main = document.getElementById('main');
  const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const courses = (data.featuredIds || Object.keys(data.courses)).map(id=>({id,...data.courses[id]}));
  const gradeNames = ['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','十年级','十一年级','十二年级'];
  const availableGradeNames = gradeNames.slice(1);
  const defaults = {grade:'全部',subject:'全部',scroll:0};
  let library = {...defaults};
  try { const saved=JSON.parse(sessionStorage.getItem('forest-catalog-v2')||'{}'); library={grade:saved.grade||'全部',subject:saved.subject||'全部',scroll:Number(saved.scroll)||0}; } catch { /* Storage is optional. */ }
  const bookCourses = id => data.coursesForBook(id);
  const bookById = id => data.catalogBooks.find(b=>b.id===id);
  const detailById = id => {
    const catalog = bookById(id), detail = data.books.find(b=>b.id===id);
    return {...catalog,...detail,intro:catalog?.intro||detail?.intro||''};
  };
  const normalizeSubject = data.normalizeSubject;
  const subjectsFor = book => [...new Set([...(book.subjects||[]),...bookCourses(book.id).flatMap(c=>c.subjects||[])].map(normalizeSubject))];
  const preferredSubjects = ['语文','数学','英语','科学','物理','化学','生物学','历史','地理','道德与法治','思想政治','美术','音乐','信息科技','劳动','戏剧','心理健康','生涯教育'];
  const allSubjects = [...new Set(data.catalogBooks.flatMap(subjectsFor))].sort((a,b)=>{const x=preferredSubjects.indexOf(a),y=preferredSubjects.indexOf(b);return (x<0?999:x)-(y<0?999:y)||a.localeCompare(b,'zh');});
  if(library.grade!=='全部'&&!availableGradeNames.includes(library.grade))library.grade='全部';
  library.subject=normalizeSubject(library.subject);
  function availableSubjects() {
    const grade=gradeNames.indexOf(library.grade)+1;
    const hidden=grade>=1&&grade<=6?['物理','化学','生物学','思想政治','历史','地理']:grade>=7&&grade<=9?['科学','思想政治']:grade>=10?['科学','道德与法治']:[];
    return allSubjects.filter(subject=>!hidden.includes(subject));
  }
  const visibleSubjectsFor=book=>subjectsFor(book).filter(subject=>availableSubjects().includes(subject));
  function normalizeSelection() {
    library.subject=normalizeSubject(library.subject);
    if(library.subject!=='全部'&&!availableSubjects().includes(library.subject))library.subject='全部';
  }
  normalizeSelection();
  let route='';
  let bookReturn={route:'#/explore',scroll:0},returningToSource=false;
  try { const saved=JSON.parse(sessionStorage.getItem('forest-book-return')||'null');if(saved&&/^#\/(?:graph(?:\/[a-z0-9-]+(?:\/[a-z0-9-]+)?)?|explore|cases|connections)?$/.test(saved.route))bookReturn=saved; } catch { /* Direct visits fall back to the catalog. */ }

  let releaseReadingNavigation = () => {};
  const save=()=>{try{sessionStorage.setItem('forest-catalog-v2',JSON.stringify(library));}catch{/* Browsing remains available. */}};
  const tags=(values,outline=false)=>`<div class="tags">${values.map(x=>`<span class="tag${outline?' tag-outline':''}">${esc(x)}</span>`).join('')}</div>`;
  const bookCover=id=>data.bookCovers?.[id]||'';
  function motif(type,extra='') {
    const paths = {
      insect:'<ellipse cx="50" cy="59" rx="19" ry="27"/><path d="M50 34v51M36 44Q20 38 17 30M33 57 12 56M35 70 18 83M64 44Q80 38 83 30M67 57 88 56M65 70 82 83M42 32 34 16M58 32 66 16"/><ellipse cx="50" cy="29" rx="11" ry="10"/><path d="M38 45q12 8 24 0"/>',
      leaf:'<path d="M20 87Q39 54 78 13Q93 52 59 69Q37 80 36 58M20 87 77 14M41 63l-4-18M55 46l-3-17M56 45l21 1M40 63l20-1"/>',
      geometry:'<path d="m50 8 39 30-14 48H25L11 38Zm0 0v78M11 38h78M25 86l25-48 25 48M50 8 25 86M50 8l25 78"/><circle cx="50" cy="50" r="45"/>',
      ring:'<circle cx="50" cy="50" r="39"/><circle cx="50" cy="50" r="29"/><circle cx="50" cy="50" r="18"/><circle cx="50" cy="50" r="7"/><path d="m50 5 1 10M89 25l-9 6M89 75l-9-5M50 85v10M12 75l9-5M12 25l9 5"/>',
      star:'<path d="m50 15 10 24 25 3-19 17 5 26-21-13-21 13 5-26-19-17 25-3ZM14 17v12M8 23h12M83 74v14M76 81h14"/>',
      orbit:'<ellipse cx="50" cy="50" rx="44" ry="18"/><ellipse cx="50" cy="50" rx="44" ry="18" transform="rotate(60 50 50)"/><ellipse cx="50" cy="50" rx="44" ry="18" transform="rotate(120 50 50)"/><circle cx="50" cy="50" r="5"/>',
      wave:'<path d="M8 39q11-15 22 0t22 0t22 0t18 0M8 57q11-15 22 0t22 0t22 0t18 0M8 75q11-15 22 0t22 0t22 0t18 0M40 25l10-15 10 15"/>',
      pen:'<path d="m24 76 6-23 44-43 15 15-44 43-21 8Zm6-23 15 15M66 18l15 15M19 89h65"/>',
      page:'<path d="M24 11h39l17 17v62H24ZM63 11v18h17M35 44h34M35 56h34M35 68h23"/>'
    };
    return `<svg class="motif ${extra}" viewBox="0 0 100 100" aria-hidden="true">${paths[type] || paths.leaf}</svg>`;
  }
  function art(book) { return `<div class="book-art ${esc(book.tone)}" aria-hidden="true"><strong>${esc(book.title)}</strong>${motif(book.motif)}</div>`; }

  function courseArt(c,book) {
    const image=c.cover||bookCover(book.id);
    return image?`<img src="${esc(image)}" alt="《${esc(book.title)}》${c.coverKind==='task'?'任务封面':'书影'}" loading="lazy">`:art(book);
  }
  const featuredSummaries={
    'shijing-life-scroll':'从诗句中寻找古人的日常，合作绘制一幅三千年前的生活长卷。',
    'insects-secondary':'借鉴法布尔的观察与实验方法，开展自己的昆虫研究。',
    'quantum-growth':'追踪量子革命中的发现与争论，思考自己如何面对未知、寻找方向。'
  };
  function caseCard(c) {
    const book=detailById(c.bookId);
    const title=c.id==='insects-secondary'?'昆虫记':book.title;
    return `<article class="case-card featured-case"><a class="case-image" href="#/book/${esc(book.id)}" aria-label="了解《${esc(title)}》的课程">${courseArt(c,book)}</a><div class="case-copy"><div class="case-meta"><span>《${esc(title)}》</span><span>${esc(c.grade)}</span></div><h3><a href="#/book/${esc(book.id)}">${esc(c.title)}</a></h3><p class="case-intro">${esc(featuredSummaries[c.id]||c.lead)}</p>${tags(c.subjects)}<a class="text-link" href="#/book/${esc(book.id)}">了解这门课程</a></div></article>`;
  }
  // A small, accessible window into existing graph data, not a second graph model.
  const homeKnowledgeNodes = [
    {id:'science-025',desktop:[38,52],mobile:[30,50]},
    {id:'science-044',desktop:[15,19],mobile:[17,16]},
    {id:'science-006',desktop:[60,11],mobile:[55,13]},
    {id:'science-034',desktop:[88,20],mobile:[82,22]},
    {id:'science-027',desktop:[71,64],mobile:[57,52]},
    {id:'science-026',desktop:[87,87],mobile:[80,89]},
    {id:'science-030',desktop:[36,85],mobile:[34,88]},
    {id:'polhis-001',desktop:[12,64],mobile:[13,61]}
  ];
  const homeKnowledgeIds = new Set(homeKnowledgeNodes.map(node=>node.id));
  const homeKnowledgeEdges = window.FOREST_GRAPH.edges.filter(edge=>homeKnowledgeIds.has(edge.source_id)&&homeKnowledgeIds.has(edge.target_id));
  const homeKnowledgeById = new Map(window.FOREST_GRAPH.nodes.map(node=>[node.node_id,node]));
  const homeKnowledgeDescription = id => id==='science-027' ? '从水碓与风箱，认识古代造物智慧。' : homeKnowledgeEdges.find(edge=>edge.source_id===id||edge.target_id===id)?.description||'';
  const homeKnowledgeSelected='science-027';
  let releaseHomeKnowledge=()=>{};
  let releaseHomeBrand=()=>{};
  const homeKnowledgeRoute = id => '#/graph/tiangongkaiwu/'+id;
  function homeKnowledgeHTML() {
    const selected=homeKnowledgeById.get(homeKnowledgeSelected);
    return `<section id="home-knowledge" class="home-knowledge" aria-labelledby="home-knowledge-title"><div class="container home-knowledge-layout"><div class="home-knowledge-copy"><span class="home-knowledge-book">正在探索：《天工开物》</span><h2 id="home-knowledge-title">一本书，会连接<br><em>怎样的世界？</em></h2><p>从《天工开物》出发，发现科学、技术与生活之间的联系。</p></div><div class="home-knowledge-stage" role="img" aria-label="天工开物知识关联动态预览"><div class="home-knowledge-plot"><svg class="home-knowledge-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${homeKnowledgeEdges.map(edge=>`<line data-preview-edge="${esc(edge.edge_id)}" data-source="${esc(edge.source_id)}" data-target="${esc(edge.target_id)}"/>`).join('')}</svg>${homeKnowledgeNodes.map(node=>`<span class="home-knowledge-node${node.id==='science-025'?' is-hub':''}${node.id==='polhis-001'?' is-social':''}${node.id===homeKnowledgeSelected?' is-featured':''}" data-preview-node="${node.id}"><span class="home-knowledge-dot" aria-hidden="true"></span><span class="home-knowledge-label">${esc(homeKnowledgeById.get(node.id).name)}</span></span>`).join('')}<div id="home-knowledge-tooltip" class="home-knowledge-tooltip"><strong>${esc(selected.name)}</strong><p>${esc(homeKnowledgeDescription(selected.node_id))}</p><svg class="home-knowledge-tail" aria-hidden="true"><path/></svg></div></div></div><div class="home-knowledge-entry"><a class="home-knowledge-cta" href="${homeKnowledgeRoute(homeKnowledgeSelected)}">进入知识图谱<span class="home-knowledge-arrow" aria-hidden="true">→</span><span class="sr-only">，继续探索《天工开物》与${esc(selected.name)}</span></a></div></div></section>`;
  }
  function mountHomeKnowledge() {
    const root=document.getElementById('home-knowledge'),stage=root.querySelector('.home-knowledge-plot'),tip=root.querySelector('.home-knowledge-tooltip');
    const nodeElements=[...root.querySelectorAll('[data-preview-node]')],lines=[...root.querySelectorAll('[data-preview-edge]')];
    const reduce=matchMedia('(prefers-reduced-motion: reduce)'),compact=matchMedia('(max-width:700px)');
    let frame=0,visible=false,phase=0,lastTime=0,disposed=false;
    function position() {
      const smallPlot=compact.matches||stage.clientWidth<620;
      const positions=new Map(homeKnowledgeNodes.map((node,i)=>{
        const [x,y]=smallPlot?node.mobile:node.desktop;
        return [node.id,[x+(reduce.matches?0:Math.sin(phase*.35+i)*1.1),y+(reduce.matches?0:Math.cos(phase*.3+i)*1.3)]];
      }));
      for(const node of nodeElements){const [x,y]=positions.get(node.dataset.previewNode);node.style.left=x+'%';node.style.top=y+'%';}
      for(const line of lines){const [x1,y1]=positions.get(line.dataset.source),[x2,y2]=positions.get(line.dataset.target);for(const [key,value] of Object.entries({x1,y1,x2,y2}))line.setAttribute(key,value);}
      const [x,y]=positions.get(homeKnowledgeSelected),px=x*stage.clientWidth/100,py=y*stage.clientHeight/100;
      const dot=stage.querySelector('.is-featured .home-knowledge-dot'),tail=tip.querySelector('.home-knowledge-tail');
      if(compact.matches){
        // Keep the bubble beside the dot and the short pointer on its horizontal axis.
        const radius=dot.offsetWidth/2;
        const left=Math.min(stage.clientWidth-tip.offsetWidth-6,px+radius+18);
        tip.style.left=left+'px';tip.style.top=(py-tip.offsetHeight/2)+'px';
        const length=Math.max(1,left-px-radius-3);
        Object.assign(tail.style,{left:-length+'px',top:(tip.offsetHeight/2-4)+'px',width:(length+1)+'px',height:'8px'});
        tail.setAttribute('viewBox','0 0 '+(length+1)+' 8');
        tail.querySelector('path').setAttribute('d','M '+(length+1)+' 0 L '+(length+1)+' 8 L 0 4 Z');
      }else{
        const pad=window.innerWidth<=1180||matchMedia('(pointer:coarse)').matches,attached=smallPlot||pad;
        const gap=attached?32:50,offset=attached?-30:32;
        const left=Math.max(6,Math.min(stage.clientWidth-tip.offsetWidth-10,px+offset));
        const top=Math.max(0,py-tip.offsetHeight-gap);
        tip.style.left=left+'px';tip.style.top=top+'px';
        let length,endX,base;
        if(attached){
          const center=tip.offsetWidth/2,dx=px-left-center,dy=py-top-tip.offsetHeight;
          const distance=Math.hypot(dx,dy),stop=Math.max(0,1-(dot.offsetWidth/2+3)/distance);
          length=dy*stop;endX=center+dx*stop;base=[center-8,center+8];
        }else{length=gap-dot.offsetWidth/2-4;endX=px-left;base=[10,24];}
        Object.assign(tail.style,{left:'0px',top:'calc(100% - 1px)',width:'100%',height:length+'px'});
        tail.setAttribute('viewBox','0 0 '+tip.offsetWidth+' '+length);
        tail.querySelector('path').setAttribute('d','M '+base[0]+' 0 L '+base[1]+' 0 L '+endX+' '+length+' Z');
      }
    }
    function tick(time) {
      phase+=lastTime?Math.min(time-lastTime,50)/1000:0;lastTime=time;position();frame=requestAnimationFrame(tick);
    }
    function sync() {
      cancelAnimationFrame(frame);frame=0;lastTime=0;
      const running=visible&&!reduce.matches&&!document.hidden;
      root.classList.toggle('is-motion-paused',!running);
      position();if(running&&!disposed)frame=requestAnimationFrame(tick);
    }
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.1});observer.observe(stage);
    const resize=new ResizeObserver(position);resize.observe(stage);
    document.addEventListener('visibilitychange',sync);reduce.addEventListener('change',sync);compact.addEventListener('change',position);position();sync();
    return ()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();document.removeEventListener('visibilitychange',sync);reduce.removeEventListener('change',sync);compact.removeEventListener('change',position);};
  }
  function mountHomeBrand() {
    const card=document.querySelector('.home-brand-card'),phone=matchMedia('(max-width:880px)');
    const statement=document.querySelector('.closing-statement'),heading=statement.parentElement;
    function fit(){
      card.style.setProperty('--bookwall-scale',String(phone.matches?Math.min(1,card.clientWidth/360):1));
      const width=parseFloat(getComputedStyle(statement).width)||statement.scrollWidth;
      statement.style.setProperty('--closing-scale',String(Math.min(1,heading.clientWidth/width)));
    }
    const resize=new ResizeObserver(fit);resize.observe(card);resize.observe(heading);resize.observe(statement);phone.addEventListener('change',fit);fit();
    return ()=>{resize.disconnect();phone.removeEventListener('change',fit);};
  }
  function home() {
    const wall=data.homeBrandBooks;
    const features=[['经典驱动','从经典作品中发掘有价值的问题、思想与方法，以富有挑战性的任务激发学生的阅读与探究。'],['课程融通','以国家课程标准为依据，将经典阅读融入日常学科教学，实现学科知识的深度理解与综合运用。'],['深度研读','带着问题走进经典，辨析观点、追溯思考过程，从理解作品内容走向领悟大师的思想内核与精神气象。'],['学以致用','运用经典中的思想、方法与所学知识，开展自主探究、解决现实问题，形成有依据、有创意的学习成果。']];
    return `<div class="classic-home"><section class="hero brand-original"><h1 class="sr-only">大师森林课程</h1><picture class="brand-original-picture"><img src="${esc(data.brandVisuals.desktop)}" alt="大师森林艺术字与森林主视觉" fetchpriority="high" width="4725" height="2658"></picture></section>
    <section class="home-introduction container"><h3 class="intro-subtitle">用经典贯通学科学习</h3><h2 class="grow-title">和<span class="grow-master"><img src="assets/brand-original/dashi.png" alt="大师"></span>一起成长</h2><div class="intro-lines">${['大师森林课程以国家课程标准为依据','从经典作品中发掘有价值的问题、思想和方法','将其设计成孩子感兴趣、有挑战的真实任务','让孩子带着问题阅读经典','在任务中学习和运用不同学科的知识','体悟大师们的精神气象','完成自我表达与创造'].map(line=>`<p>${line}</p>`).join('')}</div></section>
    ${homeKnowledgeHTML()}
    <section class="home-brand-section container"><div class="home-brand-card"><div class="home-brand-artwork"><div class="home-book-wall">${wall.map(book=>`<span class="home-wall-book"><img src="${esc(book.cover)}" alt="《${esc(book.title)}》书影" loading="lazy"></span>`).join('')}</div><div class="home-brand-words"><div class="home-brand-first">在文明长河中遇见<img src="assets/brand-original/dashi.png" alt="大师"></div><span>成为未来创造者</span></div></div></div></section>
    <section class="home-features container"><h2 class="home-section-title">大师森林课程的核心特征</h2><div class="feature-rows">${features.map(([name,text],i)=>`<article class="feature-row"><span class="feature-number">${i+1}</span><p><strong>${name}：</strong>${text}</p></article>`).join('')}</div></section>
    <section id="featured-courses" class="home-examples container"><div class="home-course-entry"><a class="btn btn-primary home-cta" href="#/explore"><span>按年级与学科选课</span><span aria-hidden="true">&gt;</span></a></div><h2 class="home-section-title">大师森林课程示例</h2><div class="home-example-list">${['shijing-life-scroll','insects-secondary','quantum-growth'].map(id=>caseCard(courses.find(c=>c.id===id))).join('')}</div></section><section class="home-closing container" aria-label="大师森林课程理念"><h3 class="intro-subtitle"><span class="closing-statement">每位大师都是从0到1的创造者</span></h3><a class="home-closing-brand" href="#/" aria-label="大师森林课程"><img src="assets/brand-original/forest-masters-logo.png" alt="大师森林" loading="lazy"><span>课程</span></a><div class="intro-lines"><p>让经典阅读发生在学科课堂</p><p>让书本里的文明长在孩子身上</p></div></section></div>`;
  }
  function filterOptions(key,options) {
    return options.map(value=>`<option value="${esc(value)}"${library[key]===value?' selected':''}>${esc(value)}</option>`).join('');
  }
  function filterRow(label,key,options) {
    return `<div class="catalog-filter-row"><label class="catalog-filter-label" for="catalog-filter-${key}">${label}</label><div class="catalog-filter-control"><select id="catalog-filter-${key}" data-catalog-filter="${key}">${filterOptions(key,options)}</select></div></div>`;
  }
  const durationLabels = related => [...new Set(related.filter(c=>Number.isFinite(c.totalHours)&&c.totalHours>0).map(c=>`${c.totalHours}课时`))];
  function durationPresentation(value) {
    const duration=String(value||'').trim(),hasExplanation=/[（(]/.test(duration);
    if(!hasExplanation)return {label:duration,note:''};
    const countable=duration.replace(/[（(][^（）()]*(?:[）)]|$)/g,'');
    const entries=[...countable.matchAll(/(\d+(?:\.\d+)?)\s*(课时|学时)/g)];
    if(!entries.length||new Set(entries.map(entry=>entry[2])).size!==1)return {label:duration,note:''};
    const total=entries.reduce((sum,entry)=>sum+Number(entry[1]),0),first=entries[0],end=first.index+first[0].length;
    const prefix=duration.slice(0,first.index),suffix=duration.slice(end);
    const note=`${prefix}${suffix}`.replace(/^[＋+]\s*/,'').trim();
    return {label:`${Number(total.toFixed(2))}${entries[0][2]}`,note};
  }
  const stepTitle = (c,j,i) => `子任务${['一','二','三','四','五','六','七','八','九','十'][i]||i+1}：${j.title.replace(/^子任务[一二三四五六七八九十\d]+[：:]\s*/, '')}`;
  const curriculumLines = text => text.split(/\n+/).filter(line=>line.trim()).map(line=>`<span class="curriculum-line">- ${esc(line.replace(/^\s*-\s*/,''))}</span>`).join('');
  function bookCard(book) {
    const image=bookCover(book.id),related=bookCourses(book.id);
    const metadata=[...(book.gradeLabels||[]).map(g=>({label:gradeNames[g-1],kind:'grade'})),...visibleSubjectsFor(book).map(label=>({label,kind:'subject'})),...durationLabels(related).map(label=>({label,kind:'duration'}))];
    return `<a class="book-card catalog-book-card catalog-book-link${related.length?' has-uploaded-task':''}" href="#/book/${esc(book.id)}" aria-label="查看《${esc(book.title)}》${related.length?related.map(c=>esc(c.title)).join('、'):'书籍'}详情"><div class="catalog-book-media${image?' has-cover':''}">${image?`<img src="${esc(image)}" alt="《${esc(book.title)}》书影" loading="lazy" decoding="async">`:'<span class="book-placeholder" aria-hidden="true">书</span>'}</div><div class="catalog-book-content"><div class="catalog-book-heading"><h3>《${esc(book.title)}》</h3>${book.author?`<p class="author">${esc(book.author)}</p>`:''}</div><p class="catalog-book-metadata">${metadata.map(({label,kind})=>`<span class="catalog-meta-tag catalog-meta-${kind}">${esc(label)}</span>`).join('')}</p><div class="catalog-task-labels">${related.length?related.map(c=>`<span class="catalog-task-label catalog-task-ready"><span class="catalog-task-title">任务：${esc(c.title)}</span><svg class="catalog-task-star" viewBox="0 0 32 32" aria-hidden="true"><path d="m16 2.8 4.5 8.3 9.1 1.4-6.6 6.4 1.5 9.2-8.5-4.4-8.5 4.4 1.6-9.2-6.7-6.4 9.1-1.4z" fill="currentColor" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg></span>`).join(''):'<span class="catalog-task-pending">正在开发，敬请期待</span>'}</div>${book.coverNote?`<p class="catalog-edition-note">${esc(book.coverNote)}</p>`:''}</div></a>`;
  }
  function explore() {
    return `<section class="catalog-masthead"><img src="assets/prototype/forest.webp" alt="" aria-hidden="true"><div class="container"><div class="page-intro"><h1>经典书单</h1><p>一本书就是一种学习方式</p></div></div></section><div class="container book-catalog-body"><section class="catalog-filters" aria-label="筛选经典">${filterRow('年级','grade',['全部',...availableGradeNames])}${filterRow('学科','subject',['全部',...availableSubjects()])}<div class="catalog-filter-actions"><button class="text-link" data-catalog-reset>清除筛选</button><p id="catalog-filter-state" role="status" aria-live="polite"></p></div></section><section class="section catalog-results-section" aria-label="经典书单"><div id="book-results" class="book-grid"></div></section></div>`;
  }
  function filteredBooks() {
    const grade=gradeNames.indexOf(library.grade)+1;
    return data.catalogBooks.filter(book=>(library.grade==='全部'||(book.gradeLabels||[]).includes(grade))&&(library.subject==='全部'||subjectsFor(book).includes(library.subject)));
  }
  function updateLibrary() {
    normalizeSelection();
    document.getElementById('catalog-filter-subject').innerHTML=filterOptions('subject',['全部',...availableSubjects()]);
    const books=filteredBooks().sort((a,b)=>{const aHas=bookCourses(a.id).length>0,bHas=bookCourses(b.id).length>0;return Number(bHas)-Number(aHas);});
    document.getElementById('book-results').innerHTML=books.length?books.map(bookCard).join(''):'<div class="empty-state"><h2>暂无符合条件的经典</h2><p>可以调整年级或学科，继续探索。</p><button class="btn" data-catalog-reset>清除筛选</button></div>';
    document.getElementById('catalog-filter-state').textContent=[library.grade,library.subject].filter(value=>value!=='全部').join(' · ');
    document.querySelectorAll('select[data-catalog-filter]').forEach(select=>select.value=library[select.dataset.catalogFilter]);
    save();
  }
  function workIntroduction(book) {
    // Omit edition-specific sentences from this view; preserve catalog source text.
    const editionSentence=/(?:本版|此版|这一版本|这个版本|出版社.*(?:版|校注|注释)|译注本|这个选本|本节选本|本讲评本|三联增订版|中文版由|本书由.*(?:注解|翻译)|\d{4}年版|果麦版|这个中华书局|改编的版本|采用.*译本|三全本|全本全注全译|中译本印行|杨伯峻先生的|本书向以注释|全书配有1700)/;
    return (book.intro||'').split(/(?<=[。！？])/).filter(sentence=>!editionSentence.test(sentence)).join('');
  }
  function classicSection(book) {
    if(!book.intro&&!book.reading&&!book.authorIntro)return '';
    return `<section id="book-classic" class="section classic-context"><div class="container"><div class="classic-context-grid"><div class="classic-reading"><h3>书籍简介</h3>${book.intro?`<p>${esc(workIntroduction(book))}</p>`:''}${book.spirit?`<p class="classic-spirit">${esc(book.spirit)}</p>`:''}${book.reading?`<p>${esc(book.reading)}</p>`:''}</div>${book.authorIntro?`<div class="classic-task-bridge"><h3>作者简介</h3><p>${esc(book.authorIntro)}</p></div>`:''}</div></div></section>`;
  }
  function taskSection(c) {
    const questions = c.questions?.length ? c.questions : (c.question ? [c.question] : []);
    return `<article id="task-${esc(c.id)}" class="book-task-detail"><section class="section task-intro"><div class="container"><header class="task-opening"><div class="task-title-block"><span class="task-kicker">学习任务</span><h2 class="task-name">${esc(c.title)}</h2></div>${c.cover?`<figure class="task-heading-cover"><img src="${esc(c.cover)}" alt="${esc(c.title)}任务封面" loading="eager" decoding="async"></figure>`:''}${c.overview?`<div class="task-overview-copy">${c.overview.split(/\n\s*\n/).map(text=>`<p class="task-overview">${esc(text)}</p>`).join('')}</div>`:''}</header>${questions.length?`<section class="core-questions" aria-label="核心探索问题"><h3>核心探索问题</h3><ol>${questions.map(q=>`<li>${esc(q)}</li>`).join('')}</ol></section>`:''}${c.taskMap?`<figure class="task-map"><a href="${esc(c.taskMap)}" target="_blank" rel="noopener" aria-label="查看${esc(c.title)}任务地图原图"><img src="${esc(c.taskMap)}" alt="${esc(c.grade)} · ${esc(c.title)}任务地图" loading="lazy" decoding="async" width="${c.id==='math-beauty'?1024:1086}" height="${c.id==='math-beauty'?1536:1448}"></a></figure>`:''}${c.learningNote&&c.id!=='shijing-life-scroll'?`<p class="task-learning-note">${esc(c.learningNote)}</p>`:''}${c.journey?.length?`<ol class="journey-list">${c.journey.map((j,i)=>{const duration=durationPresentation(j.duration);return `<li id="journey-${esc(c.id)}-${i+1}" class="journey-step" tabindex="-1"><div class="journey-content"><header class="journey-heading"><h3 class="journey-title">${esc(stepTitle(c,j,i))}</h3>${duration.label?`<p class="journey-duration"><strong>${esc(duration.label)}</strong>${duration.note?`<span class="duration-note">${esc(duration.note)}</span>`:''}</p>`:''}</header>${j.choiceNote?`<p class="journey-choice">${esc(j.choiceNote)}</p>`:''}<p class="journey-task">${esc(j.task)}</p>${j.reading||j.curriculum||j.growth?`<dl class="journey-context">${j.reading?`<div><dt>经典阅读</dt><dd>${esc(j.reading)}</dd></div>`:''}${j.curriculum?`<div><dt>学科关联</dt><dd>${curriculumLines(j.curriculum)}</dd></div>`:''}${j.growth?`<div><dt>素养关注</dt><dd>${esc(j.growth)}</dd></div>`:''}</dl>`:''}</div></li>`;}).join('')}</ol>`:''}</div></section></article>`;
  }
  function readingNavigation(book) {
    return `<nav class="reading-nav" aria-label="任务介绍导航"><div class="container"><span class="reading-book-title">任务介绍 · 《${esc(book.title)}》</span><a class="detail-back" href="${esc(bookReturn.route)}" data-book-return>返回</a></div></nav>`;
  }
  function setupReadingNavigation() {
    const nav=document.querySelector('.reading-nav'),header=document.querySelector('.site-header');
    const resize=new ResizeObserver(()=>{
      document.documentElement.style.setProperty('--site-header-height',header.getBoundingClientRect().height+'px');
      document.documentElement.style.setProperty('--reading-nav-height',(nav?nav.getBoundingClientRect().height:0)+'px');
    });
    resize.observe(header);if(nav)resize.observe(nav);
    return ()=>resize.disconnect();
  }
  function bookPage(entry) {
    const book=detailById(entry.id),related=bookCourses(entry.id),image=bookCover(entry.id);
    return `${readingNavigation(book)}<section id="book-overview" class="case-masthead" tabindex="-1"><img class="case-masthead-art" src="assets/prototype/forest.webp" alt="" aria-hidden="true"><div class="container"><section class="detail-hero case-detail-hero"><div class="course-cover">${image?`<img src="${esc(image)}" alt="《${esc(entry.title)}》书影">`:art({...entry,tone:book.tone||'sage',motif:book.motif||'page'})}</div><div class="detail-copy"><h1>《${esc(entry.title)}》</h1>${entry.author?`<p class="lead">${esc(entry.author)}</p>`:''}${related.length?`<div class="book-task-names">${related.map(c=>`<p>任务：${esc(c.title)}</p>`).join('')}</div>`:''}${tags([...(entry.gradeLabels||[]).map(g=>gradeNames[g-1]),...subjectsFor(entry),...durationLabels(related)],true)}</div></section></div></section><div class="book-detail-body">${classicSection(book)}${related.map(taskSection).join('')}</div><div class="container course-bottom"><a class="text-link" href="${esc(bookReturn.route)}" data-book-return>返回</a></div>`;
  }

  function render() {
    const previous=route;route=location.hash||'#/';const parts=route.replace(/^#\/?/,'').split('/');let page=parts[0]||'home';
    if(['cases','connections'].includes(page))page='explore';
    if(page==='course'&&data.courses[parts[1]]){parts[1]=data.courses[parts[1]].bookId;page='book';}
    if(page==='book'&&previous&&!/^#\/(?:book|course)\//.test(previous)){
      bookReturn={route:previous,scroll:window.scrollY};
      if(/^#\/(?:explore|cases|connections)$/.test(previous)){library.scroll=window.scrollY;save();}
      try{sessionStorage.setItem('forest-book-return',JSON.stringify(bookReturn));}catch{/* Return still works without storage. */}
    }
    const restoreScroll=returningToSource?bookReturn.scroll:null;returningToSource=false;
    document.body.classList.toggle('book-view',page==='book');
    let html,label;
    if(page==='home'){html=home();label='课程理念';}
    else if(page==='graph'){html=window.ForestGraph.html();label='知识图谱';}
    else if(page==='explore'){html=explore();label='经典书单';}
    else if(page==='book'&&bookById(parts[1])){const b=bookById(parts[1]);html=bookPage(b);label=b.title;}
    else{html='<div class="not-found"><h1>这条小径还未展开</h1><a class="btn" href="#/explore">返回经典书单</a></div>';label='页面未找到';}
    window.ForestGraph.dispose();releaseHomeKnowledge();releaseHomeKnowledge=()=>{};releaseHomeBrand();releaseHomeBrand=()=>{};releaseReadingNavigation();main.innerHTML=html;releaseReadingNavigation=setupReadingNavigation();document.title=`${label} · 大师森林课程`;
    document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===(page==='home'?'home':page==='graph'?'graph':'explore'))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    if(page==='graph')window.ForestGraph.mount({bookId:parts[1],nodeId:parts[2]});
    if(page==='home'){releaseHomeKnowledge=mountHomeKnowledge();releaseHomeBrand=mountHomeBrand();}
    if(page==='explore')updateLibrary();
    main.focus({preventScroll:true});requestAnimationFrame(()=>window.scrollTo({top:restoreScroll!==null?restoreScroll:page==='explore'&&/^#\/(book|course)\//.test(previous)?library.scroll:0,behavior:'instant'}));document.getElementById('announcement').textContent=`已打开${label}`;
  }
  document.addEventListener('click',e=>{
    const button=e.target.closest('button,a');if(!button)return;
    if(button.hasAttribute('data-book-return')){returningToSource=true;return;}
    if(button.dataset.scroll){e.preventDefault();document.getElementById(button.dataset.scroll)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}
    if(button.hasAttribute('data-catalog-reset')){library={...defaults};updateLibrary();return;}
    if((route.startsWith('#/explore')||route.startsWith('#/cases'))&&button.getAttribute('href')?.startsWith('#/book/')){library.scroll=window.scrollY;save();}
  });
  document.addEventListener('change',e=>{
    const select=e.target.closest('select[data-catalog-filter]');if(!select)return;
    library[select.dataset.catalogFilter]=select.value;library.scroll=0;updateLibrary();
  });
  window.addEventListener('hashchange',render);render();
})();
