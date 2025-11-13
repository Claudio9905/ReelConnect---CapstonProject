import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";

import clapperboard from "../assets/img/Cinematic_clapperboa.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [validated, setValidated] = useState(false);
  const [usernameEmail, setUsernameEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const endpointLogin = "http://localhost:3005/authProfile/loginProfile";

  const submitLogin = (event: React.FormEvent) => {
    event.preventDefault();
    // setIsLoading(true);
    fetch(endpointLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usernameEmail: usernameEmail,
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
        localStorage.setItem("token", resData.token);
        // setIsLoading(false);
        navigate("/cineverse");
      })
      .catch((err) => {
        // setIsLoading(false);
        console.log("Error: " + err);
      });
  };

  return (
    <>
      {/* Versione mobile */}
      <Container className="d-md-none d-lg-none">
        <Row className="p-3 ">
          <Col
            xs={12}
            className=" d-flex align-items-center  flex-column col-login mt-4"
          >
            <div className="d-flex justify-content-center div-img-login">
              <img
                src={clapperboard}
                alt="logo-login"
                className="img-fluid mb-2"
              />
            </div>

            <div className="div-title">
              <div className=" d-flex justify-content-center ">
                <h1 className="title-login text-center">
                  LOGIN TO <br /> THE CINEVERSE
                </h1>
              </div>

              <Form
                noValidate
                validated={validated}
                className="d-flex flex-column align-items-center p-4 mt-3 gap-3"
                onSubmit={(e) => {
                  handleSubmit(e);
                  submitLogin(e);
                }}
              >
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="USERNAME/EMAIL"
                    className="input-form"
                    value={usernameEmail}
                    onChange={(e) => {
                      setUsernameEmail(e.target.value);
                    }}
                    required
                  ></FormControl>
                  <Form.Control.Feedback type="invalid">
                    Inserire lo username o l'e-mail corretto
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <FormControl
                    type="password"
                    placeholder="PASSWORD"
                    className="input-form"
                    minLength={8}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  ></FormControl>
                  <Form.Control.Feedback type="invalid">
                    La password deve avere un minimo di 8 caratteri
                  </Form.Control.Feedback>
                </FormGroup>
                <div className="p-1">
                  <Button type="submit" className="button-login mt-4 ">
                    LOGIN
                  </Button>
                </div>
                <a
                  href="/#"
                  className=" forgot-password text-decoration-none mt-2"
                >
                  Forgot password?
                </a>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Versione tablet */}
      <Container className="d-none d-md-flex d-lg-none">
        <Row className="p-3 justify-content-center">
          <Col
            md={12}
            className=" d-flex align-items-center  flex-column col-login-md mt-4"
          >
            <div className="d-flex justify-content-center div-img-login-md">
              <img src={clapperboard} alt="logo-login" className="img-fluid" />
            </div>

            <div className="div-title-md">
              <div className=" d-flex justify-content-center ">
                <h1 className="title-login-md text-center">
                  LOGIN TO <br /> THE CINEVERSE
                </h1>
              </div>

              <Form
                noValidate
                validated={validated}
                className="d-flex flex-column align-items-center p-1 mt-3 gap-3"
                onSubmit={(e) => {
                  handleSubmit(e);
                  submitLogin(e);
                }}
              >
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="USERNAME/EMAIL"
                    className="input-form-md"
                    value={usernameEmail}
                    onChange={(e) => {
                      setUsernameEmail(e.target.value);
                    }}
                    required
                  ></FormControl>
                  <Form.Control.Feedback type="invalid">
                    Inserire lo username o l'e-mail corretto
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <FormControl
                    type="password"
                    placeholder="PASSWORD"
                    className="input-form-md"
                    minLength={8}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  ></FormControl>
                  <Form.Control.Feedback type="invalid">
                    La password deve avere un minimo di 8 caratteri
                  </Form.Control.Feedback>
                </FormGroup>
                <div className="p-1">
                  <Button type="submit" className="button-login-md mt-4 ">
                    LOGIN
                  </Button>
                </div>
                <a
                  href="/#"
                  className=" forgot-password-md text-decoration-none mt-2"
                >
                  Forgot password?
                </a>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Versione Desktop */}
      <Container className="d-none d-lg-flex">
        <Row className="p-3 ">
          <Col
            lg={12}
            className=" d-flex align-items-center  flex-column col-login mt-4"
          >
            <div className="d-flex justify-content-center div-img-login-lg mt-4">
              <img src={clapperboard} alt="logo-login" className="img-fluid" />
            </div>

            <div className="div-title-lg">
              <div className=" d-flex justify-content-center ">
                <h1 className="title-login-lg text-center">
                  LOGIN TO <br /> THE CINEVERSE
                </h1>
              </div>

              <Form
                noValidate
                validated={validated}
                className="d-flex flex-column align-items-center p-1 mt-3 gap-3"
                onSubmit={(e) => {
                  handleSubmit(e);
                  submitLogin(e);
                }}
              >
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="USERNAME/EMAIL"
                    className="input-form-lg"
                    value={usernameEmail}
                    onChange={(e) => {
                      setUsernameEmail(e.target.value);
                    }}
                    required
                  ></FormControl>
                  <Form.Control.Feedback type="invalid">
                    Inserire lo username o l'e-mail corretto
                  </Form.Control.Feedback>
                </FormGroup>
                <FormGroup>
                  <FormControl
                    type="password"
                    placeholder="PASSWORD"
                    className="input-form-lg"
                    minLength={8}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    required
                  ></FormControl>
                  <Form.Control.Feedback type="invalid">
                    La password deve avere un minimo di 8 caratteri
                  </Form.Control.Feedback>
                </FormGroup>
                <div className="p-1">
                  <Button type="submit" className="button-login-lg mt-4 ">
                    LOGIN
                  </Button>
                </div>
                <a
                  href="/#"
                  className=" forgot-password-lg text-decoration-none mt-2"
                >
                  Forgot password?
                </a>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
