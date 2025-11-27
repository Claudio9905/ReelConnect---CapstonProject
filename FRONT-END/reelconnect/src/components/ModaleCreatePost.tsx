import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useState } from "react";
import { createAPost } from "../redux/actions/actions";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import type BodyUser from "../types/bodyUser";
import { Form, FormControl, FormGroup } from "react-bootstrap";

type ModalCreatePostProps = {
  onClose: () => void;
  onShow: boolean;
};

const ModaleCreatePost: React.FC<ModalCreatePostProps> = ({
  onClose,
  onShow,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const myProfile = useSelector((state: RootState) => {
    return state.myProfile.myProfile as BodyUser;
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [createForm, setCreateform] = useState({
    descrizione: "",
    utenteId: myProfile.id,
    imageFile: selectedFile,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const createPostSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("descrizione", createForm.descrizione);
    formData.append("utenteId", myProfile.id.toString());
    if (selectedFile) {
      formData.append("imageFile", selectedFile);
    }
    dispatch(createAPost(formData));
  };

  return (
    <>
      <Modal id="modal-main-profile" show={onShow} onHide={onClose}>
        <Modal.Header id="modal-header-profile">
          <Modal.Title>Crea il tuo Ciak!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-profile">
          <Form
            className="d-flex flex-column p-3 gap-3"
            onSubmit={(e) => {
              createPostSubmit(e);
              onClose();
            }}
          >
            <FormGroup>
              <h4 className=" fs-6">Aggiungi la tua descrizione: </h4>
              <FormControl
                as="textarea"
                className="input-form"
                value={createForm.descrizione}
                onChange={(e) => {
                  setCreateform({ ...createForm, descrizione: e.target.value });
                }}
                minLength={2}
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl
                type="file"
                accept="image/*"
                className="input-form"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files?.[0];
                  if (file) {
                    setSelectedFile(file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              ></FormControl>
              {imagePreview && (
                <div>
                  <img
                    src={imagePreview}
                    alt="anteprima dell'immagine caricata"
                    className="img-fluid w-100 mt-4 border border-1 border-light rounded-4"
                  />
                </div>
              )}
            </FormGroup>
            <Modal.Footer className="modal-footer-profile">
              {/* <Button variant="secondary" onClick={onClose}>
            Close
          </Button> */}
              <Button
                type="submit"
                className=" bg-dark border border-1 border-light"
              >
                Crea il post
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

export default ModaleCreatePost;
