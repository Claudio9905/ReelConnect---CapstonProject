import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useState } from "react";
import { deleteMyPost } from "../redux/actions/actions";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import type BodyPostGet from "../types/BodyPostGet";
import Commento from "./Commento";
// import imagePost from "../assets/img/how-to-watch-the-lord-of-the-rings-in-chronological-order_3kwh.jpg";
import iconComment from "../assets/img/comment_icon_post.png";
import myCiakIcon from "../assets/img/MyCiak_icon.png";
import ModaleEditPost from "./ModaleEditPost";

const MyPost: React.FC = () => {
  const post = useSelector((state: RootState) => {
    return state.myPost.post as BodyPostGet[];
  });
  const [showCommenti, setShowCommenti] = useState(false);
  const [actualPostId, setActualPostId] = useState<string | null>(null);
  const [showSettingsPost, setShowSettingsPost] = useState(false);
  // const myProfile = useSelector((state: RootState) => {
  //   return state.myProfile.myProfile as BodyUser;
  // });

  // const postSuccess = useSelector((state: RootState) => {
  //   return state.postSettings.status;
  // });

  const handleShowCommenti = () => {
    setShowCommenti(true);
  };
  const handleNoShowCommenti = () => {
    setShowCommenti(false);
  };

  const [showEditModale, setShowEditModale] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BodyPostGet | null>(null);

  const handleClickPost = (post: BodyPostGet) => {
    setSelectedPost(post);
    setShowEditModale(true);
  };

  const handleNoShowEditModale = () => {
    setShowEditModale(false);
  };

  const dispatch = useDispatch<AppDispatch>();
  console.log(post);

  // useEffect(() => {
  //   console.log("useEffect triggered");

  //   dispatch(getAllMyPost());
  //   dispatch(createNoSuccessPost());
  // }, [postSuccess]);

  return (
    <>
      {/* versione mobile */}
      <Container className="d-sm-flex d-md-none d-lg-none container-post  mt-3">
        <div className="div-title-ciak">
          <h3 className="title-ciak">I MIEI CIAK</h3>
        </div>
        <Row id="row-post" className=" d-flex flex-column p-4 ">
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
                      <Card.Title className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center justify-content-center">
                          <img
                            src={post.utente.avatarUrl}
                            alt="icona-avatar-utente"
                            className="img-fluid icona-utente-post"
                          />
                          <h3 className="fs-6 ms-2">{post.utente.nome}</h3>
                        </div>
                        <h6>{post.dataCreazionePost.split("", 10)}</h6>
                      </Card.Title>
                      <Card.Text>{post.descrizione}</Card.Text>
                      <div className="d-flex justify-content-around align-items-center ">
                        <img
                          src={myCiakIcon}
                          alt="icona-myCiak"
                          className="img-fluid icona-myCiak"
                        />
                        <span className="numero-myCiak"> N</span>
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
                            setActualPostId(post.id);
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
                        {showSettingsPost && actualPostId === post.id && (
                          <div className=" d-flex flex-column">
                            <a
                              onClick={() => {
                                dispatch(deleteMyPost(post.id));
                              }}
                              className="delete-commento"
                            >
                              Elimina Post
                            </a>
                            <a
                              onClick={() => {
                                handleClickPost(post);
                              }}
                              className="edit-commento"
                            >
                              Modifica Post
                            </a>
                            <Button
                              className="close-settings-button"
                              onClick={() => {
                                setShowSettingsPost(false);
                              }}
                            >
                              X
                            </Button>
                            {showEditModale && selectedPost && (
                              <ModaleEditPost
                                onShow={showEditModale}
                                onClose={handleNoShowEditModale}
                                descrizione={selectedPost.descrizione}
                              />
                            )}
                          </div>
                        )}
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
      <Container className="d-none d-md-flex d-lg-none flex-column align-items-center mt-3">
        <div className="div-title-ciak">
          <h3 className="title-ciak">I MIEI CIAK</h3>
        </div>
        <Row id="row-post-md" className=" d-flex flex-row">
          {Array.isArray(post) &&
            post.map((post) => {
              return (
                <Col
                  key={post.id}
                  xs={12}
                  md={4}
                  className=" d-flex flex-column g-3"
                >
                  <Card className="p-2" id="card-post-md">
                    <Card.Img
                      variant="top"
                      src={post.imageUrl}
                      className="img-fluid image-post-md"
                    />
                    <Card.Body>
                      <Card.Title className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center justify-content-center">
                          <img
                            src={post.utente.avatarUrl}
                            alt="icona-avatar-utente"
                            className="img-fluid icona-utente-post-md"
                          />
                          <h3 className="fs-6 ms-2">{post.utente.nome}</h3>
                        </div>
                        <h6>{post.dataCreazionePost.split("", 10)}</h6>
                      </Card.Title>
                      <Card.Text>{post.descrizione}</Card.Text>
                      <div className="d-flex justify-content-around align-items-center ">
                        <img
                          src={myCiakIcon}
                          alt="icona-myCiak"
                          className="img-fluid icona-myCiak"
                        />
                        <span className="numero-myCiak"> N</span>
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
                        {showSettingsPost && actualPostId === post.id && (
                          <div className=" d-flex flex-column">
                            <a
                              onClick={() => {
                                dispatch(deleteMyPost(post.id));
                              }}
                              className="delete-commento"
                            >
                              Elimina Post
                            </a>
                            <a
                              onClick={() => {
                                handleClickPost(post);
                              }}
                              className="edit-commento"
                            >
                              Modifica Post
                            </a>
                            <Button
                              className="close-settings-button"
                              onClick={() => {
                                setShowSettingsPost(false);
                              }}
                            >
                              X
                            </Button>
                            {showEditModale && selectedPost && (
                              <ModaleEditPost
                                onShow={showEditModale}
                                onClose={handleNoShowEditModale}
                                descrizione={selectedPost.descrizione}
                              />
                            )}
                          </div>
                        )}
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

      {/* versione desktop */}
      <Container className="d-none d-lg-flex flex-column align-items-center mt-3">
        <div className="div-title-ciak">
          <h3 className="title-ciak">I MIEI CIAK</h3>
        </div>
        <Row id="row-post-md" className=" d-flex flex-row  ">
          {Array.isArray(post) &&
            post.map((post) => {
              return (
                <Col
                  key={post.id}
                  xs={12}
                  md={4}
                  lg={3}
                  className=" d-flex flex-column g-3"
                >
                  <Card className="p-2" id="card-post-lg">
                    <Card.Img
                      variant="top"
                      src={post.imageUrl}
                      className="img-fluid image-post-md"
                    />
                    <Card.Body>
                      <Card.Title className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center justify-content-center">
                          <img
                            src={post.utente.avatarUrl}
                            alt="icona-avatar-utente"
                            className="img-fluid icona-utente-post-md"
                          />
                          <h3 className="fs-6 ms-2">{post.utente.nome}</h3>
                        </div>
                        <h6>{post.dataCreazionePost.split("", 10)}</h6>
                      </Card.Title>
                      <Card.Text>{post.descrizione}</Card.Text>
                      <div className="d-flex justify-content-around align-items-center ">
                        <img
                          src={myCiakIcon}
                          alt="icona-myCiak"
                          className="img-fluid icona-myCiak"
                        />
                        <span className="numero-myCiak"> N</span>
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
                        {showSettingsPost && actualPostId === post.id && (
                          <div className=" d-flex flex-column">
                            <a
                              onClick={() => {
                                dispatch(deleteMyPost(post.id));
                              }}
                              className="delete-commento"
                            >
                              Elimina Post
                            </a>
                            <a
                              onClick={() => {
                                handleClickPost(post);
                              }}
                              className="edit-commento"
                            >
                              Modifica Post
                            </a>
                            <Button
                              className="close-settings-button"
                              onClick={() => {
                                setShowSettingsPost(false);
                              }}
                            >
                              X
                            </Button>
                            {showEditModale && selectedPost && (
                              <ModaleEditPost
                                onShow={showEditModale}
                                onClose={handleNoShowEditModale}
                                descrizione={selectedPost.descrizione}
                              />
                            )}
                          </div>
                        )}
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
    </>
  );
};

export default MyPost;
