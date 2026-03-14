import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play } from 'lucide-react';
import './FeaturedEdits.css';

gsap.registerPlugin(ScrollTrigger);

const edits = [
    { id: 1, type: 'video', title: 'Dark Knight', caption: 'Aggressive Warrior needs respect', thumb: 'https://ik.imagekit.io/tbsmPawar101/reel1.mp4' },
    { id: 2, type: 'video', title: 'Maharaja 650', caption: 'When Speed meets Comfort', thumb: 'https://ik.imagekit.io/tbsmPawar101/i650.mp4?updatedAt=1772906890448' },
    { id: 3, type: 'video', title: 'Fred did it Again', caption: '', thumb: 'https://ik.imagekit.io/tbsmPawar101/fredAgain.mp4' },
    { id: 4, type: 'video', title: 'Comfort food?', caption: 'Food + Soul = S`wich', thumb: 'https://ik.imagekit.io/tbsmPawar101/swich.mp4' },
];

const FeaturedEdits = () => {
    const sectionRef = useRef(null);
    const itemsRef = useRef([]);

    useEffect(() => {
        gsap.fromTo(itemsRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                }
            }
        );
    }, []);

    return (
        <section className="featured-section section-padding" ref={sectionRef}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title text-gradient">Featured Edits</h2>
                    <p className="section-subtitle">A collection of my best cinematic visual stories.</p>
                </div>

                <div className="edits-grid">
                    {edits.map((edit, index) => (
                        <div
                            key={edit.id}
                            className="edit-card"
                            ref={el => itemsRef.current[index] = el}
                        >
                            <div className="edit-info">
                                <h3 className="edit-title">{edit.title}</h3>
                                <p className="edit-caption">{edit.caption}</p>
                            </div>
                            <br></br>
                            <div className="edit-thumb-wrapper">
                                {edit.type === 'video' ? (
                                    <video src={edit.thumb} autoPlay muted loop playsInline className="edit-thumb" />
                                ) : (
                                    <img src={edit.thumb} alt={edit.title} className="edit-thumb" loading="lazy" />
                                )}
                                <div className="edit-overlay">
                                    <Play size={48} className="play-btn" color="#fff" />
                                </div>
                            </div>                            
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedEdits;
