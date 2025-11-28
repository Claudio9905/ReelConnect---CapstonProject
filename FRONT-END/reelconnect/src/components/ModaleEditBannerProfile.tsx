import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { useState } from "react";
import { updateMyBannerProfile } from "../redux/actions/actions";
import { Button, Form, FormControl, FormGroup, Modal } from "react-bootstrap";

type ModaleBannerProfile = {
  onClose: () => void;
  onShow: boolean;
};

const ModaleEditBannerProfile: React.FC<ModaleBannerProfile> = ({
  onClose,
  onShow,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  //   const myProfile = useSelector((state: RootState) => {
  //     return state.myProfile.myProfile as BodyUser;
  //   });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const editSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFile) {
      formData.append("bannerUrl", selectedFile);
    }
    dispatch(updateMyBannerProfile(formData));
  };

  return (
    <>
      <Modal id="modal-main-profile" show={onShow} onHide={onClose}>
        <Modal.Header id="modal-header-profile">
          <Modal.Title>Modifica la tua immagine di copertina</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-profile">
          <Form
            className="d-flex flex-column p-3 gap-3"
            onSubmit={(e) => {
              editSubmit(e);
              onClose();
            }}
          >
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

export default ModaleEditBannerProfile;
