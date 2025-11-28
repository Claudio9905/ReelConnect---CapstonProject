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
              <Button
                onClick={handleShowModalBanner}
                id="button-edit-banner"
              ></Button>
              {showModalBanner && (
                <ModaleEditBannerProfile
                  onClose={handleCloseModalBanner}
                  onShow={showModalBanner}
                />
              )}
            </div>
            <div className=" img-profile-div-sm">
              <img
                src={profile.avatarUrl}
                alt="immagine di profilo"
                className="img-fluid object-fit-cover"
                id="avatar-profile"
              />
              <Button
                onClick={handleShowModalAvatar}
                id="button-edit-avatar"
              ></Button>
              {showModalAvatar && (
                <ModaleEditAvatarProfile
                  onClose={handleCloseModalAvatar}
                  onShow={showModalAvatar}
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
              <div className="div-fan-follow">
                <Button id="button-number-fan">FAN</Button>
                <Button id="button-follow">FOLLOW</Button>
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
              <h3> Film/SerieTv visionati </h3>
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
