import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./login.css";

import BackgroundImage from "../../pictures/background.jpg";
import Logo from "../../pictures/ChatbotIcon.jpg";
import RegisterUser from "../RegisterUser";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await delay(500);
    console.log(`Username :${inputUsername}, Password :${inputPassword}`);
    if (inputUsername !== "admin" || inputPassword !== "admin") {
      setShow(true);
    }
    setLoading(false);
  };

  const handlePassword = () => {};

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const disableLogin =
    inputUsername.length > 0 && inputPassword.length > 0 ? false : true;

  return (
    <>
      <div
        className="sign-in__wrapper"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
          <img
            className="img-thumbnail mx-auto d-block mb-3"
            src={Logo}
            alt="logo"
          />
          <div className="h4 mb-3 text-center">Sign In</div>
          {show ? (
            <Alert
              className="mb-3"
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
          {!loading ? (
            <Button
              className="w-100"
              variant="primary"
              type="submit"
              disabled={disableLogin}
            >
              Log In
            </Button>
          ) : (
            <Button className="w-100" variant="primary" type="submit" disabled>
              Logging In...
            </Button>
          )}
          <div className="d-flex justify-content-end">
            <Button
              className="w-30 register_button"
              variant="primary"
              onClick={() => setShowDialogBox(true)}
            >
              Register User
            </Button>
          </div>
        </Form>
      </div>
      <RegisterUser
        setShowDialogBox={setShowDialogBox}
        showDialogBox={showDialogBox}
      />
    </>
  );
};

export default Login;
