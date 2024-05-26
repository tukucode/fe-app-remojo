import { Modal, Button, Spinner } from "react-bootstrap";
export default function Dialog(props) {
  const {
    alignText = 'text-center',
    isShow = false,
    isLoading = false,
    labelCancel = "Cancel",
    labelSave = "Yes",
    onCancel = () => { },
    onSave = () => { },
    children,
  } = props;

  return (
    <Modal show={isShow} backdrop="static" keyboard={false} centered>
      <Modal.Body className={`p-4 ${alignText}`}>
        {children}

        <div className="d-flex justify-content-evenly align-items-center">
          <Button
            variant="danger"
            className="w-100 rounded-0"
            onClick={onCancel}
          >
            {labelCancel}
          </Button>

          <div className="mx-2" />

          <Button
            disabled={isLoading}
            variant="success"
            className="w-100 rounded-0"
            onClick={onSave}
          >
            {isLoading ? (
              <Spinner size="sm" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              labelSave
            )}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
