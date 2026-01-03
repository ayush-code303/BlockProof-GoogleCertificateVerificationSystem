import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Page Components
import Home from './pages/Home';
import About from './pages/About';
import Verify from './pages/Verify';
import Admin from './pages/Admin';
import Result from './pages/Result';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-black">
        {/* Header sabhi pages par dikhega */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>

        {/* Footer sabhi pages par dikhega */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;