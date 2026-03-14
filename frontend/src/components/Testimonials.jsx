import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
    {
        id: 1,
        name: 'Aditya H',
        review: 'David has been a wonderful editor,he is outstanding and creative while editing all the projects. If you want your videos to go viral he is the guy',
    },
    {
        id: 2,
        name: 'Kevin Nair',
        review: 'I would say you can fully trust david for all your cinematography and editing work, throw a concept or your vision and he will make it into a reality.',
    },
    {
        id: 3,
        name: 'Gokul Sahani',
        review: 'I would confidently recommend David for any cinematography or editing work. Just share your concept or vision with him, and he will transform it into something remarkable. You can completely trust him to deliver high-quality results every time.',
    }
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(sectionRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            }
        );
    }, []);

    const nextSlide = () => {
        gsap.to(sliderRef.current, {
            opacity: 0, x: -50, duration: 0.3, onComplete: () => {
                setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
                gsap.fromTo(sliderRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.4 });
            }
        });
    };

    const prevSlide = () => {
        gsap.to(sliderRef.current, {
            opacity: 0, x: 50, duration: 0.3, onComplete: () => {
                setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
                gsap.fromTo(sliderRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.4 });
            }
        });
    };

    return (
        <section id="testimonials" className="testimonials-section section-padding" ref={sectionRef}>
            <video
                autoPlay
                loop
                muted
                playsInline
                className="testimonials-bg-video"
            >
                <source src="https://ik.imagekit.io/ht1e6kqd8/0122.mp4" type="video/mp4" />
            </video>
            <div className="testimonials-overlay"></div>

            <div className="container">
                <h2 className="section-title text-gradient" style={{ textAlign: 'center', marginBottom: '4rem' }}>Client Stories</h2>

                <div className="testimonial-wrapper">
                    <button className="slider-btn prev" onClick={prevSlide}><ChevronLeft size={32} /></button>

                    <div className="testimonial-content" ref={sliderRef}>
                        <Quote size={48} className="quote-icon" />
                        <p className="testimonial-review">"{testimonials[currentIndex].review}"</p>
                        <div className="testimonial-author">
                            <div className="author-info">
                                <h4 className="author-name">{testimonials[currentIndex].name}</h4>
                            </div>
                        </div>
                    </div>

                    <button className="slider-btn next" onClick={nextSlide}><ChevronRight size={32} /></button>
                </div>

                <div className="slider-dots">
                    {testimonials.map((_, idx) => (
                        <span
                            key={idx}
                            className={`dot ${idx === currentIndex ? 'active' : ''}`}
                            onClick={() => {
                                if (idx !== currentIndex) {
                                    const dir = idx > currentIndex ? 50 : -50;
                                    gsap.to(sliderRef.current, {
                                        opacity: 0, x: -dir, duration: 0.3, onComplete: () => {
                                            setCurrentIndex(idx);
                                            gsap.fromTo(sliderRef.current, { opacity: 0, x: dir }, { opacity: 1, x: 0, duration: 0.4 });
                                        }
                                    });
                                }
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
