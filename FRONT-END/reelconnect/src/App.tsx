import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Intro from "./components/Intro";
import MyNavbar from "./components/MyNavbar";

const App: React.FC = () => {
  return (
    <>
      <MyNavbar />
      <Intro />
    </>
  );
};

export default App;
