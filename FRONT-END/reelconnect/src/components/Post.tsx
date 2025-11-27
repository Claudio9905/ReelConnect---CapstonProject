import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { getAllPost } from "../redux/actions/actions";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import type BodyPostGet from "../types/BodyPostGet";
import Commento from "./Commento";
import imagePost from "../assets/img/how-to-watch-the-lord-of-the-rings-in-chronological-order_3kwh.jpg";
import iconComment from "../assets/img/comment_icon_post.png";
import myCiakIcon from "../assets/img/MyCiak_icon.png";

const Post: React.FC = () => {
  const post = useSelector((state: RootState) => {
    return state.allPost.post as BodyPostGet[];
  });

  const [showCommenti, setShowCommenti] = useState(false);

  const handleShowCommenti = () => {
    setShowCommenti(true);
  };
  const handleNoShowCommenti = () => {
    setShowCommenti(false);
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  return (
    <>
      {/* versione mobile */}
      <Container
        id="container-my-profile"
        className="d-flex flex-column align-items-center mt-3"
      >
        <Row className=" d-flex flex-column p-1 ">
          {/* {Array.isArray(post) &&
            post.map((post, i) => {
              return ( */}
          <Col xs={12} className=" d-flex flex-column ">
            <Card className="p-2" id="card-post">
              <Card.Img
                variant="top"
                src={imagePost}
                className="img-fluid image-post"
              />
              <Card.Body>
                <Card.Title className="d-flex align-items-center">
                  <img
                    src=""
                    alt="icona-avatar-utente"
                    className="img-fluid icona-utente-post"
                  />
                  <h3 className="fs-6 ms-2">Nome utente</h3>
                </Card.Title>
                <Card.Text>descrizione post</Card.Text>
                <div className="d-flex justify-content-around align-items-center ">
                  <img
                    src={myCiakIcon}
                    alt="icona-myCiak"
                    className="img-fluid icona-myCiak"
                  />
                  <span className="numero-myCiak">N</span>
                  <img
                    src={iconComment}
                    alt="icona-commento"
                    className="img-fluid icona-commento-post"
                    onClick={handleShowCommenti}
                  />
                  <span className="numero-commenti">N</span>
                  <Button className="button-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-three-dots"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                    </svg>
                  </Button>
                </div>
                {showCommenti && <Commento onClose={handleNoShowCommenti} />}
              </Card.Body>
            </Card>
          </Col>
          {/* ); */}
          {/* })} */}
        </Row>
      </Container>
      {/* versione tablet */}
      {/* versione desktop */}
    </>
  );
};

export default Post;
