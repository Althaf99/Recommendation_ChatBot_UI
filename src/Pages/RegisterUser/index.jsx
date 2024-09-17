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

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    setInputPicture(file);

    // Preview the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPicturePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputPicture) {
      console.error("Please upload a picture.");
      return;
    }

    // Read the picture as a base64 string
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Picture = reader.result; // This should include the prefix "data:image/png;base64,..."

      // Construct the JSON payload
      const payload = {
        username: inputUsername,
        email: inputEmail,
        password: inputPassword,
        picture: base64Picture, // Send the base64 data with the prefix
      };

      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/register",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        console.log(response.data);
      } catch (error) {
        console.error("Error registering user:", error);
      }
    };

    reader.readAsDataURL(inputPicture); // Read the file as a data URL
  };

  const disableLogin =
    inputUsername.length > 0 &&
    inputPassword.length > 0 &&
    inputEmail.length > 0 &&
    inputPicture
      ? false
      : true;

  return (
    <>
      <Modal
        show={showDialogBox}
        onHide={() => setShowDialogBox(false)}
        dialogClassName="modal-100w"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Register User
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {show ? (
              <Alert
                className="mb-4"
                variant="danger"
                onClose={() => setShow(false)}
                dismissible
              >
                Incorrect username or password.
              </Alert>
            ) : (
              <div />
            )}
            <Form.Group className="mb-4" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={inputUsername}
                placeholder="Username"
                onChange={(e) => setInputUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={inputEmail}
                placeholder="Email"
                onChange={(e) => setInputEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={inputPassword}
                placeholder="Password"
                onChange={(e) => setInputPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="formPicture">
              <Form.Label>Upload Picture</Form.Label>
              <Form.Group controlId="formFile" className="mb-4">
                <Form.Control
                  type="file"
                  onChange={handlePictureChange}
                  required
                />
              </Form.Group>
              {picturePreview && (
                <div className="mt-3 center">
                  <img
                    src={picturePreview}
                    alt="Profile Preview"
                    style={{
                      width: "250px",
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            {!loading ? (
              <Button
                className="w-100"
                variant="primary"
                type="submit"
                disabled={disableLogin}
              >
                Sign Up
              </Button>
            ) : (
              <Button
                className="w-100"
                variant="primary"
                type="submit"
                disabled
              >
                Logging In...
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
export default RegisterUser;
