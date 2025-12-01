import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import type BodyUser from "../types/bodyUser";
import { Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import {
  getAllFilms,
  getAllSeriesTv,
  getMyProfile,
} from "../redux/actions/actions";
import type BodyFilmGet from "../types/bodyFilmGet";
import type BodySerieTvGet from "../types/BodySerieTvGet";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import bannerFilm from "../assets/img/how-to-watch-the-lord-of-the-rings-in-chronological-order_3kwh.jpg";

const Service: React.FC = () => {
  const myProfile = useSelector((state: RootState) => {
    return state.myProfile.myProfile as BodyUser;
  });

  const movies = useSelector((state: RootState) => {
    return state.allMovies.films as BodyFilmGet[];
  });

  const seriesTV = useSelector((state: RootState) => {
    return state.allSeriesTv.seriesTV as BodySerieTvGet[];
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getMyProfile());
    dispatch(getAllFilms());
    dispatch(getAllSeriesTv());
    dispatch(getAllSeriesTv());
  }, []);

  return (
    <>
      {/* verione mobile */}
      {myProfile.role !== "ADMIN" && (
        <Container className="d-sm-flex d-md-none d-lg-none h-100">
          <Row className="p-3 d-flex">
            <Col className="col-1-serviceLoginFail">
              <div className="text-center p-1">
                <h3 className="fs-6 ">Questo account non ha un ruolo admin</h3>
                <a
                  href="/serviceLogin"
                  className=" text-decoration-none text-light"
                >
                  Ritorna al login
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      {myProfile.role === "ADMIN" && (
        <Container className="d-sm-flex d-md-none d-lg-none flex-column">
          <div className="d-flex justify-content-around mb-3 mt-4">
            <Button className="button-with-icon " type="submit">
              <svg
                className="icon"
                id="Play"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="color000000 svgShape"
                  fill="#ffffff"
                  d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                ></path>
              </svg>
              <span className="text p-1"> + Film</span>
            </Button>
            <Button className="button-with-icon " type="submit">
              <svg
                className="icon"
                id="Play"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="color000000 svgShape"
                  fill="#ffffff"
                  d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                ></path>
              </svg>
              <span className="text"> + Serie Tv</span>
            </Button>
          </div>
          <h3 className="title-catalogo">Film presenti nel catalogo :</h3>
          <Row id="row-serviceFilm" className="p-5 d-flex  ">
            {/* {Array.isArray(movies) &&
              movies.map((film) => {
                return ( */}
            <Col xs={12} className="col1-film">
              <Card className="card-film-serieTv">
                <Card.Img
                  variant="top"
                  src={bannerFilm}
                  className="img-fluid cover-image"
                />
                <Card.Body className="d-flex flex-column align-items-center justify-content-center body-card-catalogo ">
                  <Card.Title className="title-card-catalogo">
                    Titolo Film
                  </Card.Title>
                  <Card.Text className="d-flex ">Anno di uscita</Card.Text>
                  <div className="d-flex justify-content-between gap-3">
                    <Button className="button-with-icon " type="submit">
                      <svg
                        className="icon"
                        id="Play"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="color000000 svgShape"
                          fill="#ffffff"
                          d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                        ></path>
                      </svg>
                      <span className="text">Edit</span>
                    </Button>
                    <Button className="button-with-icon" type="submit">
                      <svg
                        className="icon"
                        id="Play"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="color000000 svgShape"
                          fill="#ffffff"
                          d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                        ></path>
                      </svg>
                      <span className="text">Delete</span>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} className="col1-film">
              <Card className="card-film-serieTv">
                <Card.Img
                  variant="top"
                  src={bannerFilm}
                  className="img-fluid cover-image"
                />
                <Card.Body className="d-flex flex-column align-items-center justify-content-center body-card-catalogo ">
                  <Card.Title className="title-card-catalogo">
                    Titolo Film
                  </Card.Title>
                  <Card.Text className="d-flex ">Anno di uscita</Card.Text>
                  <div className="d-flex justify-content-between gap-3">
                    <Button className="button-with-icon " type="submit">
                      <svg
                        className="icon"
                        id="Play"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="color000000 svgShape"
                          fill="#ffffff"
                          d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                        ></path>
                      </svg>
                      <span className="text">Edit</span>
                    </Button>
                    <Button className="button-with-icon" type="submit">
                      <svg
                        className="icon"
                        id="Play"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="color000000 svgShape"
                          fill="#ffffff"
                          d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                        ></path>
                      </svg>
                      <span className="text">Delete</span>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {/* ); */}
            {/* })} */}
          </Row>
          <h3 className=" title-catalogo"> Serie Tv presenti nel catalogo :</h3>
          <Row id="row-serviceSerieTv" className="p-5 d-flex ">
            {/* {Array.isArray(seriesTV) &&
              seriesTV.map((seriesTV) => {
                return ( */}
            <Col xs={12} className="col2-serieTv">
              <Card className="card-film-serieTv">
                <Card.Img
                  variant="top"
                  src={bannerFilm}
                  className="img-fluid cover-image"
                />
                <Card.Body className="d-flex flex-column align-items-center justify-content-center body-card-catalogo ">
                  <Card.Title className="title-card-catalogo">
                    Titolo SerieTv
                  </Card.Title>
                  <Card.Text>Anno di uscita</Card.Text>
                  <div className="d-flex justify-content-around gap-3">
                    <Button className="button-with-icon" type="submit">
                      <svg
                        className="icon"
                        id="Play"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="color000000 svgShape"
                          fill="#ffffff"
                          d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                        ></path>
                      </svg>
                      <span className="text">Edit</span>
                    </Button>
                    <Button className="button-with-icon" type="submit">
                      <svg
                        className="icon"
                        id="Play"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="color000000 svgShape"
                          fill="#ffffff"
                          d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                        ></path>
                      </svg>
                      <span className="text">Delete</span>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {/* );
              })} */}
          </Row>
        </Container>
      )}
      {/* versione tablet */}
      {myProfile.role !== "ADMIN" && (
        <Container className="d-none d-md-flex d-lg-none flex-column h-100">
          <Row className="p-3 d-flex">
            <Col className="col-1-serviceLoginFail">
              <div className="text-center p-1">
                <h3 className="fs-6 ">Questo account non ha un ruolo admin</h3>
                <a
                  href="/serviceLogin"
                  className=" text-decoration-none text-light"
                >
                  Ritorna al login
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      )}
      {myProfile.role === "ADMIN" && (
        <Container className="d-none d-md-flex d-lg-none flex-column">
          <div className="d-flex justify-content-around mb-3 mt-4">
            <Button className="button-with-icon " type="submit">
              <svg
                className="icon"
                id="Play"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="color000000 svgShape"
                  fill="#ffffff"
                  d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                ></path>
              </svg>
              <span className="text p-1"> + Film</span>
            </Button>
            <Button className="button-with-icon " type="submit">
              <svg
                className="icon"
                id="Play"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="color000000 svgShape"
                  fill="#ffffff"
                  d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                ></path>
              </svg>
              <span className="text"> + Serie Tv</span>
            </Button>
          </div>
          <h3 className="title-catalogo">Film presenti nel catalogo :</h3>
          <Row id="row-serviceFilm" className="p-5 d-flex  ">
            {/* {Array.isArray(movies) &&
              movies.map((film) => {
                return ( */}
            <Col xs={12} md={6} className="col1-film-md">
              <Card className="card-film-serieTv-md">
                <Card.Img
                  variant="top"
                  src={bannerFilm}
                  className="img-fluid cover-image"
                />
                <Card.Body className="d-flex flex-column align-items-center justify-content-center body-card-catalogo ">
                  <Card.Title className="title-card-catalogo">
                    Titolo Film
                  </Card.Title>
                  <Card.Text className="d-flex ">Anno di uscita</Card.Text>
                  <div className="d-flex justify-content-between gap-3">
                    <Button className="button-with-icon " type="submit">
                      <svg
                        className="icon"
                        id="Play"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="color000000 svgShape"
                          fill="#ffffff"
                          d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                        ></path>
                      </svg>
                      <span className="text">Edit</span>
                    </Button>
                    <Button className="button-with-icon" type="submit">
                      <svg
                        className="icon"
                        id="Play"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="color000000 svgShape"
                          fill="#ffffff"
                          d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                        ></path>
                      </svg>
                      <span className="text">Delete</span>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} className="col1-film-md">
              <Card className="card-film-serieTv-md">
                <Card.Img
                  variant="top"
                  src={bannerFilm}
                  className="img-fluid cover-image"
                />
                <Card.Body className="d-flex flex-column align-items-center justify-content-center body-card-catalogo ">
                  <Card.Title className="title-card-catalogo">
                    Titolo Film
                  </Card.Title>
                  <Card.Text className="d-flex ">Anno di uscita</Card.Text>
                  <div className="d-flex justify-content-between gap-3">
                    <Button className="button-with-icon " type="submit">
                      <svg
                        className="icon"
                        id="Play"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="color000000 svgShape"
                          fill="#ffffff"
                          d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                        ></path>
                      </svg>
                      <span className="text">Edit</span>
                    </Button>
                    <Button className="button-with-icon" type="submit">
                      <svg
                        className="icon"
                        id="Play"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="color000000 svgShape"
                          fill="#ffffff"
                          d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                        ></path>
                      </svg>
                      <span className="text">Delete</span>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {/* ); */}
            {/* })} */}
          </Row>
          <h3 className=" title-catalogo"> Serie Tv presenti nel catalogo :</h3>
          <Row id="row-serviceSerieTv" className="p-5 d-flex ">
            {/* {Array.isArray(seriesTV) &&
              seriesTV.map((seriesTV) => {
                return ( */}
            <Col xs={12} md={6} className="col2-serieTv-md">
              <Card className="card-film-serieTv-md">
                <Card.Img
                  variant="top"
                  src={bannerFilm}
                  className="img-fluid cover-image"
                />
                <Card.Body className="d-flex flex-column align-items-center justify-content-center body-card-catalogo ">
                  <Card.Title className="title-card-catalogo">
                    Titolo SerieTv
                  </Card.Title>
                  <Card.Text>Anno di uscita</Card.Text>
                  <div className="d-flex justify-content-around gap-3">
                    <Button className="button-with-icon" type="submit">
                      <svg
                        className="icon"
                        id="Play"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="color000000 svgShape"
                          fill="#ffffff"
                          d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                        ></path>
                      </svg>
                      <span className="text">Edit</span>
                    </Button>
                    <Button className="button-with-icon" type="submit">
                      <svg
                        className="icon"
                        id="Play"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="color000000 svgShape"
                          fill="#ffffff"
                          d="M12 39c-.549 0-1.095-.15-1.578-.447A3.008 3.008 0 0 1 9 36V12c0-1.041.54-2.007 1.422-2.553a3.014 3.014 0 0 1 2.919-.132l24 12a3.003 3.003 0 0 1 0 5.37l-24 12c-.42.21-.885.315-1.341.315z"
                        ></path>
                      </svg>
                      <span className="text">Delete</span>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            {/* );
              })} */}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Service;
