import React, { useState, useEffect, useRef } from 'react';
import { X, PlayCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

// Placeholder media logic
const mediaItems = {
    cars: [
        { type: 'image', orientation: 'portrait', url: 'https://ik.imagekit.io/tbsmPawar101/car-cover.jpg' },
        { type: 'image', orientation: 'portrait', url: 'https://ik.imagekit.io/tbsmPawar101/IMG_3607_11zon.jpg' },
        { type: 'image', orientation: 'portrait', url: 'https://ik.imagekit.io/tbsmPawar101/IMG_4958.JPG' },
        { type: 'video', orientation: 'landscape', url: 'https://ik.imagekit.io/tbsmPawar101/merc2.mp4' },
        { type: 'image', orientation: 'landscape', url: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    ],
    bikes: [
        { type: 'image', orientation: 'portrait', url: 'https://ik.imagekit.io/tbsmPawar101/triumph-10.JPG' },
        { type: 'image', orientation: 'portrait', url: 'https://images.pexels.com/photos/1715184/pexels-photo-1715184.jpeg?auto=compress&cs=tinysrgb&w=800' },
        { type: 'image', orientation: 'portrait', url: 'https://ik.imagekit.io/tbsmPawar101/triumph-4.JPG' },
        { type: 'video', orientation: 'landscape', url: 'https://ik.imagekit.io/ht1e6kqd8/400x-1.mp4' },
        { type: 'image', orientation: 'landscape', url: 'https://ik.imagekit.io/tbsmPawar101/triumph-16.JPG' },
    ],
    other: [
        { type: 'image', orientation: 'portrait', url: 'https://ik.imagekit.io/ht1e6kqd8/DSC00008%20(1).jpg' },
        { type: 'image', orientation: 'portrait', url: 'https://ik.imagekit.io/ht1e6kqd8/DSC00008%20(1).jpg' },
        { type: 'video', orientation: 'portrait', url: 'https://ik.imagekit.io/ht1e6kqd8/FINALEST%20DRAFT%20(REFINED)%20(1).mp4', },
        { type: 'image', orientation: 'portrait', url: 'https://ik.imagekit.io/ht1e6kqd8/DSC00044.jpg' },
        { type: 'video', orientation: 'landscape', url: 'https://ik.imagekit.io/ht1e6kqd8/20-25%20(1).mp4' }
    ]
};

const Portfolio = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        // Scroll reveal for cards
        gsap.fromTo(cardsRef.current,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            }
        );
    }, []);

    const openGallery = (category) => {
        setSelectedCategory(category);
        document.body.style.overflow = 'hidden';
    };

    const closeGallery = () => {
        setSelectedCategory(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <section id="portfolio" className="portfolio-section" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title text-gradient">Select Category</h2>
                <div className="portfolio-grid">

                    <div
                        className="category-card"
                        ref={el => cardsRef.current[0] = el}
                        onClick={() => openGallery('cars')}
                    >
                        <div className="category-bg" style={{ backgroundImage: `url(${mediaItems.cars[0].url})` }}></div>
                        <div className="category-overlay"></div>
                        <h3 className="category-title">Cars</h3>
                        <span className="category-subtitle">View Showcase</span>
                    </div>

                    <div
                        className="category-card"
                        ref={el => cardsRef.current[1] = el}
                        onClick={() => openGallery('bikes')}
                    >
                        <div className="category-bg" style={{ backgroundImage: `url(${mediaItems.bikes[0].url})` }}></div>
                        <div className="category-overlay"></div>
                        <h3 className="category-title">Bikes</h3>
                        <span className="category-subtitle">View Showcase</span>
                    </div>

                    <div
                        className="category-card"
                        ref={el => cardsRef.current[2] = el}
                        onClick={() => openGallery('other')}
                    >
                        <div className="category-bg" style={{ backgroundImage: `url('https://ik.imagekit.io/ht1e6kqd8/DSC00008%20(1).jpg')` }}></div>
                        <div className="category-overlay"></div>
                        <h3 className="category-title" style={{ fontSize: 'clamp(2rem, 4vw, 4rem)' }}>Other</h3>
                        <span className="category-subtitle">Hotels / Cafes</span>
                    </div>

                </div>
            </div>

            {/* Fullscreen Gallery View */}
            {selectedCategory && (
                <div className="gallery-fullscreen">
                    <button className="gallery-close" onClick={closeGallery}>
                        <X size={40} />
                    </button>

                    <h2 className="gallery-header">{selectedCategory.toUpperCase()} SHOWCASE</h2>

                    <div className="gallery-content">
                        {mediaItems[selectedCategory].map((item, index) => (
                            <div key={index} className={`gallery-item orientation-${item.orientation}`}>
                                {item.type === 'video' ? (
                                    <div className="video-wrapper">
                                        <video src={item.url} autoPlay muted loop playsInline />

                                    </div>
                                ) : (
                                    <img src={item.url} alt={item.title} loading="lazy" />
                                )}
                                <div className="item-details">
                                    <h4>{item.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
