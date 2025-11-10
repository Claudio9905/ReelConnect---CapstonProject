import {
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";

const Register: React.FC = () => {
  return (
    <>
      <Container>
        <Row>
          <Col xs={12}>
            <Form className="d-flex flex-column p-3">
              <FormGroup className="d-flex flex-column gap-3">
                <FormControl
                  type="text"
                  placeholder="Nome"
                  className="input-form"
                  required
                ></FormControl>
                <FormControl
                  type="text"
                  placeholder="Cognome"
                  className="input-form"
                  required
                ></FormControl>
                <FormControl
                  type="text"
                  placeholder="Username"
                  className="input-form"
                  required
                ></FormControl>
                <FormControl
                  type="number"
                  placeholder="Età"
                  className="input-form"
                  required
                ></FormControl>
                <FormControl
                  type="date"
                  placeholder="Data di nascità"
                  className="input-form"
                  required
                ></FormControl>
                <FormControl
                  type="email"
                  placeholder="E-mail"
                  className="input-form"
                  required
                ></FormControl>
                <FormControl
                  type="password"
                  placeholder="Password"
                  className="input-form"
                  required
                ></FormControl>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Register;
