// const glow = document.querySelector(".cursor-glow");

// document.addEventListener("mousemove",(e)=>{

// glow.style.left=e.clientX+"px";

// glow.style.top=e.clientY+"px";

// });
const glow = document.querySelector(".cursor-glow");
let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
let rotation = 0;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    rotation += 2; // Continuous rotation
});

function animateGlow() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    
    glow.style.transform = `translate(${currentX - 50}px, ${currentY - 50}px) rotate(${rotation}deg)`;
    glow.style.background = `conic-gradient(from ${rotation}deg, #6366f1, #8b5cf6, #a78bfa, #6366f1)`;
    requestAnimationFrame(animateGlow);
}

animateGlow();

const counters = document.querySelectorAll("[data-target]");

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const counter = entry.target;

const target = +counter.dataset.target;

let count = 0;

const update = ()=>{

count += Math.ceil(target/50);

if(count<target){

counter.textContent=count;

requestAnimationFrame(update);

}else{

counter.textContent=target+"+";

}

}

update();

observer.unobserve(counter);

}

})

});

counters.forEach(counter=>observer.observe(counter));


