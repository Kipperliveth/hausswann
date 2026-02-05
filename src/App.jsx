import { useState } from "react"
import "./assets/styles/Main.scss"
import './App.css'
import Home from "./assets/pages/Home"
import Navbar from "./assets/components/Navbar"
import Footer from "./assets/components/Footer"
import "./assets/styles/Main.scss"

function App() {

  const [contactOpen, setContactOpen] = useState(false);

  const handleContactClick = () => {
    setContactOpen(true);
    // Scroll to the FAQ section
    const faqSection = document.getElementById('faqs');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-wrapper">

    <Navbar />
    
    <div className="content">

  <Home isOpen={contactOpen} setIsOpen={setContactOpen} />

    </div>

    <Footer onContactClick={handleContactClick} />
     
    </div>
  )
}

export default App
