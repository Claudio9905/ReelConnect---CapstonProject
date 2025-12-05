import { useEffect, useState } from "react";
import { Button, Form, FormControl, FormGroup, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";

type propsTypes = {
  onShow: boolean;
  onClose: () => void;
  descrizione: string;
};

const ModaleEditPost: React.FC<propsTypes> = ({
  onShow,
  onClose,
  descrizione,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [descrizionePost, setDescrizionePost] = useState("");

  const editFormInfo = {
    descrizione: descrizionePost,
  };

  const editFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // dispatch(editMyPost(editFormInfo));
  };

  useEffect(() => {
    if (onShow) {
      setDescrizionePost(descrizione);
    }
  }, []);

  return (
    <>
      <Modal id="modal-main-profile" show={onShow} onHide={onClose}>
        <Modal.Header id="modal-header-profile">
          <Modal.Title>Modifica il tuo Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-profile">
          <Form
            className="d-flex flex-column p-3 gap-3"
            onSubmit={(e) => {
              editFormSubmit(e);
              onClose();
            }}
          >
            <FormGroup>
              <FormControl
                as="textarea"
                className="input-form"
                required
                value={descrizione}
                onChange={(e) => {
                  setDescrizionePost(e.target.value);
                }}
                minLength={2}
              ></FormControl>
            </FormGroup>

            <Modal.Footer className="modal-footer-profile">
              {/* <Button variant="secondary" onClick={onClose}>
            Close
          </Button> */}
              <Button
                type="submit"
                className=" bg-dark border border-1 border-light"
              >
                Salva
              </Button>
              <Button
                className=" bg-dark border border-1 border-light"
                onClick={onClose}
              >
                X
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModaleEditPost;
