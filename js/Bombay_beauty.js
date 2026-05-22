// SCROLL + PARALLAX (MERGED FOR PERFORMANCE)
const elements = document.querySelectorAll(".fade");

window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const screen = window.innerHeight;

    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;

        if (position < screen - 100) {
            el.classList.add("show");
        }
    });

    // PARALLAX
    const layer1 = document.querySelector(".layer1");
    const layer2 = document.querySelector(".layer2");
    const planet1 = document.querySelector(".planet1");
    const planet2 = document.querySelector(".planet2");

    if (layer1) layer1.style.transform = `translateY(${scroll * 0.1}px)`;
    if (layer2) layer2.style.transform = `translateY(${scroll * 0.2}px)`;

    if (planet1) planet1.style.transform = `translateY(${scroll * 0.15}px)`;
    if (planet2) planet2.style.transform = `translateY(${scroll * 0.25}px)`;
});


// LOADER
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
});
/* =========================
NAVBAR SMOOTH SCROLL
========================= */

const navLinks =
document.querySelectorAll("nav a");


navLinks.forEach(link=>{

link.addEventListener(

"click",

function(e){

e.preventDefault();

const targetId =
this.getAttribute("href");

const target =
document.querySelector(targetId);

if(target){

target.scrollIntoView({

behavior:"smooth",

block:"start"

});

}

});

});




/* =========================
ACTIVE NAV
========================= */

const sections =
document.querySelectorAll("section");


window.addEventListener(

"scroll",

()=>{

let current="";

sections.forEach(section=>{

const top =
section.offsetTop-180;

const height =
section.offsetHeight;

if(

scrollY>=top &&

scrollY<
top+height

){

current=
section.id;

}

});


navLinks.forEach(link=>{

link.classList.remove("active");

if(

link.getAttribute("href")

===

"#"+current

){

link.classList.add(

"active"

);

}

});

}

);

/* =========================
   ROCKET CURSOR SYSTEM
========================= */

const canvas = document.getElementById("rocketCanvas");
const ctx = canvas.getContext("2d");

/* CANVAS SIZE */

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* MOUSE */

let mouse = {

    x: window.innerWidth / 2,
    y: window.innerHeight / 2

};


/* SPACECRAFT */

let rocket = {

    x: mouse.x,
    y: mouse.y

};


/* TRAIL */

let trail = [];


/* MOUSE MOVE */

document.addEventListener("mousemove", (e) => {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});
/* MOBILE TOUCH */

document.addEventListener("touchmove",(e)=>{

mouse.x=e.touches[0].clientX;

mouse.y=e.touches[0].clientY;

},{passive:true});


/* =========================
   ANIMATION
========================= */

function animate() {

    requestAnimationFrame(animate);

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* SMOOTH FOLLOW */

    rocket.x += (mouse.x - rocket.x) * 0.08;

    rocket.y += (mouse.y - rocket.y) * 0.08;


    /* TRAIL */

    trail.push({

        x: rocket.x,
        y: rocket.y

    });


    if (trail.length > 22) {

        trail.shift();

    }


    /* =========================
       DRAW TRAIL
    ========================= */

    for (let i = 0; i < trail.length; i++) {

        let t = trail[i];

        let size = (i / trail.length) * 5;


        ctx.beginPath();

        ctx.arc(
            t.x,
            t.y,
            size,
            0,
            Math.PI * 2
        );


        /* CYAN GLOW */

        ctx.fillStyle = `rgba(
            120,
            220,
            255,
            ${i / trail.length}
        )`;


        ctx.shadowColor = "rgba(120,220,255,0.9)";

        ctx.shadowBlur = 18;

        ctx.fill();

    }


    /* =========================
       ANGLE
    ========================= */

    let dx = mouse.x - rocket.x;

    let dy = mouse.y - rocket.y;

    let angle = Math.atan2(dy, dx);


    /* =========================
       DRAW SPACECRAFT
    ========================= */

    ctx.save();

    ctx.translate(
        rocket.x,
        rocket.y
    );

    ctx.rotate(angle);


    /* BODY */

    ctx.fillStyle = "#ffffff";

    ctx.shadowColor = "rgba(180,255,255,0.9)";

    ctx.shadowBlur = 12;

    ctx.beginPath();

    ctx.moveTo(14, 0);

    ctx.lineTo(-10, 7);

    ctx.lineTo(-6, 0);

    ctx.lineTo(-10, -7);

    ctx.closePath();

    ctx.fill();


    /* INNER CORE */

    ctx.fillStyle = "#9ffcff";

    ctx.beginPath();

    ctx.arc(
        2,
        0,
        2.5,
        0,
        Math.PI * 2
    );

    ctx.fill();


    /* PLASMA FLAME */

    ctx.fillStyle = "rgba(0,255,220,0.9)";

    ctx.beginPath();

    ctx.moveTo(-10, 0);

    ctx.lineTo(-22, 5);

    ctx.lineTo(-22, -5);

    ctx.closePath();

    ctx.fill();


    ctx.restore();

}


/* START */

animate();


// REVIEW SYSTEM
function addReview() {
    let name = document.getElementById("name").value;
    let message = document.getElementById("message").value;

    if (!name || !message) {
        alert("Please fill all fields");
        return;
    }

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.push({ name, message });

    localStorage.setItem("reviews", JSON.stringify(reviews));

    displayReviews();

    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
}

function displayReviews() {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    let box = document.querySelector(".review-box");

    if (!box) return;

    box.innerHTML = "";

    reviews.forEach(r => {
        let div = document.createElement("div");
        div.classList.add("review");

        div.innerHTML = `
            <p>"${r.message}"</p>
            <h4>- ${r.name}</h4>
        `;

        box.appendChild(div);
    });
}



const allSwipers =
document.querySelectorAll(".swiper");

allSwipers.forEach(swiper=>{

const section=
swiper.closest(".portfolio-section");

const nextBtn=
section.querySelector(".swiper-button-next");

const prevBtn=
section.querySelector(".swiper-button-prev");

new Swiper(swiper,{

loop:true,

speed:800,

grabCursor:true,

centeredSlides:false,

slidesPerView:4.2,

slidesPerGroup:5,

spaceBetween:28,

navigation:{
nextEl:nextBtn,
prevEl:prevBtn,
},

breakpoints:{

0:{

slidesPerView:1,

slidesPerGroup:1,

spaceBetween:18,

},

768:{

slidesPerView:2.3,

slidesPerGroup:1,

spaceBetween:22,

},

1024:{

slidesPerView:4.2,

slidesPerGroup:5,

spaceBetween:28,

}

}

});

});
const serviceLinks =
document.querySelectorAll('.service-link');

serviceLinks.forEach(link => {

    link.addEventListener('click', () => {

        const targetId =
        link.dataset.target;

        const targetSection =
        document.getElementById(targetId);


        // smooth scroll
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });


        // glow effect
        targetSection.classList.add('section-focus');

        setTimeout(() => {

            targetSection.classList.remove(
                'section-focus'
            );

        }, 2000);

    });

});
