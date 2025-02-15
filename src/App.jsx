import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/game";
import Dashboard from "./pages/dashboard";
import "./styles/home.css";
import LevelSelection from './pages/level';
import Reward from './pages/reward';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/level" element={<LevelSelection />} />
        <Route path="/reward" element={<Reward />} />
      </Routes>
    </Router>
  );
}

export default App;
