import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { useState } from "react";
import { createAPost } from "../redux/actions/actions";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import type BodyUser from "../types/bodyUser";

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

  const [createForm, setCreateform] = useState({
    descrizione: "",
    utenteId: myProfile.id,
    imagePost: new FormData(),
  });

  const createPostSubmit = (e) => {
    e.preventDefault();
    dispatch(createAPost(createForm));
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
          <Button variant="primary" onClick={onClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModaleCreatePost;
