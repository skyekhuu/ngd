const openButton = document.getElementById('open-sidebar-button')
const navbar = document.getElementById('navbar')

const media = window.matchMedia("(max-width: 700px)")

function updateNavbar(e){
    console.log(e)
}

function openSidebar(){
    navbar.classList.add('show')
    openButton.setAttribute('aria-expanded', 'true')
}

function closeSidebar(){
    navbar.classList.remove('show')
        openButton.setAttribute('aria-expanded', 'false')
}

updateNavbar(media)

let lastScrollY = window.scrollY || 0;
let ticking = false;
const HIDE_OFFSET = 10; // small threshold to avoid flicker on tiny scrolls

// When switching to small screens, ensure the hide class is removed
function handleMediaChange(e) {
  if (e.matches && navbar) {
    navbar.classList.remove('hide');
  }
}
if (media) {
  if (typeof media.addEventListener === 'function') media.addEventListener('change', handleMediaChange);
  else if (typeof media.addListener === 'function') media.addListener(handleMediaChange);
}

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY || 0;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (!navbar) return;

      // Don't apply hide behavior on small screens (sidebar layout)
      if (media && media.matches) {
        if (navbar.classList.contains('hide')) navbar.classList.remove('hide');
        lastScrollY = currentScrollY;
        ticking = false;
        return;
      }

      const delta = currentScrollY - lastScrollY;

      if (delta > HIDE_OFFSET && currentScrollY > HIDE_OFFSET) {
        // Scrolling down
        navbar.classList.add('hide');
      } else if (delta < 0) {
        // Scrolling up
        navbar.classList.remove('hide');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    });

    ticking = true;
  }
}, { passive: true });