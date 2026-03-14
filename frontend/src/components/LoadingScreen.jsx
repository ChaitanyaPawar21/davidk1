import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';
import Logo from './Logo';

const LoadingScreen = ({ onComplete }) => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
            }
        });

        // Initial state
        gsap.set(contentRef.current, { opacity: 0, scale: 0.8 });

        // Animation sequence
        tl.to(contentRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2
        })
            .to(contentRef.current, {
                scale: 1.5,
                duration: 1.2,
                ease: 'none',
            })
            .to(contentRef.current, {
                scale: 4,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.in',
            })
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
                onComplete: () => {
                    if (containerRef.current) containerRef.current.style.display = 'none';
                }
            }, "-=0.2");

        return () => tl.kill();
    }, [onComplete]);

    return (
        <div ref={containerRef} className="loading-container">
            <div ref={contentRef} className="loading-content">
                <Logo size="large" />
            </div>
            <div className="loading-bar-container">
                <div className="loading-bar"></div>
            </div>
        </div>
    );
};

export default LoadingScreen;
