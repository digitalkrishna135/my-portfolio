const menuToggle=document.querySelector('.menu-toggle');
const navLinks=document.querySelector('.nav-links');
menuToggle?.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')==='true';menuToggle.setAttribute('aria-expanded',String(!open));navLinks.classList.toggle('open',!open);});
document.querySelectorAll('.nav-link').forEach(link=>link.addEventListener('click',()=>{navLinks?.classList.remove('open');menuToggle?.setAttribute('aria-expanded','false')}));

const header=document.querySelector('.site-header');
window.addEventListener('scroll',()=>header?.classList.toggle('scrolled',window.scrollY>20));

const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}})},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const sections=[...document.querySelectorAll('main section[id]')];
const navItems=[...document.querySelectorAll('.nav-link')];
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navItems.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${entry.target.id}`))}})},{rootMargin:'-35% 0px -55%',threshold:0});
sections.forEach(section=>sectionObserver.observe(section));

const themeButton=document.querySelector('.theme-toggle');
const savedTheme=localStorage.getItem('portfolio-theme');
if(savedTheme==='dark')document.body.classList.add('dark-mode');
themeButton?.addEventListener('click',()=>{document.body.classList.toggle('dark-mode');const dark=document.body.classList.contains('dark-mode');localStorage.setItem('portfolio-theme',dark?'dark':'light');themeButton.setAttribute('aria-label',dark?'Switch to light mode':'Switch to dark mode')});

const typingText=document.querySelector('#typing-text');
const words=['Frontend Development','Web Technologies','Creative Problem Solving','Entrepreneurship'];
let wordIndex=0,charIndex=0,deleting=false;
function type(){if(!typingText)return;const word=words[wordIndex];if(!deleting){charIndex++;typingText.textContent=word.slice(0,charIndex);if(charIndex===word.length){deleting=true;setTimeout(type,1200);return}}else{charIndex--;typingText.textContent=word.slice(0,charIndex);if(charIndex===0){deleting=false;wordIndex=(wordIndex+1)%words.length}}setTimeout(type,deleting?45:75)}
type();

const modal=document.querySelector('#project-modal');
const modalTitle=document.querySelector('#modal-title');
const modalBody=document.querySelector('#modal-body');
const projectData={visitbuddy:{title:'VisitBuddy — Case Study',body:'<h3>Project Overview</h3><p>VisitBuddy was designed as a travel companion and trip planning platform to help travellers discover destinations, organize plans and connect with fellow travellers.</p><h3>My Contribution</h3><p>I contributed to frontend development and planned the experience around clear discovery, trip planning and responsive dashboard interfaces.</p><h3>Planned Rebuild</h3><p>The project is currently planned for redevelopment using MongoDB, Express.js, React.js and Node.js. Both the old project and repository folders have been deleted, so no live demo or source link is claimed here.</p><h3>Core Features</h3><ul><li>Destination search and information</li><li>Trip planning and travel partner matching</li><li>User login and registration</li><li>Responsive travel dashboard</li></ul>'},transport:{title:'Transport Saathi — Case Study',body:'<h3>Project Overview</h3><p>Transport Saathi is a transport and fleet management SaaS concept created to simplify daily vehicle, driver, payment and reporting operations for transport businesses.</p><h3>My Contribution</h3><p>I previously developed frontend and backend portions with AI-assisted coding and helped shape the operational dashboard flows.</p><h3>Planned Rebuild</h3><p>The project is planned for redevelopment using MongoDB, Express.js, React.js and Node.js. The previous project folders were deleted, and there is currently no live website or fake repository link.</p><h3>Core Features</h3><ul><li>Truck and vehicle management</li><li>Driver management and load tracking</li><li>Income, expense, EMI and payment tracking</li><li>Admin and driver dashboards with reports</li></ul>'}};
let lastTrigger=null;
function openModal(projectKey,trigger){const data=projectData[projectKey];if(!data||!modal)return;lastTrigger=trigger;modalTitle.textContent=data.title;modalBody.innerHTML=data.body;modal.hidden=false;document.body.style.overflow='hidden';modal.querySelector('.modal-close')?.focus()}
function closeModal(){if(!modal)return;modal.hidden=true;document.body.style.overflow='';lastTrigger?.focus()}
document.querySelectorAll('.case-button').forEach(button=>button.addEventListener('click',()=>openModal(button.dataset.project,button)));
document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!modal?.hidden)closeModal();if(event.key==='Tab'&&modal&&!modal.hidden){const focusable=[...modal.querySelectorAll('button,a,[tabindex]:not([tabindex="-1"])')];if(!focusable.length)return;const first=focusable[0],last=focusable[focusable.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}});