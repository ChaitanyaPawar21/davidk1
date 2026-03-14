import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, Instagram as InstaIcon, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: 'Car Shoot',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    useEffect(() => {
        gsap.fromTo(sectionRef.current,
            { opacity: 0, scale: 0.95 },
            {
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            }
        );
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // Calls your backend — API key stays safe on the server
            const response = await fetch('http://localhost:3001/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Something went wrong');
            }

            setStatus('success');
            setFormData({ name: '', email: '', service: 'Car Shoot', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Submit error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="contact-section section-padding" ref={sectionRef}>
            <video
                autoPlay
                loop
                muted
                playsInline
                className="contact-bg-video"
            >
                <source src="https://ik.imagekit.io/ht1e6kqd8/400x-2.mp4" type="video/mp4" />
            </video>
            <div className="contact-overlay"></div>

            <div className="container contact-container">
                <div className="contact-info">
                    <h2 className="section-title text-gradient">Let's Create<br />Something Epic.</h2>
                    <p className="contact-desc">Ready to book a cinematic shoot? Reach out and let's discuss your vision.</p>

                    <div className="info-list">
                        <div className="info-item">
                            <Phone className="info-icon" />
                            <span>+91 8010612114</span>
                        </div>
                        <div className="info-item">
                            <Mail className="info-icon" />
                            <span>davidkhanworks@gmail.com</span>
                        </div>
                        <div className="info-item">
                            <InstaIcon className="info-icon" />
                            <span>editz.by.david</span>
                        </div>
                        <div className="info-item">
                            <MapPin className="info-icon" />
                            <span>Chhatrapati Sambhajinagar(MH20), Maharashtra, India</span>
                        </div>
                    </div>
                </div>

                <div className="contact-form-wrapper">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Your Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Service Type</label>
                            <select name="service" value={formData.service} onChange={handleChange}>
                                <option>Car Shoot</option>
                                <option>Bike Shoot</option>
                                <option>Graphic Designing</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Tell me about your car/bike and vision..."
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className={`btn-primary submit-btn ${status !== 'idle' ? 'loading' : ''}`}
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? (
                                <><Loader2 className="animate-spin mr-2" /> Sending...</>
                            ) : status === 'success' ? (
                                <><CheckCircle2 className="mr-2" /> Inquiry Sent!</>
                            ) : status === 'error' ? (
                                "Error! Try Again"
                            ) : (
                                <><Send size={18} className="mr-2" /> Send Inquiry</>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <footer className="footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} editz.by.david/</p>
                </div>
            </footer>
        </section>
    );
};

export default Contact;