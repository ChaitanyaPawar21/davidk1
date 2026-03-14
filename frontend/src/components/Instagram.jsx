import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram as InstaIcon } from 'lucide-react';
import './Instagram.css';

gsap.registerPlugin(ScrollTrigger);

const instaPosts = [
    'https://ik.imagekit.io/tbsmPawar101/DSC09496.jpg',
    'https://ik.imagekit.io/tbsmPawar101/DSC00142.jpg',
    'https://ik.imagekit.io/tbsmPawar101/DSC00008.jpg',
    'https://ik.imagekit.io/tbsmPawar101/DSC09781.jpg',
    'https://ik.imagekit.io/tbsmPawar101/20260115_080905(0).jpg',
];

const Instagram = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(gridRef.current.children,
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                }
            }
        );
    }, []);

    return (
        <section className="insta-section section-padding" ref={sectionRef}>
            <div className="container">
                <div className="insta-header">
                    <InstaIcon size={48} className="insta-icon-large" />
                    <h2 className="section-title text-gradient">@editz.by.david</h2>
                    <a href="https://www.instagram.com/editz.by.david/" target="_blank" rel="noreferrer" className="btn-primary follow-btn">
                        Follow on Instagram
                    </a>
                </div>

                <div className="insta-grid" ref={gridRef}>
                    {instaPosts.map((post, idx) => (
                        <a key={idx} href="https://www.instagram.com/editz.by.david/" target="_blank" rel="noreferrer" className="insta-post">
                            <img src={post} alt="Instagram post" loading="lazy" />
                            <div className="insta-overlay">
                                <InstaIcon size={32} color="#fff" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Instagram;
