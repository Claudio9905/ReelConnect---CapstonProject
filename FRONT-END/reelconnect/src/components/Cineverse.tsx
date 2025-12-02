import { Button, Col, Container, Row } from "react-bootstrap";

import Post from "./Post";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type BodyUser from "../types/bodyUser";

const Cineverse: React.FC = () => {
  const profile = useSelector((state: RootState) => {
    return state.myProfile.myProfile as BodyUser;
  });

  return (
    <>
      {/* Versione Mobile */}
      <Container className="d-sm-flex d-md-none d-lg-none flex-column align-items-center mt-3">
        <Row className="row-cineverse">
          <Col xs={12}>
            <Post />
          </Col>
        </Row>
      </Container>
      {/* versione tablet */}
      <Container className="d-none d-md-flex d-lg-none mt-3">
        <Row className="d-flex flex-column w-50 ">
          <Col xs={8} id="col-profile-1-sm" className="d-flex flex-column">
            {/* Qui ci sarà la l'immagine di copertina, l'immagine di profilo */}
            <div className="banner-div-sm">
              <img
                src={profile.bannerUrl}
                alt="immagine di copertina"
                className="img-fluid "
                id="banner-profile"
              />
            </div>
          </Col>
          <Col
            xs={8}
            id="col-profile-2-sm"
            className="d-flex flex-column align-items-center"
          >
            {/* le informazione dell'utente */}
            <div className="div-name-profile-sm">
              <h1 className="fs-3" id="name-profile-sm">
                {profile.nome} {profile.cognome}
              </h1>
              <h3 className="fs-6" id="username-profile-sm">
                {profile.username}
              </h3>
              <div className=" img-profile-div-sm">
                <img
                  src={profile.avatarUrl}
                  alt="immagine di profilo"
                  className="img-fluid object-fit-cover "
                  id="avatar-profile"
                />
              </div>
              <div className="div-fan-follow">
                <Button id="button-number-fan">N. FAN</Button>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-around p-2">
              <p>
                | E-mail: {profile.email} <br />| Età: {profile.eta} <br />|
                Data di nascita: {profile.dataDiNascita}
                <br />| Sesso: {profile.sesso} <br />
              </p>
            </div>
            <span className="span-divided-sm"></span>
            {/* Componente dei film/serie Tv visti */}
            <div className="catalogo-filmSerieTv">
              <h3> Film/SerieTv visti </h3>
            </div>
          </Col>
        </Row>
        <Row className="d-flex flex-column w-50 align-items-center row-cineverse">
          <Col xs={11}>
            <Post />
          </Col>
        </Row>
      </Container>
      {/* Versione desktop */}
      <Container className="d-none d-lg-flex  mt-3">
        <Row className="d-flex flex-column w-50">
          <Col xs={6} id="col-profile-1-sm" className="d-flex flex-column">
            {/* Qui ci sarà la l'immagine di copertina, l'immagine di profilo */}
            <div className="banner-div-sm">
              <img
                src={profile.bannerUrl}
                alt="immagine di copertina"
                className="img-fluid "
                id="banner-profile"
              />
            </div>
          </Col>
          <Col
            xs={6}
            id="col-profile-2-sm"
            className="d-flex flex-column align-items-center"
          >
            {/* le informazione dell'utente */}
            <div className="div-name-profile-sm">
              <h1 className="fs-6" id="name-profile-sm">
                {profile.nome} {profile.cognome}
              </h1>
              <h3 className="fs-6" id="username-profile-sm">
                {profile.username}
              </h3>
              <div className=" img-profile-div-sm">
                <img
                  src={profile.avatarUrl}
                  alt="immagine di profilo"
                  className="img-fluid object-fit-cover "
                  id="avatar-profile-cineverse"
                />
              </div>
              <div className="div-fan-follow">
                <Button id="button-number-fan">N. FAN</Button>
              </div>
            </div>
            <div className="d-flex flex-column justify-content-around p-2">
              <p>
                | E-mail: {profile.email} <br />| Età: {profile.eta} <br />|
                Data di nascita: {profile.dataDiNascita}
                <br />| Sesso: {profile.sesso} <br />
              </p>
            </div>
            <span className="span-divided-sm"></span>
            {/* Componente dei film/serie Tv visti */}
            <div className="catalogo-filmSerieTv">
              <h3> Film/SerieTv visti </h3>
            </div>
          </Col>
        </Row>
        <Row className="d-flex flex-column align-items-center w-50 row-cineverse">
          <Col xs={7}>
            <Post />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cineverse;
