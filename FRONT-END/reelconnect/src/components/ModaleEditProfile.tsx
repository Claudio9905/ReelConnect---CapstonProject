import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { editMyProfile } from "../redux/actions/actions";
import { useState } from "react";
import type { AppDispatch } from "../redux/store";

type ModalEditProfileProps = {
  onClose: () => void;
  onShow: boolean;
};

const ModaleEditProfile: React.FC<ModalEditProfileProps> = ({
  onClose,
  onShow,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [editForm, setEditform] = useState({
    nome: "",
    cognome: "",
    username: "",
    eta: 0,
    dataDiNascita: "",
    sesso: "",
    email: "",
  });

  const editSubmit = (e) => {
    e.preventDefault();
    dispatch(editMyProfile(editForm));
  };

  return (
    <>
      <Modal show={onShow} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={onClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModaleEditProfile;
