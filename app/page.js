import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Carousel from './components/Carousel';
import Features from './components/Features';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Features />
      <Carousel />
      <Contact />
      
      <footer style={{ 
        padding: '40px 0', 
        borderTop: '1px solid rgba(255,255,255,0.07)', 
        background: 'rgba(0,0,0,0.2)',
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 var(--section-px)' }}>
          <p style={{ color: '#71717a' }}>© {new Date().getFullYear()} Nextrack. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
