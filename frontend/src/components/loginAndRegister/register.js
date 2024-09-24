import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

function RegisterModal({ show, handleClose }) {
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const { data: res } = await axios.post("/api/users/register", data);

      console.log(res.message);
      handleClose();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} dir="rtl" centered>
      <Modal.Header className="justify-content-center">
        <Modal.Title>הרשמה</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>שם מלא</Form.Label>
            <Form.Control
              type="text"
              placeholder="שם מלא"
              name="userName"
              value={data.userName}
              autoFocus
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>כתובת אימייל</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={data.email}
              placeholder="name@example.com"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>סיסמה</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={data.password}
              placeholder="בחר סיסמא"
              onChange={handleChange}
            />
          </Form.Group>

          {error && <div>{error}</div>}

          <Modal.Footer className="justify-content-center">
            <Button variant="secondary" onClick={handleClose}>
              ביטול
            </Button>
            <Button type="submit" variant="primary">
              צור חשבון
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;
