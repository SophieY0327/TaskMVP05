import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SchoolDetail from './pages/SchoolDetail';
import Notes from './pages/Notes';

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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
