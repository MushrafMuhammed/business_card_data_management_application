import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BASE_URL } from "../../constants/urls";
import { useNavigate } from "react-router";

function AuthForm() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const [existingUser, setExistingUser] = useState(true);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("name", registerData.name);
    formdata.append("email", registerData.email);
    formdata.append("password", registerData.password);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(BASE_URL + "api/user_registration", requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("email", loginData.email);
    formdata.append("password", loginData.password);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(BASE_URL + "api/user_login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        // Store user data in sessionStorage
        if (result.success){
            sessionStorage.setItem("user",JSON.stringify(result.success));
            navigate("/")
        }
      })
      .catch((error) => console.error(error));
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  return (
    <Container>
      {existingUser && (
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h2>Login</h2>
            <Form onSubmit={handleLoginSubmit}>
              <label htmlFor="username">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleLoginChange}
                value={loginData.email}
              />
              <label htmlFor="password my-3">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleLoginChange}
                value={loginData.password}
              />
              <button type="submit" className="btn btn-primary w-100 mt-4">
                Login
              </button>
            </Form>
          </Col>
        </Row>
      )}

      {!existingUser && (
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <h2>Register</h2>
            <Form onSubmit={handleRegisterSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleRegisterChange}
                value={registerData.name}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleRegisterChange}
                value={registerData.email}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleRegisterChange}
                value={registerData.password}
              />
              <button type="submit" className="btn btn-primary w-100 mt-4">
                Register
              </button>
            </Form>
          </Col>
        </Row>
      )}
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <span>
            {existingUser
              ? "Do not have an account?"
              : "Already have an account?"}
          </span>
          <a
            className="mx-3 text-primary"
            onClick={() => {
              setExistingUser(!existingUser);
            }}
          >
            {existingUser ? "Register Now" : "Login Now"}
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthForm;
