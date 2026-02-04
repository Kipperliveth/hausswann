import React, { useState, useEffect } from 'react'
import logo from "../stock/5.png"
// If you don't have react-icons, you can use SVGs directly (I used SVGs below so it works immediately)

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //book now
const WHATSAPP_NUMBER = "23412345677890"; // Format: CountryCode + Number (No + or spaces)
const WHATSAPP_MESSAGE = "Hello, I am interested in booking a stay at Hausswann.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <div className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
            <div className="navigation">

              {/* 1. Logo */}
            <div 
            className="logo-container"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ cursor: "pointer" }}
          >
            <img src={logo} alt="hausswann" />
          </div>


              {/* 2. Hamburger Icon (Visible only on mobile) */}
              <div className="hamburger" onClick={toggleMenu}>
                 {/* Simple SVG for Menu Bars / Close X */}
                 {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#1f2937" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                 ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#1f2937" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
                 )}
              </div>

              {/* 3. The Menu Elements (Grouped for mobile toggling) */}
              <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
                  <div className="navigation-links">
                 <a href="#amenities" onClick={() => setIsOpen(false)}>Amenities</a>
                <a href="#gallery" onClick={() => setIsOpen(false)}>Gallery</a>
                <a href="#reviews" onClick={() => setIsOpen(false)}>Reviews</a>
                <a href="#faqs" onClick={() => setIsOpen(false)}>Faqs</a>
                <a href="#location" onClick={() => setIsOpen(false)}>Location</a>

                  </div>

                  <div className="navigation-cta">
                 <button 
              onClick={() => window.open(WHATSAPP_URL, "_blank")}
            >
              Book Now
            </button>

                  </div>
              </div>

            </div>
        </div>
    </div>
  )
}

export default Navbar