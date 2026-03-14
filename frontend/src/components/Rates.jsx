import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Video, Film, Scissors } from 'lucide-react';
import './Rates.css';

gsap.registerPlugin(ScrollTrigger);

const services = [
    { id: 1, title: 'Car Shoot', price: '₹1000/hour', desc: 'Shoot + editing: ₹5000', icon: <Camera size={32} /> },
    { id: 2, title: 'Bike Shoot', price: '₹1200/hour', desc: 'Shoot + editing: ₹5000', icon: <Video size={32} /> },
    { id: 3, title: 'Graphic designing', price: 'Custom', desc: 'Menus: ₹2000/menu,Poster: ₹1500, Design: ₹1500', icon: <Film size={32} /> },
    { id: 4, title: 'Any other niche', price: '₹1500', desc: 'Shoot + edit: ₹2000/p Photoshoot: ₹1500 p/hr', icon: <Scissors size={32} /> },
];

const Rates = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        gsap.fromTo(cardsRef.current,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                }
            }
        );
    }, []);

    return (
        <section id="rates" className="rates-section section-padding" ref={sectionRef}>
            <div className="container">
                <h2 className="section-title text-gradient" style={{ textAlign: 'center', marginBottom: '4rem' }}>Pricing & Services</h2>

                <div className="rates-grid">
                    {services.map((svc, index) => (
                        <div
                            className="rate-card"
                            key={svc.id}
                            ref={el => cardsRef.current[index] = el}
                        >
                            <div className="rate-icon">{svc.icon}</div>
                            <h3 className="rate-title">{svc.title}</h3>
                            <div className="rate-price">{svc.price}</div>
                            <p className="rate-desc">{svc.desc}</p>
                            <a href="#contact" className="rate-btn">Book Now</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rates;
