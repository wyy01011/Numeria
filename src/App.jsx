import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Game from "./pages/game";
import Dashboard from "./pages/dashboard";
import "./styles/home.css";
import Level from './pages/level';
import Reward from './pages/reward';
import Avatar from './pages/avatar';
import Question from './pages/question';
import Trans2 from './pages/trans2';
import Trans3 from './pages/trans3';


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
        <Route path="/transition2" element={<Trans2 />} />
        <Route path="/transition3" element={<Trans3 />} />
      </Routes>
    </Router>
  );
}

export default App;
