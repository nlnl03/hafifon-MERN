import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";

function LoginModal({ show, handleClose, basePath }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const { data: res } = await axios.post("/api/users/auth", data);
      console.log(res.message);
      localStorage.setItem("token", res.data);
      window.location = `/${basePath}/studyMaterials`;
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
        <Modal.Title>התחברות</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleLogin}>
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
              התחבר
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
