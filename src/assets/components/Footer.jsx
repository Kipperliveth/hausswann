import React from 'react'
import logo from "../stock/logofooter.svg"

function Footer({ onContactClick }) {
  

  return (
    <div className='footer'>

        <div className="footer-container">

            <div className="footer-top">

                <div className="left">
                  <img src={logo} alt="hausswann" className="logo" />
                </div>

                <div className="right">

                    <div className="footer-navigation">
                        <h2>Navigation</h2>
                        <a href="#amenities">About us</a>
                        <a href="#location">Location</a>
                        <a href="#faqs">Faqs</a>
                        <a href="#reviews">Reviews</a>
                     <a 
                      href="#faqs" 
                      onClick={() => onContactClick()} // Removed the (e)
                    >
                      Contact us
                    </a>
                    </div>

                       <div className="footer-navigation">
                        <h2>Social Media</h2>
                        <a href="https://www.instagram.com/hausswann?igsh=MTJnczc5ZzBuMjRnNg==" target="_blank">Instagram</a>
                        <a href="https://www.tiktok.com/@hausswann?_r=1&_t=ZS-93dWkzlZqEf" target="_blank">Tiktok</a>
                        <a href="">Facebook</a>
                    </div>

                </div>

            </div>

            <div className="footer-bottom">
            <div className="left">
              © {new Date().getFullYear()} Hausswann
            </div>


              <div className="right">
                <p title='legal'>House rules  |  Refund Policy  |  Terms & Conditions</p>
              </div>

            </div>
            
        </div>

    </div>
  )
}

export default Footer
