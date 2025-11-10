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
              />
            </Link>
          </div>
          <div className="d-flex justify-content-around gap-2 fs-5">
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
