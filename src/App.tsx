import { Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import TeamList from "./pages/TeamList";
import TeamDetails from "./pages/TeamDetails";
import PlayersPage from "./pages/PlayersPage";
import MatchesPage from "./pages/MatchesPage";
import "./index.css";

function App() {
  return (
    <>
      {/* Üstte sabit navbar */}
      <Menu />

      {/* Sayfa içerikleri */}
      <Routes>
        <Route path="/" element={<TeamList />} />
        <Route path="/team/:id" element={<TeamDetails />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path="/matches" element={<MatchesPage />} />
      </Routes>

      {/* Altta footer (yoksa bu satırı silebilirsin) */}
      <Footer />
    </>
  );
}

export default App;
