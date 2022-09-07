function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".scrollContainer"),
        smooth: true
    });

    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)



    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".scrollContainer", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".scrollContainer").style.transform ? "transform" : "fixed"
    });




    let tl = gsap.timeline({ defaults: { opacity: 0, duration: 1 } })

    tl.from(".scrollContainer", { ease: "linear", autoAlpha: 0, duration: .3 })
        .from(".gsap", { x: -50, ease: 'Back.easeInOut', stagger: 0.2 })
        .from("#pointerDiv", { y: -100, ease: 'Bounce.easeOut', delay: 1, repeat: -1, yoyo: true, repeatDelay: 2 })
        .to("#pointer", {
            scrollTrigger: {
                triggier: "#aboutMe",
                start: "top top",
                scroller: ".scrollContainer",
                end: "+=100",
                scrub: 1,
            },
            opacity: 0,

        })


    let tl2 = gsap.timeline({
        defaults: {
            opacity: 0, duration: 1, ease: 'Back.easeInOut'
        },
        scrollTrigger: {
            triggier: "#aboutMeTrigger",
            endTrigger: "section2",
            start: "top top-=100", // when the top of the trigger hits the top of the viewport
            end: "bottom 100%",
            scroller: ".scrollContainer",
            scrub: 1,

        },

    });

    tl2
        .from("#aboutMe", { x: -50, stagger: 1 })
        .from("#aboutMeLogo", { scale: 0.3, opacity: 0, duration: 2 }, 1);




    let tl3 = gsap.timeline({
        defaults: {
            opacity: 0, duration: 1, ease: 'Back.easeInOut'
        },
        scrollTrigger: {
            triggier: "#servicesSection",
            endTrigger: "section3",
            start: "top top-=200",
            end: "bottom 100%-=50",
            scroller: ".scrollContainer",
            scrub: 1,
        },

    });

    tl3
        .from("#services", { x: -50, stagger: 1 })
        .from("#serv1", { x: -50 })
        .from("#serv2", { x: 50 })
        .from("#serv3", { x: -50 })
        .from("#serv4", { x: 50 })






    let tl4 = gsap.timeline({
        defaults: {
            opacity: 0, duration: 1, ease: 'Back.easeInOut'
        },
        scrollTrigger: {
            trigger: "section3",
            start: "top bottom-=150", 
            endTrigger: "section4",
            end: "bottom 100%+=50",
            scroller: ".scrollContainer",
            scrub: 1,

        },

    });

    tl4
        .from("#contact", { x: -50, stagger: 1 })
        .from("#contactLogo", { scale: 0.3, opacity: 0, duration: 2 });


    const btnAbout = document.querySelector("#btnAbout");
    btnAbout.addEventListener("click", () => {
        locoScroll.scrollTo("section1");
    })
    const btnPointer = document.querySelector("#pointerLink");
    btnPointer.addEventListener("click", () => {
        locoScroll.scrollTo("section1");
    })
    const btnServices = document.querySelector("#btnServices");
    btnServices.addEventListener("click", () => {
        locoScroll.scrollTo("section2");
    })
    const btnHome = document.querySelector("#btnHome");
    btnHome.addEventListener("click", () => {
        locoScroll.scrollTo("top");
    })

    const btnContact = document.querySelector("#btnContact");
    btnContact.addEventListener("click", () => {
        locoScroll.scrollTo("section3");
    })

    const btnContact2 = document.querySelector("#btnContact2");
    btnContact2.addEventListener("click", () => {
        locoScroll.scrollTo("section3");
    })

































    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

    // function locomotiveHeightBug() {
    //     locoScroll.update();
    // }

    // setInterval(locomotiveHeightBug, 5000);
}


window.addEventListener("load", function (event) {
    init();
})

