import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ModaleCreatePost from "./ModaleCreatePost";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type BodyUser from "../types/bodyUser";
import iconaCineverse from "../assets/img/icona_cineverse_2.png";

// Il NavSettings avrà una barra degli strumenti dove l'utente potra creare il proprio post, cercare altri utenti e visistare la loro pagina, accedere alla propria lista dei film/serieTv che ha visto e la possibilità di aggiugerne altri
const NavSettings: React.FC = () => {
  const navigate = useNavigate();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const location = useLocation();
  const myProfile = useSelector((state: RootState) => {
    return state.myProfile.myProfile as BodyUser;
  });

  const handleNoshowModale = () => setShowCreatePost(false);
  const handleshowModale = () => setShowCreatePost(true);
  return (
    <>
      {/* Versione mobile */}
      <Container
        id="container-NavSettings"
        className={` 
          ${
            location.pathname === "/"
              ? "d-none"
              : "d-sm-flex d-md-none d-lg-none flex-column container-nav-settings"
          }`}
      >
        <Row>
          <Col xs={12} className="d-flex justify-content-around">
            <Button id="button-search-user">
              {/* Per la ricerca degli utenti dove si aprirà un modale apposito */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-person-bounding-box"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              </svg>
            </Button>
            <Button
              id="button-navigate-cineverse"
              onClick={() => {
                navigate(`/cineverse`);
              }}
              className={`w-25 ${
                location.pathname === "/cineverse" ? "d-none" : ""
              }`}
            >
              {/* Per accedere al Cineverse */}
              <img
                src={iconaCineverse}
                alt="icona pagina cineverse"
                className="img-fluid icona-cineverse-sm"
              />
            </Button>
            <Button
              id="button-navigate-myprofile"
              onClick={() => {
                navigate("/myprofile");
              }}
              className={`${
                location.pathname === "/myprofile" ? "d-none" : ""
              } `}
            >
              {/* Per accedere al proprio profilo */}
              <img
                src={myProfile.avatarUrl}
                alt="icona-profilo"
                className="img-fluid w-50 rounded-5 object-fit-contain "
              />
            </Button>
            <Button id="button-create-post" onClick={handleshowModale}>
              {/* Per la creazione di un post */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-file-post"
                viewBox="0 0 16 16"
              >
                <path d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z" />
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
              </svg>
            </Button>
            {showCreatePost && (
              <ModaleCreatePost
                onClose={handleNoshowModale}
                onShow={showCreatePost}
              />
            )}
            <Button id="button-lista-film-serieTv">
              {/* Per accedere alla lista dei propri film/serieTv viste */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                className="bi bi-film"
                viewBox="0 0 16 16"
              >
                <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
              </svg>
            </Button>
          </Col>
        </Row>
      </Container>
      {/* Versione tablet */}
      <Container
        id="container-NavSettings"
        className={`
          ${
            location.pathname === "/"
              ? "d-none"
              : "d-none d-md-flex d-lg-none flex-column container-nav-settings"
          }`}
      >
        <Row>
          <Col xs={12} className="d-flex justify-content-around">
            <Button id="button-search-user">
              {/* Per la ricerca degli utenti dove si aprirà un modale apposito */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-person-bounding-box"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              </svg>
            </Button>
            <Button
              id="button-navigate-cineverse"
              onClick={() => {
                navigate(`/cineverse`);
              }}
              className={`w-25 ${
                location.pathname === "/cineverse" ? "d-none" : ""
              }`}
            >
              {/* Per accedere al Cineverse */}
              <img
                src={iconaCineverse}
                alt="icona pagina cineverse"
                className="img-fluid w-50"
              />
            </Button>
            <Button
              id="button-navigate-myprofile"
              onClick={() => {
                navigate("/myprofile");
              }}
              className={`${
                location.pathname === "/myprofile" ? "d-none" : ""
              } `}
            >
              {/* Per accedere al proprio profilo */}
              <img
                src={myProfile.avatarUrl}
                alt="icona-profilo"
                className="img-fluid w-25 rounded-5 object-fit-contain "
              />
            </Button>
            <Button id="button-create-post" onClick={handleshowModale}>
              {/* Per la creazione di un post */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-file-post"
                viewBox="0 0 16 16"
              >
                <path d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z" />
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
              </svg>
            </Button>
            {showCreatePost && (
              <ModaleCreatePost
                onClose={handleNoshowModale}
                onShow={showCreatePost}
              />
            )}
            <Button id="button-lista-film-serieTv">
              {/* Per accedere alla lista dei propri film/serieTv viste */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-film"
                viewBox="0 0 16 16"
              >
                <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
              </svg>
            </Button>
          </Col>
        </Row>
      </Container>
      {/* Versione desktop */}
      <Container
        id="container-NavSettings"
        className={`
          ${
            location.pathname === "/"
              ? "d-none"
              : " d-none d-lg-flex flex-column container-nav-settings"
          }`}
      >
        <Row>
          <Col xs={12} className="d-flex justify-content-around">
            <Button id="button-search-user">
              {/* Per la ricerca degli utenti dove si aprirà un modale apposito */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-person-bounding-box"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5" />
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              </svg>
            </Button>
            <Button
              id="button-navigate-cineverse"
              onClick={() => {
                navigate(`/cineverse`);
              }}
              className={`w-25 ${
                location.pathname === "/cineverse" ? "d-none" : ""
              }`}
            >
              {/* Per accedere al Cineverse */}
              <img
                src={iconaCineverse}
                alt="icona pagina cineverse"
                className="img-fluid"
                id="icona-cineverse-lg"
              />
            </Button>
            <Button
              id="button-navigate-myprofile"
              onClick={() => {
                navigate("/myprofile");
              }}
              className={`${
                location.pathname === "/myprofile" ? "d-none" : ""
              } `}
            >
              {/* Per accedere al proprio profilo */}
              <img
                src={myProfile.avatarUrl}
                alt="icona-profilo"
                className="img-fluid w-25 rounded-5 object-fit-contain "
              />
            </Button>
            <Button id="button-create-post" onClick={handleshowModale}>
              {/* Per la creazione di un post */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-file-post"
                viewBox="0 0 16 16"
              >
                <path d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z" />
                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1" />
              </svg>
            </Button>
            {showCreatePost && (
              <ModaleCreatePost
                onClose={handleNoshowModale}
                onShow={showCreatePost}
              />
            )}
            <Button id="button-lista-film-serieTv">
              {/* Per accedere alla lista dei propri film/serieTv viste */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-film"
                viewBox="0 0 16 16"
              >
                <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm4 0v6h8V1zm8 8H4v6h8zM1 1v2h2V1zm2 3H1v2h2zM1 7v2h2V7zm2 3H1v2h2zm-2 3v2h2v-2zM15 1h-2v2h2zm-2 3v2h2V4zm2 3h-2v2h2zm-2 3v2h2v-2zm2 3h-2v2h2z" />
              </svg>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NavSettings;
