import { Button, Col, Container, Row } from "react-bootstrap";
import NavSettings from "./NavSettings";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import type BodyUser from "../types/bodyUser";
import ModaleEditProfile from "./ModaleEditProfile";
import MyPost from "./MyPost";
import ModaleEditAvatarProfile from "./ModaleEditAvatarProfile";
import ModaleEditBannerProfile from "./ModaleEditBannerProfile";
import { getMyProfile } from "../redux/actions/actions";

const MyProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => {
    return state.myProfile.myProfile as BodyUser;
  });
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [showModalAvatar, setShowModalAvatar] = useState(false);
  const handleCloseModalAvatar = () => setShowModalAvatar(false);
  const handleShowModalAvatar = () => setShowModalAvatar(true);

  const [showModalBanner, setShowModalBanner] = useState(false);
  const handleCloseModalBanner = () => setShowModalBanner(false);
  const handleShowModalBanner = () => setShowModalBanner(true);

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
              <img
                src={profile.bannerUrl}
                alt="immagine di copertina"
                className="img-fluid "
                id="banner-profile"
              />
              <Button onClick={handleShowModalBanner} id="button-edit-banner">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </Button>
              {showModalBanner && (
                <ModaleEditBannerProfile
                  onClose={handleCloseModalBanner}
                  onShow={showModalBanner}
                />
              )}
            </div>
          </Col>
          <Col
            xs={12}
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
                  className="img-fluid object-fit-cover"
                  id="avatar-profile"
                />
                <Button onClick={handleShowModalAvatar} id="button-edit-avatar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                </Button>
                {showModalAvatar && (
                  <ModaleEditAvatarProfile
                    onClose={handleCloseModalAvatar}
                    onShow={showModalAvatar}
                  />
                )}
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
              <Button className="button-edit-info" onClick={handleShow}>
                EDIT
              </Button>
              {showModal && (
                <ModaleEditProfile onClose={handleClose} onShow={showModal} />
              )}
            </div>
            <span className="span-divided-sm"></span>
            {/* Componente dei film/serie Tv visti */}
            <div className="catalogo-filmSerieTv">
              <h3> Film/SerieTv visti </h3>
            </div>
          </Col>
        </Row>
        <Row id="row-2" className="d-flex flex-column align-items-center">
          {/* Qui ci sarà la sezione dei post */}
          <MyPost />
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
          <MyPost />
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
          <MyPost />
        </Row>
        <NavSettings />
      </Container>
    </>
  );
};

export default MyProfile;
