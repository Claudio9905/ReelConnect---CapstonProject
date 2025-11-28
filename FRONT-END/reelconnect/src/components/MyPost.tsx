import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { createNoSuccessPost, getAllMyPost } from "../redux/actions/actions";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import type BodyPostGet from "../types/BodyPostGet";
import Commento from "./Commento";
// import imagePost from "../assets/img/how-to-watch-the-lord-of-the-rings-in-chronological-order_3kwh.jpg";
import iconComment from "../assets/img/comment_icon_post.png";
import myCiakIcon from "../assets/img/MyCiak_icon.png";

const MyPost: React.FC = () => {
  const post = useSelector((state: RootState) => {
    return state.myPost.post as BodyPostGet[];
  });
  const [showCommenti, setShowCommenti] = useState(false);
  const [actualPostId, setActualPostId] = useState<string | null>(null);
  // const [showSettingsPost, setShowSettingsPost] = useState(false);
  // const myProfile = useSelector((state: RootState) => {
  //   return state.myProfile.myProfile as BodyUser;
  // });

  const postSuccess = useSelector((state: RootState) => {
    return state.postSettings.status;
  });

  const handleShowCommenti = () => {
    setShowCommenti(true);
  };
  const handleNoShowCommenti = () => {
    setShowCommenti(false);
  };

  const dispatch = useDispatch<AppDispatch>();
  console.log(post);

  useEffect(() => {
    dispatch(getAllMyPost());
    dispatch(createNoSuccessPost());
  }, [postSuccess]);

  return (
    <>
      {/* versione mobile */}
      <Container className="d-flex flex-column align-items-center mt-3">
        <Row className=" d-flex flex-column p-4 ">
          <h3 className="title-ciak">I miei Ciak</h3>
          {Array.isArray(post) &&
            post.map((post) => {
              return (
                <Col key={post.id} xs={12} className=" d-flex flex-column g-3 ">
                  <Card className="p-2" id="card-post">
                    <Card.Img
                      variant="top"
                      src={post.imageUrl}
                      className="img-fluid image-post"
                    />
                    <Card.Body>
                      <Card.Title className="d-flex align-items-center">
                        <img
                          src={post.utente.avatarUrl}
                          alt="icona-avatar-utente"
                          className="img-fluid icona-utente-post"
                        />
                        <h3 className="fs-6 ms-2">{post.utente.nome}</h3>
                      </Card.Title>
                      <Card.Text>{post.descrizione}</Card.Text>
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
                          onClick={() => {
                            setActualPostId(post.id);

                            handleShowCommenti();
                          }}
                        />
                        <span className="numero-commenti">N</span>
                        <Button
                          className="button-icon"
                          onClick={() => {
                            setShowSettingsPost(true);
                          }}
                        >
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
                        {/* {showSettingsPost && (
                      
                          <div className=" d-flex flex-column">
                            <a
                              onClick={() => {
                                dispatch(deleteMyPost(post.id));
                              }}
                              className="delete-commento"
                            >
                              Elimina commento
                            </a>
                            <Button
                              className="close-settings-button"
                              onClick={() => {
                                setShowSettingsPost(false);
                              }}
                            >
                              X
                            </Button>
                          </div>
                        )} */}
                      </div>
                      {showCommenti && actualPostId === post.id && (
                        <Commento
                          onClose={handleNoShowCommenti}
                          idPost={post.id}
                        />
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
      {/* versione tablet */}
      {/* versione desktop */}
    </>
  );
};

export default MyPost;
