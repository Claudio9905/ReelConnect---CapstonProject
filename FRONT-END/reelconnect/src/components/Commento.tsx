import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import type BodyCommentoGet from "../types/BodyCommentoGet";
import iconaProfiloCommento from "../assets/img/pellicola-sfondo-login.png";

type showCommenti = {
  onClose: () => void;
};

const Commento: React.FC<showCommenti> = ({ onClose }) => {
  const commento = useSelector((state: RootState) => {
    return state.allCommenti.commento as BodyCommentoGet[];
  });
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(()=>{
  //   dispatch(getCommentiByPost())
  // },[])

  return (
    <>
      <Container id="container-commento" className="d-flex flex-column">
        <Row id="row-commenti" className="d-flex flex-column g-3 ">
          <Col xs={12}>
            <div>
              <Form className="form-commento d-flex align-items-center">
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="inserisci un commento"
                    className="input-form-commento mt-3"
                    required
                    minLength={1}
                  ></FormControl>
                </FormGroup>
                <Button type="submit" id="button-form-commento">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-right-circle-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                  </svg>
                </Button>
              </Form>
            </div>
          </Col>
          <Col
            xs={12}
            className="d-flex flex-column justify-content-between align-items-start gap-3 "
          >
            <div className="me-3 d-flex align-items-center justify-content-start">
              <img
                src={iconaProfiloCommento}
                alt="icona profilo"
                className="img-fluid icona-profilo-commento"
              />
              <h6>Nome profile</h6>
              <h6 className="fs-6">YYYY/MM/DD</h6>
            </div>
            <p className="descrizione-commento">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum,
              ea ipsam a non quos eveniet maiores ex, nisi, adipisci earum
              molestiae similique fuga. Enim sint itaque quisquam aut neque
              recusandae.
            </p>
          </Col>
          <span className="separated-comment"></span>
        </Row>
        <Button onClick={onClose} className="button-close">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="25"
            fill="currentColor"
            className="bi bi-arrow-bar-up"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5"
            />
          </svg>
        </Button>
      </Container>
    </>
  );
};

export default Commento;
