import "./App.css";
import Intro from "./components/Intro";
import MyNavbar from "./components/MyNavbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Cineverse from "./components/Cineverse";
import Footer from "./components/Footer";
import MyProfile from "./components/MyProfile";
import NavSettings from "./components/NavSettings";
import ServiceLogin from "./components/ServiceLogin";
import Service from "./components/Service";
import MyCatologoFilmSerieTv from "./components/MyCatalogoFilmSerieTV";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Intro />}></Route>
          <Route path="/servicelogin" element={<ServiceLogin />}></Route>
          <Route path="/service" element={<Service />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/myprofile" element={<MyProfile />}></Route>
          <Route path="/cineverse" element={<Cineverse />}></Route>
          <Route path="/mycatalogo" element={<MyCatologoFilmSerieTv />}></Route>
        </Routes>
        <NavSettings />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
