import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './Header';
import HomePage from "./HomePage";
import VideoPage from "./VideoPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:videoId" element={<VideoPage />} />
      </Routes>
    </Router>
  );
}

export default App;

