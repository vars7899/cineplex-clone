import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import PageNotFound from "./pages/PageNotFound";
import TicketsPage from "./pages/TicketsPage";
import SeatsPage from "./pages/SeatsPage";
import PaymentPage from "./pages/PaymentPage";
import TheatrePage from "./pages/TheatrePage";
import MoviePage from "./pages/MoviePage";
import DashBoard from "./pages/DashBoard";
import CreateMovie from "./pages/CreateMovie";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/seats" element={<SeatsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/theaters" element={<TheatrePage />} />
        <Route path="/movies" element={<MoviePage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/create" element={<CreateMovie />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
