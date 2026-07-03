gsap.registerPlugin(ScrollTrigger);

gsap.from(".journey-header",{

    y:80,

    opacity:0,

    duration:1,

    ease:"power3.out",

    scrollTrigger:{

        trigger:".journey",

        start:"top 80%"

    }

});

gsap.from(".journey-left",{

    x:-100,

    opacity:0,

    duration:1,

    ease:"power3.out",

    scrollTrigger:{

        trigger:".journey",

        start:"top 75%"

    }

});

gsap.from(".timeline-item",{

    x:100,

    opacity:0,

    duration:.8,

    stagger:.2,

    ease:"power3.out",

    scrollTrigger:{

        trigger:".timeline",

        start:"top 75%"

    }

});

gsap.to(".timeline-line", {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
        trigger: ".timeline",
        start: "top 70%",
        end: "bottom 70%",
        scrub: true
    }
});

gsap.from(".hire-card",{

y:-80,

opacity:0,

// stagger:.5,

duration:1,

scrollTrigger:{

trigger:".hire",

start:"top 70%"

}

});

gsap.from(".hire-left",{

x:-100,

opacity:0,

duration:1,

scrollTrigger:{

trigger:".hire",

start:"top 75%"

}

});



const timelineItems =

document.querySelectorAll(".timeline-item");

timelineItems.forEach(item=>{

ScrollTrigger.create({

trigger:item,

start:"top center",

end:"bottom center",

toggleClass:{

targets:item.querySelector(".timeline-dot"),

className:"active"

}

});

});

const modal =

document.querySelector(".resume-modal");

const previewButtons =
document.querySelectorAll(".preview-btn");

previewButtons.forEach(btn => {

    btn.addEventListener("click", e => {

        e.preventDefault();

        modal.classList.add("active");

    });

});

previewButtons.forEach(btn=>{

btn.addEventListener("click",e=>{

e.preventDefault();

modal.classList.add("active");

});

});

document

.querySelector(".close-modal")

.onclick=()=>{

modal.classList.remove("active");

};

modal.onclick=e=>{

if(e.target===modal)

modal.classList.remove("active");

};

const buttons =

document.querySelectorAll(

".primary-btn,.secondary-btn"

);

buttons.forEach(button=>{

button.addEventListener(

"mousemove",

e=>{

const rect=

button.getBoundingClientRect();

const x=

e.clientX-

rect.left-

rect.width/2;

const y=

e.clientY-

rect.top-

rect.height/2;

button.style.transform=

`translate(${x*.18}px,${y*.18}px)`;

});

button.addEventListener(

"mouseleave",

()=>{

button.style.transform=

"translate(0,0)";

});

});


const certificates =
document.querySelectorAll(".certificate-card");

const dots =
document.querySelectorAll(".slider-dots span");

let current = 0;

function showCertificate(index){

certificates.forEach(card=>

card.classList.remove("active")

);

dots.forEach(dot=>

dot.classList.remove("active")

);

certificates[index]

.classList.add("active");

dots[index]

.classList.add("active");

}

function nextCertificate(){

current++;

if(current>=certificates.length){

current=0;

}

showCertificate(current);

}

setInterval(nextCertificate,3000);

document

.querySelector(".next")

.onclick=()=>{

nextCertificate();

};

document

.querySelector(".prev")

.onclick=()=>{

current--;

if(current<0){

current=certificates.length-1;

}

showCertificate(current);

};