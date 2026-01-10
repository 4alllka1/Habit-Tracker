import NavBar from "./components/NavBar";
import General from "./Pages/General";
import Login from "./Pages/Login";
import Habits from "./Pages/Habits";
import Health from "./Pages/Health";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<General />} />
            <Route path="/login" element={<Login />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/health" element={<Health />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
