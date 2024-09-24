import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./style.css";

function RegisterModal({ show, handleClose }) {
  const [isLoading, setLoading] = useState(false);

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
    handleClick();
    event.preventDefault();

    try {
      const { data: res } = await axios.post("/api/users/register", data);
      console.log(res.message);
      handleClose();
      resetData();
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

  const resetData = () => {
    setError("");
    setData({
      userName: "",
      email: "",
      password: "",
    });
  };

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
              {isLoading ? "יוצר חשבון..." : "צור חשבון"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterModal;
