import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookingPage from "./components/BookingPage";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
