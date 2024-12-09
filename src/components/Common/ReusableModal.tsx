/*import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type ReusableModalProps = {
  show: boolean;
  title: string;
  body: string;
  onClose: () => void;
  onConfirm: () => void;
};

const ReusableModal: React.FC<ReusableModalProps> = ({
  show,
  title,
  body,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Annuler
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReusableModal;*/
