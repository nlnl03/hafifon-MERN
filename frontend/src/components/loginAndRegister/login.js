import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./style.css";
function LoginModal({ show, handleClose, basePath, setUserData }) {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    console.log(data);
  };

  const handleLogin = async (event) => {
    handleClick();
    event.preventDefault();

    try {
      const { data: res } = await axios.post("/api/users/login", data);
      console.log(res.message);
      localStorage.setItem("authToken", res.token);
      console.log(res.userName);
      localStorage.setItem("userName", res.userName);

      const decoded = JSON.parse(atob(res.token.split(".")[1]));
      setUserData({ token: res.token, roles: decoded.roles });

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
    setLoading(false);
  };
  const handleClick = () => setLoading(true);

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        setError("");
      }}
      dir="rtl"
      centered
    >
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

          <Modal.Footer className="justify-content-center">
            {error && <div className="error-msg">{error}</div>}

            <Button
              variant="secondary"
              onClick={() => {
                handleClose();
                setError("");
              }}
            >
              ביטול
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "מתחבר…" : "התחבר"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
