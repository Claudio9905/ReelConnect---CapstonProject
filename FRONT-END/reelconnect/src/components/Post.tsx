import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useEffect } from "react";
import { getAllPost } from "../redux/actions/actions";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import type BodyPostGet from "../types/BodyPostGet";

const Post: React.FC = () => {
  const post = useSelector((state: RootState) => {
    return state.allPost.post as BodyPostGet[];
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  return (
    <>
      {/* versione mobile */}
      <Container>
        <Row>
          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* versione tablet */}
      {/* versione desktop */}
    </>
  );
};

export default Post;
