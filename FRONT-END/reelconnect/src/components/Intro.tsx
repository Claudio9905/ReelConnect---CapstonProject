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
            <div>
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
          <Col xs={12} className="col-3">
            <h3 className="h3-register">
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
    </>
  );
};

export default Intro;
