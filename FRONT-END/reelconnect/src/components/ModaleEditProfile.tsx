import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { editMyProfile } from "../redux/actions/actions";
import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../redux/store";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import type BodyUser from "../types/bodyUser";

type ModalEditProfileProps = {
  onClose: () => void;
  onShow: boolean;
};

const ModaleEditProfile: React.FC<ModalEditProfileProps> = ({
  onClose,
  onShow,
}) => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [username, setUsername] = useState("");
  const [eta, setEta] = useState<number | undefined>(undefined);
  const [dataDiNascita, setDataDiNascita] = useState("");
  const [sesso, setSesso] = useState("");
  const [email, setEmail] = useState("");
  // const [avatarImage, setAvatarImage] = useState(new FormData());
  // const [bannerImage, setBannerImage] = useState(new FormData());

  // const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  // const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const myProfile = useSelector((state: RootState) => {
    return state.myProfile.myProfile as BodyUser;
  });
  const dispatch = useDispatch<AppDispatch>();

  const editForm = {
    nome: nome,
    cognome: cognome,
    username: username,
    eta: eta,
    dataDiNascita: dataDiNascita,
    sesso: sesso,
    email: email,
  };

  const editSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editMyProfile(editForm));
  };

  useEffect(() => {
    if (onShow && myProfile) {
      setNome(myProfile.nome);
      setCognome(myProfile.cognome);
      setUsername(myProfile.username);
      setEta(myProfile.eta);
      setDataDiNascita(myProfile.dataDiNascita);
      setSesso(myProfile.sesso);
      setEmail(myProfile.email);
    }
  }, [onShow, myProfile]);

  return (
    <>
      <Modal id="modal-main-profile" show={onShow} onHide={onClose}>
        <Modal.Header id="modal-header-profile">
          <Modal.Title>Modifica il tu profilo</Modal.Title>
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
                type="text"
                placeholder={myProfile.nome}
                className="input-form"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                }}
                minLength={2}
                maxLength={20}
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl
                type="text"
                placeholder={myProfile.cognome}
                className="input-form"
                value={cognome}
                onChange={(e) => {
                  setCognome(e.target.value);
                }}
                minLength={2}
                maxLength={20}
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl
                type="text"
                placeholder={myProfile.username}
                className="input-form"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                minLength={2}
                maxLength={20}
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl
                type="number"
                placeholder={`${myProfile.eta}`}
                className="input-form"
                value={eta}
                onChange={(e) => {
                  setEta(Number(e.target.value));
                }}
                min={13}
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl
                type="date"
                placeholder={myProfile.dataDiNascita}
                className="input-form"
                value={dataDiNascita}
                onChange={(e) => {
                  setDataDiNascita(e.target.value);
                }}
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl
                type="text"
                placeholder={myProfile.sesso}
                className="input-form"
                value={sesso}
                onChange={(e) => {
                  setSesso(e.target.value);
                }}
                minLength={2}
                maxLength={20}
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <FormControl
                type="email"
                placeholder={myProfile.email}
                className="input-form"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                minLength={2}
                maxLength={50}
              ></FormControl>
            </FormGroup>
            {/* <FormGroup>
              <h3>Immagine profilo :</h3>
              <FormControl
                type="file"
                accept="image/*"
                className="input-form"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files?.[0];
                  if (file) {
                    const formData = new FormData();
                    formData.append("avatarImage", file);
                    setAvatarImage(formData);
                    setAvatarPreview(URL.createObjectURL(file));
                  }
                }}
              ></FormControl>
              {avatarPreview && (
                <div>
                  <img
                    src={avatarPreview}
                    alt="anteprima avatar"
                    className="img-fluid w-50 mt-4 border border-1 border-light rounded-4"
                  />
                </div>
              )}
            </FormGroup>
            <FormGroup>
              <h3>Immagine di copertina :</h3>
              <FormControl
                type="file"
                accept="image/*"
                className="input-form"
                onChange={(e) => {
                  const target = e.target as HTMLInputElement;
                  const file = target.files?.[0];
                  if (file) {
                    const formData = new FormData();
                    formData.append("bannerImage", file);
                    setBannerImage(formData);
                    setBannerPreview(URL.createObjectURL(file));
                  }
                }}
              ></FormControl>
              {bannerPreview && (
                <div>
                  <img
                    src={bannerPreview}
                    alt="anteprima del banner"
                    className="img-fluid w-75 mt-4 border border-1 border-light rounded-4"
                  />
                </div>
              )}
            </FormGroup> */}
            <Modal.Footer className="modal-footer-profile">
              {/* <Button variant="secondary" onClick={onClose}>
            Close
          </Button> */}
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
              <Button variant="primary" onClick={onClose}>
                Close
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModaleEditProfile;
