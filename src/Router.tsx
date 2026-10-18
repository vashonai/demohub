import { Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import App from "./App";
import ProjectPage from "./pages/ProjectPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/work" element={<App />} />
      <Route path="/showcase" element={<App />} />
      <Route path="/projects" element={<App />} />
      <Route path="/project/new" element={<ProjectPage />} />
      <Route path="/project/:id/edit" element={<ProjectPage />} />
    </Routes>
  );
}
