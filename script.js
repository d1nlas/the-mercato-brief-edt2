const loader = document.querySelector('.page-loader');
const progress = document.getElementById('progress');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const navLinks = document.querySelectorAll('.mobile-nav a');
const tabs = document.querySelectorAll('.case-tab');
const panels = document.querySelectorAll('.case-panel');

window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('loaded'), 420);
});

function updateProgress(){
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const value = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${value}%`;
}
window.addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

menuToggle.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('open');
  mobileNav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
navLinks.forEach(link => link.addEventListener('click', () => {
  menuToggle.classList.remove('open');
  mobileNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
},{threshold:.12});
document.querySelectorAll('.reveal,.reveal-title').forEach(el => revealObserver.observe(el));

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.case;
    tabs.forEach(t => t.classList.toggle('active', t === tab));
    panels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === key));
  });
});

const strategyCards = document.querySelectorAll('.strategy');

strategyCards.forEach(card => {
  const button = card.querySelector('.micro-button');
  const why = card.querySelector('.strategy-why');

  card.addEventListener('mouseenter', () => {
    strategyCards.forEach(item => item.classList.remove('active'));
    card.classList.add('active');
  });

  card.addEventListener('focusin', () => {
    strategyCards.forEach(item => item.classList.remove('active'));
    card.classList.add('active');
  });

  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const willOpen = why.hasAttribute('hidden');

    strategyCards.forEach(item => {
      const panel = item.querySelector('.strategy-why');
      const trigger = item.querySelector('.micro-button');
      panel.hidden = true;
      item.classList.remove('why-open');
      trigger.setAttribute('aria-expanded', 'false');
    });

    if (willOpen) {
      why.hidden = false;
      card.classList.add('why-open', 'active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});
