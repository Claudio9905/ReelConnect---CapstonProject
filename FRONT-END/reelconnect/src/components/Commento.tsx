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
import { useState } from "react";

type showCommenti = {
  onClose: () => void;
};

const Commento: React.FC<showCommenti> = ({ onClose }) => {
  const commento = useSelector((state: RootState) => {
    return state.allCommenti.commento as BodyCommentoGet[];
  });
  const dispatch = useDispatch<AppDispatch>();
  const [showSettingsComment, setshowSettingsComment] = useState(false);

  // useEffect(()=>{
  //   dispatch(getCommentiByPost())
  // },[])

  return (
    <>
      <Container id="container-commento" className="d-flex flex-column">
        <Row className="mb-3">
          <Col xs={12}>
            <div>
              <Form className="form-commento d-flex align-items-center justify-content-center">
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
                    width="22"
                    height="22"
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
        </Row>
        <Row id="row-commenti" className="d-flex flex-column g-3 flex-nowrap">
          <Col
            xs={12}
            className="d-flex flex-column justify-content-between align-items-start gap-3 "
          >
            <div className="me-3 d-flex align-items-center justify-content-between w-100">
              <img
                src={iconaProfiloCommento}
                alt="icona profilo"
                className="img-fluid icona-profilo-commento"
              />
              <h6 className="d-flex w-75">Nome profile</h6>
              <Button
                className="button-icon"
                onClick={() => {
                  setshowSettingsComment(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-three-dots"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                </svg>
              </Button>
              {showSettingsComment && (
                <div className="div-settings-commento d-flex flex-column">
                  <a href="/modaleEditCommento" className="edit-commento">
                    Modifica commento
                  </a>
                  <span className="separated-comment m-0"></span>
                  <a href="" onClick={() => {}} className="delete-commento">
                    Elimina commento
                  </a>
                  <Button
                    className="close-settings-button"
                    onClick={() => {
                      setshowSettingsComment(false);
                    }}
                  >
                    X
                  </Button>
                </div>
              )}
            </div>
            <p className="descrizione-commento">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum,
              ea ipsam a non quos eveniet maiores ex, nisi, adipisci earum
              molestiae similique fuga. Enim sint itaque quisquam aut neque
              recusandae.
            </p>
            <div className="text-end w-100">
              <h6 className="fs-6">YYYY/MM/DD</h6>
            </div>
            <span className="separated-comment"></span>
          </Col>
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
