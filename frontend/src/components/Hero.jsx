import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        // Reveal animation on load
        const tl = gsap.timeline({ delay: 2.8 }); // Wait for LoadingScreen

        tl.fromTo(textRef.current.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out' }
        );

        // Parallax scroll effect
        gsap.to(videoRef.current, {
            y: '20%',
            ease: 'none',
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });

    }, []);

    return (
        <section ref={heroRef} className="hero-section" id="home">
            <div className="hero-video-container">
                <video
                    ref={videoRef}
                    className="hero-video"
                    autoPlay
                    muted
                    defaultMuted
                    loop
                    playsInline
                    preload="auto"
                >
                    {/* Placeholder video - User will replace */}
                    <source src="https://ik.imagekit.io/tbsmPawar101/merc.mp4" type="video/mp4" />
                </video>
                <div className="overlay-dark"></div>
            </div>

            <div className="hero-content container" ref={textRef}>
                <h1 className="hero-title">
                    <span className="title-part">Automotive</span>
                    <span className="title-part text-accent">Cinematography</span>
                    <span className="title-part">& Videography</span>
                </h1>
                <p className="hero-subtitle">Cinematic car and bike visuals</p>

                <div className="hero-buttons">
                    <a href="#portfolio" className="btn-primary">View Portfolio</a>
                    <a href="#contact" className="btn-secondary">Book a Shoot</a>
                </div>
            </div>

            <div className="scroll-indicator">
                <div className="mouse">
                    <div className="wheel"></div>
                </div>
                <span className="scroll-text">Scroll Down</span>
            </div>
        </section>
    );
};

export default Hero;
