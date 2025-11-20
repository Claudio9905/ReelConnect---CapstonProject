import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { Link, useLocation } from "react-router-dom";
import clapperboard from "../assets/img/Cinematic_clapperboa.png";

const MyNavbar: React.FC = () => {
  const location = useLocation();
  // const navigate = useNavigate();

  return (
    <>
      {/* Navbar versione mobile */}
      <Navbar className=" d-sm-flex d-md-none d-lg-none ">
        <Container className=" d-flex flex-column justify-content-center gap-2 container-nav">
          <div className="div-logo d-flex">
            <Link to={"/"}>
              <img
                src={clapperboard}
                alt="logo del sito"
                className="img-fluid"
                id="img-logo-sm"
              />
            </Link>
          </div>
          <div className="d-flex justify-content-around gap-2 fs-6 div-link">
            <Link
              to={"/"}
              className={` text-decoration-none d-flex justify-content-around link  ${
                location.pathname === "/" ? "current-link" : "current-link-off"
              }`}
            >
              Home
            </Link>
            <span style={{ color: `bisque` }}>/</span>
            <Link
              to={"/service"}
              className={` text-decoration-none d-flex justify-content-around link ${
                location.pathname === "/service"
                  ? "current-link"
                  : "current-link-off"
              }`}
            >
              Service
            </Link>
            <span style={{ color: `bisque` }}>/</span>
            <Link
              to={"/contact"}
              className={` text-decoration-none d-flex justify-content-around link  ${
                location.pathname === "/contact"
                  ? "current-link"
                  : "current-link-off"
              }`}
            >
              Contact
            </Link>
          </div>
        </Container>
      </Navbar>

      {/* Versione tablet */}
      <Navbar className=" d-none d-md-flex d-lg-none ">
        <Container className=" d-flex  justify-content-center gap-2 container-nav-md">
          <div className="div-logo-md d-flex">
            <Link to={"/"}>
              <img
                src={clapperboard}
                alt="logo del sito"
                className="img-fluid"
                id="img-logo-md"
              />
            </Link>
          </div>
          <div className="d-flex justify-content-around gap-3 fs-5 div-link-md">
            <Link
              to={"/"}
              className={` text-decoration-none d-flex justify-content-around link  ${
                location.pathname === "/" ? "current-link" : "current-link-off"
              }`}
            >
              Home
            </Link>
            <span style={{ color: `bisque` }}>/</span>
            <Link
              to={"/service"}
              className={` text-decoration-none d-flex justify-content-around link ${
                location.pathname === "/service"
                  ? "current-link"
                  : "current-link-off"
              }`}
            >
              Service
            </Link>
            <span style={{ color: `bisque` }}>/</span>
            <Link
              to={"/contact"}
              className={` text-decoration-none d-flex justify-content-around link  ${
                location.pathname === "/contact"
                  ? "current-link"
                  : "current-link-off"
              }`}
            >
              Contact
            </Link>
          </div>
        </Container>
      </Navbar>

      {/* Versione desktop */}
      <Navbar className=" d-none d-lg-flex ">
        <Container className=" d-flex  justify-content-center gap-2 container-nav-lg">
          <div className="div-logo-lg d-flex">
            <Link to={"/"}>
              <img
                src={clapperboard}
                alt="logo del sito"
                className="img-fluid"
                id="img-logo-lg"
              />
            </Link>
          </div>
          <div className="d-flex justify-content-around gap-3 fs-6 div-link-lg">
            <Link
              to={"/"}
              className={` text-decoration-none d-flex justify-content-around link  ${
                location.pathname === "/" ? "current-link" : "current-link-off"
              }`}
            >
              Home
            </Link>
            <span style={{ color: `bisque` }}>/</span>
            <Link
              to={"/service"}
              className={` text-decoration-none d-flex justify-content-around link ${
                location.pathname === "/service"
                  ? "current-link"
                  : "current-link-off"
              }`}
            >
              Service
            </Link>
            <span style={{ color: `bisque` }}>/</span>
            <Link
              to={"/contact"}
              className={` text-decoration-none d-flex justify-content-around link  ${
                location.pathname === "/contact"
                  ? "current-link"
                  : "current-link-off"
              }`}
            >
              Contact
            </Link>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
