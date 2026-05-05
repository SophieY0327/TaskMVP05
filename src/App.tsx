import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SchoolDetail from './pages/SchoolDetail';
import Notes from './pages/Notes';
import Encyclopedia from './pages/Encyclopedia';
import About from './pages/About';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans selection:bg-trust-blue/20">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/school/:id" element={<SchoolDetail />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/encyclopedia" element={<Encyclopedia />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
