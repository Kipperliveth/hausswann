import React, {useState} from 'react'
import { useGoogleReviews } from './useGoogleReviews'; // Import the hook
import heroImg from "../stock/varenda.webp"
import { CiBookmarkPlus } from "react-icons/ci";
import { 
  FaPlay, 
  FaBed, 
  FaBath, 
  FaCar, 
  FaUtensils, 
  FaTree, 
  FaPlus, 
  FaTimes,
  FaChevronLeft, FaChevronRight, FaRegImages, FaStar, FaGoogle, FaQuoteLeft, FaUserCircle, FaPenFancy, FaMinus, FaEnvelope,
FaMapMarkerAlt, FaPhoneAlt, FaDirections, FaWhatsapp
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { MdLiving } from "react-icons/md";  
import livingroom1 from "../stock/livingroom1.jpeg"
import livingroom2 from "../stock/livingroom2.jpeg"
import livingroom3 from "../stock/livingroom3.jpeg"
import master1 from "../stock/master1.jpeg"
import master2 from "../stock/master2.jpeg"
import kitchen2 from "../stock/kitchen2.jpeg"
import kitchen1 from "../stock/kitchen1.jpeg"
import exterior1 from "../stock/exterior1.webp"
import exterior2 from "../stock/exterior2.webp"
import exterior3 from "../stock/exterior3.webp"
import guest2 from "../stock/guest2.webp"
import guest3 from "../stock/guest3.webp"
import dining1 from "../stock/dining1.webp"
import room1 from "../stock/room1.jpeg"
import room2 from "../stock/room2.jpeg"

// Your Google Place ID (Used for the link even if API fails)
const PLACE_ID = "YOUR_PLACE_ID_HERE"; 
const REVIEW_LINK = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;


const galleryData = [
  { 
    id: 1, 
    category: 'Living Room', 
    title: 'Main Lounge', 
    // The first image is the cover
    images: [
      livingroom1, // Angle 1
      livingroom2, // Angle 2
      livingroom3,
      dining1
    ]
  },
  { 
    id: 2, 
    category: 'Bedroom', 
    title: 'Master Suite', 
    images: [
      master1,
      master2,
    ]
  },
  { 
    id: 3, 
    category: 'Kitchen', 
    title: 'Kitchen', 
    images: [
      kitchen2,
      kitchen1,
    ]
  },
  { 
    id: 4, 
    category: 'Exterior', 
    title: 'The Compound', 
    images: [
      exterior1,
      exterior2,
      exterior3,

    ]
  },
    { 
    id: 5, 
    category: 'Bedroom', 
    title: 'Second Bedroom', 
    images: [
      room1,
      room2,
    ]
  },
      { 
    id: 6, 
    category: 'Bedroom', 
    title: 'Guest Bedroom', 
    images: [
      guest2,
      guest3,
    ]
  },
];


const categories = ['All', 'Living Room', 'Bedroom', 'Kitchen', 'Exterior'];

const faqData = [
  {
    question: "Are pets or drugs allowed?",
    answer: "No. Pets are not allowed, and drugs are strictly prohibited at all times."
  },
  {
    question: "What is the check-out time?",
    answer: "Check-out time is 12:00 noon."
  },
  {
    question: "What is the minimum and maximum stay?",
    answer: "Guests are expected to book a minimum of 2 days and a maximum of 6 days. All bookings must end on a Thursday."
  },
  {
    question: "Is a caution (security) fee required?",
    answer: "Yes. A caution fee of 30% of the booking rate is required. This is refundable if no damage is recorded."
  },
  {
    question: "Are there extra charges for activities or amenities?",
    answer: "No. There are no separate fees for any activities or amenities available in the apartment."
  },
  {
    question: "Is electricity available 24/7?",
    answer: "Yes. The apartment has a steady power supply throughout your stay."
  },
  {
    question: "Is parking available?",
    answer: "Yes. Free parking is available within the premises."
  },
  {
    question: "Are parties or events allowed?",
    answer: "Events are only allowed if approved in advance. Loud or unapproved gatherings are not permitted."
  },
  {
    question: "Is the apartment secure?",
    answer: "Yes. The property is secure and monitored to ensure guest safety at all times."
  },
  {
    question: "What happens if there is damage to the property?",
    answer: "The cost of any damage will be deducted from the caution fee if necessary."
  }
];

//book now
const WHATSAPP_NUMBER = "23412345677890"; // Format: CountryCode + Number (No + or spaces)
const WHATSAPP_MESSAGE = "Hello, I am interested in booking a stay at Hausswann.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

function Home() {

const [activeFilter, setActiveFilter] = useState('All');
  // const [selectedImage, setSelectedImage] = useState(null);

  // Filter logic
  // const filteredImages = activeFilter === 'All' 
  //   ? galleryImages 
  //   : galleryImages.filter(img => img.category === activeFilter);

  // const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null); // Tracks the whole object
  const [currentSlide, setCurrentSlide] = useState(0); // Tracks index inside the object

  // Filter logic
  const filteredItems = activeFilter === 'All' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeFilter);

  // Open Modal
  const openLightbox = (item) => {
    setSelectedItem(item);
    setCurrentSlide(0); // Always start from first image
  };

  // Close Modal
  const closeLightbox = () => {
    setSelectedItem(null);
    setCurrentSlide(0);
  };

  // Next Slide Logic
  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => 
      prev === selectedItem.images.length - 1 ? 0 : prev + 1
    );
  };

  // Prev Slide Logic
  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => 
      prev === 0 ? selectedItem.images.length - 1 : prev - 1
    );
  };


  // Pull live data
  const { reviews, loading } = useGoogleReviews();

  // CALCULATE RATING (Or default to 5.0 for new branding)
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1) 
    : "5.0";

    const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className='home'>
      
    
      <section id='home' className="furnizen-hero">
      <div className="hero-container">
        
        {/* Top Section: Text & Image */}
        <div className="hero-main">
          <div className="hero-content">
            <h1>Experience the OASIS</h1>
            <p>
             Discover a sanctuary of refined living where modern elegance meets 
            unparalleled comfort. Whether for business or leisure, our curated 
            space offers a seamless retreat designed to elevate your stay.
            </p>
            <div className="hero-actions">
             <button 
            className="btn-primary" 
            onClick={() => window.open(WHATSAPP_URL, "_blank")}
          >
            Book Now <span><CiBookmarkPlus /></span>
          </button>

            <button
            className="btn-text"
            onClick={() => {
              document.getElementById("gallery")?.scrollIntoView({
                behavior: "smooth"
              });
            }}
          >
            Explore Gallery <span><FaPlay /></span>
          </button>

            </div>
          </div>
          
          <div className="hero-image">
            <img src={heroImg} alt="Hausswann Exterior" loading="eager"        // Load immediately
            fetchPriority="high"/>
          </div>
        </div>

        {/* Bottom Section: Features Grid */}
        <div className="hero-footer">
          

          <div className="feature-card double">
        <div className="feature-item">
          <span className="icon">⚡</span>
          <h4>24/7 Power Supply</h4>
          <p>Uninterrupted energy to keep your lifestyle running without a hitch.</p>
        </div>

        <div className="feature-item">
          <span className="icon">📱</span>
          <h4>Smart Facility</h4>
          <p>Integrated automation for a seamless, modern living experience.</p>
        </div>
      </div>

      <div className="feature-card double secondary">
        <div className="feature-item">
          <span className="icon">🍽️</span>
          <h4>Catering on Request</h4>
          <p>Gourmet dining experiences tailored to your taste and schedule.</p>
        </div>

        <div className="feature-item">
          <span className="icon">🛡️</span>
          <h4>CCTV Monitored</h4>
          <p>Advanced round-the-clock surveillance ensuring your total peace of mind.</p>
        </div>
      </div>

          <div className="cta-square">
            <span className="arrow">↗</span>
          </div>
        </div>

      </div>
    </section>

   <section id="amenities" className="amenities-section">
        <div className="container">
          
          {/* Header: Title & Video Button */}
          <div className="amenities-header">
            <h2>Everything you need <br /> for a perfect stay</h2>
            <div className="video-tour-btn">
              <div className="play-circle">
                <FaPlay />
              </div>
              <span>Video tour</span>
            </div>
          </div>

          {/* Navigation Pills (Quick Stats) */}
          <div className="amenities-pills">
            <button className="pill active">All Amenities</button>
            <button className="pill"><FaBed /> 3 Bedrooms</button>
            <button className="pill"><FaBath /> 4 Bathrooms</button>
            <button className="pill"><MdLiving /> Big Living Room</button>
            <button className="pill"><FaUtensils /> Equipped Kitchen</button>
            <button className="pill"><FaCar /> 8+ Car Parking</button>
            <button className="pill"><FaTree /> Outdoor Events</button>
            
          </div>

          {/* Main Content Grid */}
          <div className="amenities-content">
            
            {/* Left: Image */}
            <div className="content-image">
              {/* You can swap this for a specific amenities image if you have one */}
              <img src={heroImg} alt="Interior Amenities" loading="lazy"       // Only load when scrolled to
                decoding="async"/>
            </div>

            {/* Right: Text Details */}
            <div className="content-details">
              
              <div className="detail-block">
                <h3>Refined Living & Comfort</h3>
                <p>
                  Immerse yourself in an atmosphere of sophistication. From the 
                  spacious <strong>3 bedrooms</strong> and <strong>4 luxury bathrooms</strong> to 
                  the massive living area, every corner is designed for relaxation. 
                  Cook up a storm in the <strong>fully equipped kitchen</strong> tailored for culinary enthusiasts.
                </p>
              </div>

              <div className="divider"></div>

              <div className="detail-block">
                <h3>Grand Outdoors & Capacity</h3>
                <p>
                  Experience freedom with a sprawling compound capable of <strong>parking over 8 cars</strong>. 
                  The outdoor space is not just a driveway; it is perfectly suited for hosting  
                  <strong> outdoor events</strong>, giving you the versatility to entertain under the stars.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

   <section id="gallery" className="gallery-section">

      <div className="container">
        
        {/* Header & Filter (Same as before) */}
        <div className="gallery-header">
          <div className="text-content">
            <h2>Explore the Space</h2>
          </div>
          <div className="gallery-filters">
            {categories.map((cat) => (
              <button 
                key={cat} 
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* The Grid */}
        <div className="gallery-grid">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="gallery-item" 
              onClick={() => openLightbox(item)}
            >
              {/* Show the first image as the thumbnail */}
              <img src={item.images[0]} alt={item.title} 
              loading="lazy" 
              decoding="async"
              />
              
              {/* Badge showing number of photos */}
              {item.images.length > 1 && (
                <div className="multi-badge">
                  <FaRegImages /> {item.images.length}
                </div>
              )}

              <div className="overlay">
                <div className="icon-box">
                  <FaPlus />
                </div>
                <div className="info">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal with Slideshow */}
      {selectedItem && (
        <div className="lightbox" onClick={closeLightbox}>
          
          <button className="close-btn" onClick={closeLightbox}>
            <FaTimes />
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Previous Button (Only if multiple images) */}
            {selectedItem.images.length > 1 && (
              <button className="nav-btn prev" onClick={prevSlide}>
                <FaChevronLeft />
              </button>
            )}

            <div className="image-wrapper">
              <img 
                src={selectedItem.images[currentSlide]} 
                alt={`${selectedItem.title} view`} 
                className="slide-image"
              />
            </div>

            {/* Next Button (Only if multiple images) */}
            {selectedItem.images.length > 1 && (
              <button className="nav-btn next" onClick={nextSlide}>
                <FaChevronRight />
              </button>
            )}

            <div className="lightbox-details">
              <h3>{selectedItem.title}</h3>
              <p>
                {selectedItem.category} • 
                <span className="counter"> Image {currentSlide + 1} of {selectedItem.images.length}</span>
              </p>
            </div>

          </div>
        </div>
      )}

    </section>

  <section id="reviews" className="reviews-section">

      <div className="container">
        
        {/* Header */}
        <div className="reviews-header">
          <div className="header-text">
            <h4>Guest Stories</h4>
            <h2>Loved by Travelers</h2>
          </div>
          
          <div className="rating-summary">
            <div className="score">{averageRating}</div>
            <div className="stars">
              <div className="star-row">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <span>
                {reviews.length > 0 
                  ? `Based on ${reviews.length} Google reviews` 
                  : "Ready for your 5-star experience"}
              </span>
            </div>
          </div>
        </div>

        {/* CONTENT SWITCHER */}
        
        {loading ? (
           <div className="loading-state">Loading reviews...</div>
        ) : reviews.length === 0 ? (
          
          /* --- STATE A: NO REVIEWS YET (Show this until you get reviews) --- */
          <div className="empty-state-card">
            <div className="content">
              <div className="icon-badge"><FaPenFancy /></div>
              <h3>Be Our First Guest Review</h3>
              <p>
                We are open and ready to host you. Experience the Oasis, 
                share your story, and help future travelers find their perfect stay.
              </p>
              <a href={REVIEW_LINK} target="_blank" rel="noreferrer" className="cta-btn">
                Write a Review <FaGoogle />
              </a>
            </div>
          </div>

        ) : (

          /* --- STATE B: LIVE REVIEWS (Slider) --- */
          <div className="reviews-scroller">
            
            {/* Map the Live Google Data */}
            {reviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="card-top">
                  <div className="user-info">
                    {review.profile_photo_url ? (
                      <img src={review.profile_photo_url} alt={review.author_name} className="avatar" />
                    ) : (
                      <FaUserCircle className="avatar-placeholder" />
                    )}
                    <div>
                      <h5>{review.author_name}</h5>
                      <span className="date">{review.relative_time_description}</span>
                    </div>
                  </div>
                  <div className="card-rating">
                    {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                </div>
                
                <div className="card-body">
                  <FaQuoteLeft className="quote-icon" />
                  {/* Truncate long reviews */}
                  <p>
                    {review.text.length > 150 
                      ? `${review.text.substring(0, 150)}...` 
                      : review.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Always keep the CTA at the end of the slider */}
            <div className="review-card cta-card">
              <div className="cta-content">
                <div className="icon-wrapper"><FcGoogle /></div>
                <h3>Enjoyed your stay?</h3>
                <p>Help us grow by sharing your experience.</p>
                <a href={REVIEW_LINK} target="_blank" rel="noreferrer" className="google-btn">
                  Write a Review <FaGoogle />
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>

  <section id="faqs" className="faq-section">

      <div className="container">
        <div className="faq-layout">
          
          {/* LEFT COLUMN: Header & Contact */}
          <div className="faq-header">
            <span className="badge">House Rules & FAQ</span>
            <h2>Frequently Asked <br /> Questions</h2>
            <p>
              Everything you need to know about your stay at The Oasis. 
              If you have any other questions, please email us.
            </p>
            <button className="contact-btn">
              Contact us <FaEnvelope />
            </button>
          </div>

          {/* RIGHT COLUMN: Accordion List */}
          <div className="faq-list">
            {faqData.map((item, index) => (
              <div 
                key={index} 
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <span className="icon">
                    {activeIndex === index ? <FaMinus /> : <FaPlus />}
                  </span>
                  <h4>{item.question}</h4>
                </div>
                
                <div 
                  className="faq-answer"
                  style={{ 
                    maxHeight: activeIndex === index ? '200px' : '0px',
                    opacity: activeIndex === index ? 1 : 0
                  }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
    
 <section id='location' className="contact-split">
      <div className="container">
        
        {/* COLUMN 1: The Intro */}
        <div className="col-left">
          <div className="header-group">
            {/* <span className="subtitle">Location</span> */}
            <h2>Where to <br /> find us</h2>
            {/* <div className="divider"></div> */}
          </div>
          <p className="description">
            Nestled in the heart of Victoria Island, The Oasis offers a private 
            escape just minutes from the city's finest dining and business hubs.
          </p>
        </div>

        {/* COLUMN 2: The Map (Visual Center) */}
        <div className="col-center">
          <div className="map-frame">
            <iframe 
              title="Hausswann Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.375449681109!2d6.91315647349438!3d4.876620140110489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069db59a9dc3d1f%3A0x3c6a131fe01d5ddc!2sHausswann!5e0!3m2!1sen!2sng!4v1770196026973!5m2!1sen!2sng"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* COLUMN 3: Details & Action */}
        <div className="col-right">
          <div className="info-group">
            <h3>Address</h3>
            <p>
              Beside Habitat Drive Junction, <br />
              Port Harcourt, Rivers State.
            </p>
          </div>

          <div className="info-group">
            <h3>Contact</h3>
            <p className="contact-link"><FaPhoneAlt /> +234 123 4567 7890</p>
            <p className="contact-link"><FaEnvelope /> hausswann@gmail.com</p>
          </div>

       <a
        href="https://maps.app.goo.gl/zFhGtExC81tTx6Sw9"
        target="_blank"
        rel="noopener noreferrer"
        className="cta-btn"
      >
        Get Directions <FaDirections />
      </a>

        </div>

      </div>
    </section>

      <a 
        href={WHATSAPP_URL} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="minimal-book-btn"
      >
        <CiBookmarkPlus className="btn-icon" />
      </a>
      
    </div>
  )
}

export default Home
