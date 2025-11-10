import "./App.css";
import Intro from "./components/Intro";
import MyNavbar from "./components/MyNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Service from "./components/Service";
import Contact from "./components/Contact";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Intro />}></Route>
          <Route path="/service" element={<Service />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
