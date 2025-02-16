import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/game";
import Dashboard from "./pages/dashboard";
import "./styles/home.css";
import Level from './pages/level';
import Reward from './pages/reward';
import Avatar from './pages/avatar';
import Question from './pages/question';
import ReadySet from './pages/readySet';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/level" element={<Level />} />
        <Route path="/reward" element={<Reward />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/question" element={<Question />} />
        <Route path="/readySet" element={<ReadySet />} />
      </Routes>
    </Router>
  );
}

export default App;
