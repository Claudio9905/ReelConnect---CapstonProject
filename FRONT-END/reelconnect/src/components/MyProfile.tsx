import { Col, Container, Row } from "react-bootstrap";
import NavSettings from "./NavSettings";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../redux/actions/actions";
import type { AppDispatch, RootState } from "../redux/store";
import type BodyUser from "../types/bodyUser";

const MyProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => {
    return state.myProfile.myProfile as BodyUser;
  });

  useEffect(() => {
    dispatch(getMyProfile());
  }, []);

  console.log("Profile: ", profile);
  return (
    <>
      {/* Versione mobile */}
      <Container
        id="container-my-profile"
        className="d-sm-flex d-md-none d-lg-none"
      >
        <Row id="row-1" className="d-flex flex-column align-items-center">
          <Col xs={12} id="col-profile-1-sm" className="d-flex flex-column">
            {/* Qui ci sarà la l'immagine di copertina, l'immagine di profilo */}
            <div className="banner-div-sm">
              <img src="" alt="immagine di copertina" />
            </div>
            <div className=" img-profile-div-sm">
              <img src="" alt="immagine di profilo" />
            </div>
          </Col>
          <Col xs={12} id="col-profile-2-sm" className="d-flex flex-column">
            {/* le informazione dell'utente */}
            <h1>{profile.username}</h1>
            <h3>Nome completo - nome/cognome</h3>
            <h3>Info:</h3>
            <p>
              | E-mail: <br />
              | Età: <br />
              | Data di nascita: <br />
              | Sesso: <br />
              ...
            </p>
          </Col>
        </Row>
        <Row id="row-2" className="d-flex flex-column align-items-center">
          {/* Qui ci sarà la sezione dei post */}
        </Row>
      </Container>

      {/* Versione tablet */}
      <Container
        id="container-my-profile"
        className="d-none d-md-flex d-lg-none"
      >
        <Row id="row-1" className="d-flex flex-column align-items-center">
          <Col xs={12} id="col-profile-1-md" className="d-flex flex-column">
            {/* Qui ci sarà la l'immagine di copertina, l'immagine di profilo */}
            <div className="banner-div-md">
              <img src="" alt="immagine di copertina" />
            </div>
            <div className=" img-profile-div-md">
              <img src="" alt="immagine di profilo" />
            </div>
          </Col>
          <Col xs={12} id="col-profile-2-md" className="d-flex flex-column">
            {/* le informazione dell'utente */}
            <h1>Nome profilo - username</h1>
            <h3>Nome completo - nome/cognome</h3>
            <h3>Info:</h3>
            <p>
              | E-mail: <br />
              | Età: <br />
              | Data di nascita: <br />
              | Sesso: <br />
              ...
            </p>
          </Col>
        </Row>
        <Row id="row-2" className="d-flex flex-column align-items-center">
          {/* Qui ci sarà la sezione dei post */}
        </Row>
      </Container>

      {/* // Versione Desktop */}
      <Container id="container-my-profile" className="d-none d-lg-flex">
        <Row id="row-1" className="d-flex flex-column align-items-center">
          <Col xs={12} id="col-profile-1-lg" className="d-flex flex-column">
            {/* Qui ci sarà la l'immagine di copertina, l'immagine di profilo */}
            <div className="banner-div-lg">
              <img src="" alt="immagine di copertina" />
            </div>
            <div className=" img-profile-div-lg">
              <img src="" alt="immagine di profilo" />
            </div>
          </Col>
          <Col xs={12} id="col-profile-2-lg" className="d-flex flex-column">
            {/* le informazione dell'utente */}
            <h1>Nome profilo - username</h1>
            <h3>Nome completo - nome/cognome</h3>
            <h3>Info:</h3>
            <p>
              | E-mail: <br />
              | Età: <br />
              | Data di nascita: <br />
              | Sesso: <br />
              ...
            </p>
          </Col>
        </Row>
        <Row id="row-2" className="d-flex flex-column align-items-center">
          {/* Qui ci sarà la sezione dei post */}
        </Row>
        <NavSettings />
      </Container>
    </>
  );
};

export default MyProfile;
