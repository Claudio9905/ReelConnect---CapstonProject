import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Il NavSettings avrà una barra degli strumenti dove l'utente potra creare il proprio post, cercare altri utenti e visistare la loro pagina, accedere alla propria lista dei film/serieTv che ha visto e la possibilità di aggiugerne altri
const NavSettings: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Versione mobile */}
      <Container id="container-NavSettings" className="d-sm-flex d-none">
        <Row>
          <Col xs={12} className="d-flex justify-content-around">
            <Button>
              {/* Per la ricerca degli utenti dove si aprirà un modale apposito */}
            </Button>
            <Button
              onClick={() => {
                navigate(`/cineverse`);
              }}
            >
              {/* Per accedere al Cineverse */}
            </Button>
            <Button>{/* Per la creazione di un post */}</Button>
            <Button>
              {/* Per accedere alla lista dei propri film/serieTv viste */}
            </Button>
          </Col>
        </Row>
      </Container>
      {/* Versione tablet */}
      <Container
        id="container-NavSettings"
        className="d-none d-md-flex d-lg-none"
      >
        <Row>
          <Col xs={12} className="d-flex justify-content-around">
            <Button>
              {/* Per la ricerca degli utenti dove si aprirà un modale apposito */}
            </Button>
            <Button
              onClick={() => {
                navigate(`/cineverse`);
              }}
            >
              {/* Per accedere al Cineverse */}
            </Button>
            <Button>{/* Per la creazione di un post */}</Button>
            <Button>
              {/* Per accedere alla lista dei propri film/serieTv viste */}
            </Button>
          </Col>
        </Row>
      </Container>
      {/* Versione Desktop*/}
      <Container id="container-NavSettings" className="d-none d-lg-flex">
        <Row>
          <Col xs={12} className="d-flex justify-content-around">
            <Button>
              {/* Per la ricerca degli utenti dove si aprirà un modale apposito */}
            </Button>
            <Button
              onClick={() => {
                navigate(`/cineverse`);
              }}
            >
              {/* Per accedere al Cineverse */}
            </Button>
            <Button>{/* Per la creazione di un post */}</Button>
            <Button>
              {/* Per accedere alla lista dei propri film/serieTv viste */}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NavSettings;
