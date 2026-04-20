
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {


    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis Smooth Scroll
    // Lenis smooth scrolling
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);


    // Navbar Scroll Effect
    // var prevScrollpos = window.pageYOffset;
    // window.onscroll = function () {
    //     var currentScrollPos = window.pageYOffset;
    //     if (prevScrollpos > currentScrollPos) {
    //         document.getElementsByClassName("navbar")[0].style.top = "0px";
    //     } else {
    //         document.getElementsByClassName("navbar")[0].style.top = "-100px";
    //     }
    //     prevScrollpos = currentScrollPos;
    // };
    // Hero Animations
    const heroTimeline = gsap.timeline();

    heroTimeline
        .from('.hero-headline', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out'
        })
        .from('.hero-subhead', {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            delay: -0.5
        })
        .from('.hero-ctas', {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: -0.5
        })
    // General Section Animations (Fade Up)
    const sections = gsap.utils.toArray('section:not(.hero-section)');

    sections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Authority Items Stagger
    gsap.from('.authority-item', {
        scrollTrigger: {
            trigger: '.authority-item',
            start: 'top 85%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Text Reveal Animation (Gradient)
    const textElements = gsap.utils.toArray(".textcolorchange h2");

    textElements.forEach((text) => {
        gsap.to(text, {
            backgroundPositionX: "0%",
            stagger: 1,
            scrollTrigger: {
                trigger: text,
                scrub: 2,
                markers: false,
                start: "top 80%",
                end: "bottom 60%"
            }
        });
    });
});








