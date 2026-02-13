import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Portfolio } from './pages/Portfolio';
import { Order } from './pages/Order';

function App() {
  const preventCopy = (e: React.ClipboardEvent | React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <Router>
      <div
        className="min-h-screen bg-black"
        onCopy={preventCopy}
        onCut={preventCopy}
        onContextMenu={preventCopy}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
