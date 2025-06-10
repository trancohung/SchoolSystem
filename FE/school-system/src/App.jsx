import Layout from "./layout/Layout.";
import Home from "./pages/Home";
import Teacher from "./pages/Teacher";
import "./style/App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="teacher" element={<Teacher />} />
      </Route>
    </Routes>
  );
}

export default App;
