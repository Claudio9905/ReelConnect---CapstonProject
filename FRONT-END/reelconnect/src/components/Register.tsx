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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
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
              onSubmit={handleSubmit}
            >
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Nome"
                  className="input-form"
                  required
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
                  minLength={8}
                ></FormControl>
                <Form.Control.Feedback type="invalid">
                  La password deve avere un minimo di 8 caratteri
                </Form.Control.Feedback>
              </FormGroup>
              <div className="p-1 d-flex justify-content-center">
                <Button
                  type="submit"
                  onClick={() => {
                    setSuccess(true);
                  }}
                  className="button-register mt-4 "
                >
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
