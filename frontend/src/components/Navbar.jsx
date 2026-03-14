import React, { useState, useEffect } from 'react';
import { Instagram, Menu, X } from 'lucide-react';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Rates', href: '#rates' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Contact', href: '#contact' }
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container container">
                <a href="#home" className="navbar-logo-link">
                    <Logo size="medium" />
                </a>

                {/* Desktop Nav */}
                <div className="navbar-links">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="nav-link">
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="navbar-actions">
                    <a href="https://www.instagram.com/editz.by.david/" target="_blank" rel="noreferrer" className="social-icon">
                        <Instagram size={20} />
                    </a>
                    <a href="#contact" className="btn-cta">Book a Shoot</a>

                    <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-links">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="mobile-nav-link"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a href="#contact" className="btn-cta mobile-cta">Book a Shoot</a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
