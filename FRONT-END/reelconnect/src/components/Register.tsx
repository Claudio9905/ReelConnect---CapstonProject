import { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";

const Register: React.FC = () => {
  const [validated, setValidated] = useState(false);
  const [success, setSuccess] = useState(false);
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [username, setUsername] = useState("");
  const [eta, setEta] = useState("");
  const [dataDiNascita, setDataDiNascita] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const endpointLogin = "http://localhost:3005/authProfile/registerProfile";

  const submitRegister = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(endpointLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nome,
        cognome: cognome,
        username: username,
        eta: eta,
        dataDiNascita: dataDiNascita,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((resData) => {
        console.log(resData);
        setSuccess(true);
        // setIsLoading(false);
      })
      .catch((err) => {
        // setIsLoading(false);
        console.log("Error: " + err);
      });
  };

  // const successRegister = () => {
  //   setSuccess(true);
  // };

  return (
    <>
      <Container>
        <Row>
          <Col xs={12} className="col-register p-5">
            <Form
              noValidate
              validated={validated}
              className="d-flex flex-column p-3 gap-3"
              onSubmit={(e) => {
                handleSubmit(e);
                submitRegister(e);
              }}
            >
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Nome"
                  className="input-form"
                  required
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                  }}
                  minLength={2}
                  maxLength={20}
                ></FormControl>
                <Form.Control.Feedback type="invalid">
                  Inserire un nome con minimo di 2 caratteri e un massimo di 20
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Cognome"
                  className="input-form"
                  required
                  value={cognome}
                  onChange={(e) => {
                    setCognome(e.target.value);
                  }}
                  minLength={2}
                  maxLength={20}
                ></FormControl>
                <Form.Control.Feedback type="invalid">
                  Inserire un cognome con un minimo di 2 caratteri ed un massimo
                  di 20
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Username"
                  className="input-form"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  minLength={2}
                  maxLength={20}
                ></FormControl>
                <Form.Control.Feedback type="invalid">
                  Inserire uno username
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="number"
                  placeholder="Età"
                  className="input-form"
                  required
                  value={eta}
                  onChange={(e) => {
                    setEta(e.target.value);
                  }}
                  min={13}
                ></FormControl>
                <Form.Control.Feedback type="invalid">
                  Inserire un età che sia dai 13 anni in su
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="date"
                  placeholder="Data di nascità"
                  className="input-form"
                  required
                  value={dataDiNascita}
                  onChange={(e) => {
                    setDataDiNascita(e.target.value);
                  }}
                ></FormControl>
                <Form.Control.Feedback type="invalid">
                  Inserire una data di nascita
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="email"
                  placeholder="E-mail"
                  className="input-form"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></FormControl>
                <Form.Control.Feedback type="invalid">
                  Inserire un e-mail
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="password"
                  placeholder="Password"
                  className="input-form"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  minLength={8}
                ></FormControl>
                <Form.Control.Feedback type="invalid">
                  La password deve avere un minimo di 8 caratteri
                </Form.Control.Feedback>
              </FormGroup>
              <div className="p-1 d-flex justify-content-center">
                <Button type="submit" className="button-register mt-4 ">
                  REGISTER
                </Button>
                {success ?? (
                  <Alert variant="warning">
                    Registrazione avvenuta con successo, vai al Login per
                    accedere al Cineverse
                  </Alert>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
