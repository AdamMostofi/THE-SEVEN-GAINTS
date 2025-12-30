import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MountainPage from './Pages/MountainPage.jsx' 
import Recommended from './Pages/Recommended.jsx' 
import Contact from './Pages/Contact.jsx' 
import About from './Pages/About.jsx' 
import Home from './Pages/Home.jsx'
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Navbar from './components/ui/navigation-menu.jsx'
import Footer from './components/footer.jsx'


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* Dynamic route using the Mountain ID */}
          <Route path="/mountains/:mountainId" element={<MountainPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App