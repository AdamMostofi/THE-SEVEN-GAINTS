// Frontend/src/App.jsx

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Navbar from './components/ui/navigation-menu.jsx'
import Home from './Pages/Home.jsx'

function App() {


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
