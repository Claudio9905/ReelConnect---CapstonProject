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

const Login: React.FC = () => {
  return (
    <>
      <Container>
        <Row className="bg-dark p-3 ">
          <Col
            xs={12}
            md={12}
            lg={12}
            className=" d-flex flex-column col-login mt-4"
          >
            <div className="d-flex justify-content-center div-img-login">
              <img src={clapperboard} alt="logo-login" className="img-fluid" />
            </div>

            <div className="div-title">
              <div className=" d-flex justify-content-center ">
                <h1 className="title-login text-center">
                  LOGIN TO <br /> THE CINEVERSE
                </h1>
              </div>

              <Form className="d-flex flex-column align-items-center mt-3">
                <FormGroup className="d-flex flex-column gap-3 align-items-center">
                  <FormControl
                    type="text"
                    placeholder="USERNAME/EMAIL"
                    className="input-form "
                    required
                  ></FormControl>
                  <FormControl
                    type="password"
                    placeholder="PASSWORD"
                    className="input-form "
                    required
                  ></FormControl>
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
    </>
  );
};

export default Login;
