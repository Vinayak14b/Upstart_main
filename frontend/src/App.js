import Form from "./Form/Form";
import LandingPage from "./HomePage/Landing_Page";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Login/Login"
import AdminDashBoard from "./AdminDash/AdminDashboard";
import Progress from "./userDash/Progress"
import ApplyFunds from "./userDash/ApplyFunds"
import TrackFunds from "./userDash/TrackFunds"
import Forget from "./forgetpass/Forget"
import About from "./NavBar/About"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />

        <Route path="/apply" element={<Form />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<Forget/>} />

        <Route path="/adminDashboard" element={<AdminDashBoard />} />
        <Route path="/progress" element={<Progress/>} />
        <Route path="/applyFunds" element={<ApplyFunds />} />
        <Route path="/trackFunds" element={<TrackFunds />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
