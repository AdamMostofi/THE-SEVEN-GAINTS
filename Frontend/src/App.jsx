// Frontend/src/App.jsx
// ... imports
import MountainPage from './Pages/MountainPage.jsx' // Need to create this
import Recommended from './Pages/Recommended.jsx' // Need to create this
import Contact from './Pages/Contact.jsx' // Need to create this
import About from './Pages/About.jsx' // Need to create this

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
        </Routes>
      </Router>
    </>
  )
}

export default App