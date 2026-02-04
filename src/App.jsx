
import "./assets/styles/Main.scss"
import './App.css'
import Home from "./assets/pages/Home"
import Navbar from "./assets/components/Navbar"
import Footer from "./assets/components/Footer"
import "./assets/styles/Main.scss"

function App() {

  return (
    <div className="app-wrapper">

    <Navbar />
    
    <div className="content">
      
    <Home />

    </div>

    <Footer />
     
    </div>
  )
}

export default App
