const hdr=document.getElementById('hdr');
  window.addEventListener('scroll',()=>{hdr.classList.toggle('scrolled',window.scrollY>10)});
  const mt=document.getElementById('mtoggle'),nl=document.getElementById('navlinks');
  mt.addEventListener('click',()=>nl.classList.toggle('show'));

  function go(page){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById('page-'+page).classList.add('active');
    document.querySelectorAll('.nav-links a[data-nav]').forEach(a=>a.classList.toggle('active',a.dataset.nav===page));
    nl.classList.remove('show');window.scrollTo(0,0);initReveal();
  }
  document.querySelectorAll('[data-nav]').forEach(el=>{el.style.cursor='pointer';el.addEventListener('click',e=>{e.preventDefault();go(el.dataset.nav)})});

  function setLang(l){
    document.body.classList.toggle('en',l==='en');document.documentElement.lang=l;
    document.getElementById('lang-de').classList.toggle('on',l==='de');
    document.getElementById('lang-en').classList.toggle('on',l==='en');
  }
  document.getElementById('lang-de').addEventListener('click',()=>setLang('de'));
  document.getElementById('lang-en').addEventListener('click',()=>setLang('en'));

  let io;
  function initReveal(){
    if(io)io.disconnect();
    io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);
      // animate capital bars
      e.target.querySelectorAll('.cap-fill').forEach(f=>{f.style.width=f.dataset.w+'%'});
    }})},{threshold:0.12});
    document.querySelectorAll('.page.active .reveal').forEach(el=>{el.classList.remove('in');io.observe(el)});
    document.querySelectorAll('.page.active .n[data-count]').forEach(el=>{
      const cio=new IntersectionObserver((ents)=>{ents.forEach(e=>{if(e.isIntersecting){
        const t=+el.dataset.count,suf=el.dataset.suffix||'';let c=0,inc=Math.ceil(t/40);
        const iv=setInterval(()=>{c+=inc;if(c>=t){c=t;clearInterval(iv)}el.textContent=c+suf},22);cio.unobserve(el);
      }})},{threshold:0.5});cio.observe(el);
    });
  }

  // ROI calculator
  function fmt(n){return Math.round(n).toLocaleString('de-DE')}
  function calcROI(){
    const stock=+document.getElementById('r-stock').value;
    const rev=+document.getElementById('r-rev').value;
    const marg=+document.getElementById('r-marg').value;
    document.getElementById('v-stock').textContent=fmt(stock);
    document.getElementById('v-rev').textContent=fmt(rev);
    document.getElementById('v-marg').textContent=marg;
    const margin=rev*marg/100;
    document.getElementById('o-capital').textContent=fmt(stock);
    document.getElementById('o-margin').textContent=fmt(margin);
  }
  ['r-stock','r-rev','r-marg'].forEach(id=>{const el=document.getElementById(id);if(el)el.addEventListener('input',calcROI)});
  if(document.getElementById('r-stock'))calcROI();

  document.addEventListener('click',ev=>{
    const q=ev.target.closest('.faq-q');if(!q)return;
    const item=q.parentElement,a=item.querySelector('.faq-a'),open=item.classList.contains('open');
    item.parentElement.querySelectorAll('.faq-item').forEach(i=>{i.classList.remove('open');i.querySelector('.faq-a').style.maxHeight=null});
    if(!open){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px'}
  });

  // Brand pool modal
  const modal=document.getElementById('bp-modal');
  function openBp(){modal.classList.add('open');document.body.style.overflow='hidden'}
  function closeBp(){modal.classList.remove('open');document.body.style.overflow=''}
  document.addEventListener('click',e=>{
    if(e.target.closest('.bp-open')){e.preventDefault();openBp()}
    if(e.target===modal||e.target.closest('#bp-close'))closeBp();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeBp()});
  document.getElementById('bp-submit').addEventListener('click',()=>{
    const name=document.getElementById('bp-name').value.trim();
    const comp=document.getElementById('bp-company').value.trim();
    const stores=document.getElementById('bp-stores').value.trim();
    const email=document.getElementById('bp-email').value.trim();
    if(!name||!comp||!stores||!email||!email.includes('@')){
      alert(document.body.classList.contains('en')?'Please fill in all fields with a valid email.':'Bitte alle Felder mit gültiger E-Mail ausfüllen.');return;
    }
    // NOTE: connect this to your backend / HubSpot form. For now it confirms locally.
    document.getElementById('bp-echo').textContent=email;
    document.getElementById('bp-echo2').textContent=email;
    document.getElementById('bp-form-inner').style.display='none';
    document.getElementById('bp-success').classList.add('show');
  });

  // Case detail modal
  const caseModal=document.getElementById('case-modal');
  const caseDetailContent=document.getElementById('case-detail-content');
  function openCase(id){
    const src=document.querySelector('#case-data > div[data-case-id="'+id+'"]');
    if(!src)return;
    caseDetailContent.innerHTML=src.innerHTML;
    // toggle layout class on modal box
    const box=caseModal.querySelector('.case-modal-box');
    box.classList.toggle('case-modal-full',src.dataset.caseLayout==='full-image');
    // apply hero background (for non-full layouts)
    const hero=caseDetailContent.querySelector('.case-hero');
    if(hero&&hero.dataset.bg){
      hero.style.backgroundImage='url('+hero.dataset.bg+')';
      if(hero.dataset.bgPosition)hero.style.backgroundPosition=hero.dataset.bgPosition;
    }
    caseModal.classList.add('open');document.body.style.overflow='hidden';
  }
  function closeCase(){caseModal.classList.remove('open');document.body.style.overflow=''}
  document.addEventListener('click',e=>{
    const card=e.target.closest('.case-open');
    if(card){e.preventDefault();openCase(card.dataset.case);return}
    if(e.target===caseModal||e.target.closest('#case-close'))closeCase();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCase()});

  initReveal();
