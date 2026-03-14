import React, { useState } from 'react';
import gsap from 'gsap';
import './App.css';

// Components
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import FeaturedEdits from './components/FeaturedEdits';
import Rates from './components/Rates';
import Testimonials from './components/Testimonials';
import Instagram from './components/Instagram';
import Contact from './components/Contact';

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="app-container">
      {!loadingComplete && <LoadingScreen onComplete={() => setLoadingComplete(true)} />}

      <Navbar />

      <main>
        <Hero />
        <Portfolio />
        <FeaturedEdits />
        <Rates />
        <Testimonials />
        <Instagram />
        <Contact />
      </main>
    </div>
  );
}

export default App;
