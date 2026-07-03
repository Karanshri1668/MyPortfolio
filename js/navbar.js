// Burger menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const nav = document.querySelector('header nav');
const menuOverlay = document.getElementById('menuOverlay');
const menuIcon = menuBtn.querySelector('i');

function openMenu(){
    nav.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.classList.add('menu-open');
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-xmark');
}

function closeMenu(){
    nav.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    menuIcon.classList.remove('fa-xmark');
    menuIcon.classList.add('fa-bars');
}

menuBtn.addEventListener('click', () => {
    if(nav.classList.contains('active')){
        closeMenu();
    } else {
        openMenu();
    }
});

// Close when clicking overlay
menuOverlay.addEventListener('click', closeMenu);

// Close when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeMenu();
});

// Close menu if window resized back to desktop
window.addEventListener('resize', () => {
    if(window.innerWidth > 768 && nav.classList.contains('active')){
        closeMenu();
    }
});