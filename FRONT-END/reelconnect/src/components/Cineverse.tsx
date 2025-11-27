import { Col, Container, Row } from "react-bootstrap";

import Post from "./Post";

const Cineverse: React.FC = () => {
  return (
    <>
      <Container className="d-flex flex-column align-items-center mt-3">
        <Row>
          <Col xs={12}>
            <Post />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cineverse;
