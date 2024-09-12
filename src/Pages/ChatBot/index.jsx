import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
  Navbar,
  Image,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import "./chatbot.css";
import Logo from "../../pictures/ChatbotIcon.jpg";
import headingLogo from "../../pictures/chatbotLogo.png";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sessionId = "unique-session-id"; // Replace with a dynamically generated session ID if needed.

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessage = {
      sender: "user",
      text: input,
    };

    setMessages([...messages, newMessage]);

    try {
      const response = await fetch("http://localhost:5005/send_message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          text: input,
        }),
      });

      const botResponses = await response.json();

      setMessages((prevMessages) => [
        ...prevMessages,
        ...botResponses.map((res) => ({ sender: "bot", text: res.text })),
      ]);
    } catch (error) {
      console.error("Error:", error);
      // Handle error in a user-friendly way
    }

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <Navbar className="bg-body-tertiary" bg="light" data-bs-theme="light">
        <Navbar.Brand>
          <div class="container text-center">
            <div class="row">
              <div class="col">
                <Image
                  // className="img-thumbnail mx-auto d-block mb-2"
                  src={headingLogo}
                  alt="logo"
                  roundedCircle
                  width="60"
                  height="60"
                />
              </div>
              <div class="col">
                <h1>Immigration Chatbot</h1>
              </div>
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <h5 style={{ paddingTop: "10px" }}>UserName</h5>
          <Navbar.Text className="account-section">
            <Image
              // className="img-thumbnail mx-auto d-block mb-2"
              src={Logo}
              alt="logo"
              roundedCircle
              width="60"
              height="60"
            />
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid className="vh-100 d-flex flex-column">
        <Row className="justify-content-center align-items-center flex-grow-1">
          <Card
            className="card-section"
            style={{ width: "100%", maxWidth: "90%" }}
          >
            <Card.Header>University Recommendation Chatbot</Card.Header>
            <Card.Body className="d-flex flex-column">
              <div className="flex-grow-1 chat-window p-3 border rounded shadow-sm overflow-auto">
                <div className="messages">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`message ${
                        message.sender === "user"
                          ? "user-message"
                          : "bot-message"
                      }`}
                    >
                      {message.text}
                    </div>
                  ))}
                </div>
              </div>
              <InputGroup className="mt-3">
                <FormControl
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button variant="primary" onClick={sendMessage}>
                  Send
                </Button>
              </InputGroup>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </>
  );
};
export default ChatBot;
