import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const RegisterUser = ({ setShowDialogBox, showDialogBox }) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [inputPicture, setInputPicture] = useState(null);
  const [picturePreview, setPicturePreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setInputPicture(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPicturePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validatePassword = (password) => {
    const letterPattern = /[a-zA-Z]/;
    const symbolPattern = /[!@#$%^&*(),.?":{}|<>]/;
    return (
      password.length >= 5 &&
      letterPattern.test(password) &&
      symbolPattern.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(inputPassword)) {
      setPasswordError(
        "Password must be at least 5 letters long and contain at least one symbol."
      );
      return;
    }
    setPasswordError("");
    setLoading(true);

    const reader = new FileReader();
    reader.onloadend = async () => {
      const pictureData = reader.result;

      try {
        const response = await axios.post("http://127.0.0.1:5000/register", {
          username: inputUsername,
          email: inputEmail,
          password: inputPassword,
          picture: pictureData,
        });

        if (response.data.error) {
          setErrorMessage(response.data.error);
          setShow(true);
        } else {
          console.log("Registration successful");
          setShowDialogBox(false);
        }
      } catch (error) {
        console.error("Error registering user:", error);
        setErrorMessage("An error occurred during registration");
        setShow(true);
      }
      setLoading(false);
    };
    reader.readAsDataURL(inputPicture);
  };

  return (
    <Modal
      size="lg"
      show={showDialogBox}
      onHide={() => setShowDialogBox(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Register User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {show ? (
            <Alert
              className="mb-4"
              variant="danger"
              onClose={() => setShow(false)}
              dismissible
            >
              {errorMessage}
            </Alert>
          ) : (
            <div />
          )}
          {passwordError && (
            <Alert className="mb-4" variant="danger">
              {passwordError}
            </Alert>
          )}
          <Form.Group controlId="username" className="mb-4">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={inputUsername}
              placeholder="Username"
              onChange={(e) => setInputUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-4">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={inputEmail}
              placeholder="Email"
              onChange={(e) => setInputEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="password" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={inputPassword}
              placeholder="Password"
              onChange={(e) => setInputPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="picture" className="mb-4">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
            />
            {picturePreview && (
              <img
                src={picturePreview}
                alt="Profile Preview"
                style={{
                  width: "250px",
                  height: "250px",
                  objectFit: "cover",
                  marginTop: "10px",
                }}
              />
            )}
          </Form.Group>
          {!loading ? (
            <Button
              className="w-100"
              variant="primary"
              type="submit"
              disabled={
                !inputUsername || !inputEmail || !inputPassword || !inputPicture
              }
            >
              Register
            </Button>
          ) : (
            <Button className="w-100" variant="primary" type="submit" disabled>
              Registering...
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterUser;
