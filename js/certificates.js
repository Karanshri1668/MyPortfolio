// Certificate lightbox
const certCards = document.querySelectorAll('.certificate-card');
const lightbox = document.getElementById('certLightbox');
const lightboxImg = document.getElementById('certLightboxImg');
const lightboxClose = document.getElementById('certLightboxClose');

certCards.forEach(card => {
    card.querySelector('.certificate-thumb').addEventListener('click', () => {
        lightboxImg.src = card.dataset.full;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeLightbox(){
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeLightbox();
});