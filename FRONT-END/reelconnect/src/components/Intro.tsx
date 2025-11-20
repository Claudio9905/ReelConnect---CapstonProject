import { Col, Container, Row } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";

const Intro: React.FC = () => {
  return (
    <>
      {/* Versione mobile */}
      <Container className="d-sm-flex d-md-none d-lg-none">
        <Row id="row-1" className=" g-4">
          <Col xs={12} className="col-1">
            <div className="div-titolo-home">
              <h1 id="titolo-home">
                Benvenuto <br />
                su ReelConnect
              </h1>
            </div>
            <div className="mt-5">
              <p className="sinossi">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                libero unde quisquam repellendus corporis aspernatur impedit,
                inventore corrupti laborum, commodi officia odit vero ut itaque
                dicta laudantium tempora sapiente obcaecati!
              </p>
            </div>
          </Col>
          <Col xs={12} className="col-2">
            <Login />
          </Col>
          <span className="divided-span"></span>
          <Col xs={12} className="col-3">
            <h3 className="h3-register mt-2 mb-4">
              Non sei ancora connesso al Cineverse ? <br /> Cosa aspetti,
              registrati!
            </h3>
            <Register />
          </Col>
        </Row>
        <Row id="row-2">
          <Col xs={12} className="col-4"></Col>
        </Row>
      </Container>
      {/* Versione Tablet */}
      <Container className="d-none d-md-flex d-lg-none">
        <Row id="row-1" className=" g-4">
          <Col md={12} className=" col-1">
            <div className="div-titolo-home">
              <h1 id="titolo-home">
                Benvenuto <br />
                su ReelConnect
              </h1>
            </div>
            <div className="mt-5">
              <p className="sinossi">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                libero unde quisquam repellendus corporis aspernatur impedit,
                inventore corrupti laborum, commodi officia odit vero ut itaque
                dicta laudantium tempora sapiente obcaecati!
              </p>
            </div>
          </Col>
          <Col md={12} className="col-2">
            <Login />
          </Col>
          <span className="divided-span"></span>
          <Col md={12} className="col-3">
            <h3 className="h3-register mt-2 mb-4">
              Non sei ancora connesso al Cineverse ? <br /> Cosa aspetti,
              registrati!
            </h3>
            <Register />
          </Col>
        </Row>
        <Row id="row-3">
          <Col md={12} className="col-4"></Col>
        </Row>
      </Container>

      {/* Versione desktop */}
      <Container className="d-none d-lg-flex flex-column">
        <Row id="row-1" className=" g-4">
          <Col lg={12} className="col-1">
            <div className="div-titolo-home">
              <h1 id="titolo-home">
                Benvenuto <br />
                su ReelConnect
              </h1>
            </div>
            <div className="mt-5">
              <p className="sinossi">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                libero unde quisquam repellendus corporis aspernatur impedit,
                inventore corrupti laborum, commodi officia odit vero ut itaque
                dicta laudantium tempora sapiente obcaecati!
              </p>
            </div>
          </Col>
        </Row>
        <Row
          id="row-2"
          className="d-flex justify-content-center align-items-center mt-2"
        >
          <Col lg={6} className="col-2-lg">
            <Login />
          </Col>
          <Col lg={6} className="col-3-lg">
            <h3 className="h3-register mt-2 mb-4">
              Non sei ancora connesso al Cineverse ? <br /> Cosa aspetti,
              registrati!
            </h3>
            <Register />
          </Col>
        </Row>
        <Row id="row-3">
          <Col lg={12} className="col-4"></Col>
        </Row>
      </Container>
    </>
  );
};

export default Intro;
