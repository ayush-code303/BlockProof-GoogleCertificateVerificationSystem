import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Verify from './pages/Verify';
import Admin from './pages/Admin';
import Result from './pages/Result';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-hacker-base flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;