import { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { BASE_URL } from "../../constants/urls";

const FileUpload = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState(null);

  function handelImage(e) {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  }

  const handleSubmit = () => {
    console.log("tested");
    const formdata = new FormData();
    formdata.append("card_img", image);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      BASE_URL+"api/extract_business_card_details",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setName(result.name);
        setProfession(result.profession);
        setEmail(result.email);
        setPhone(result.phone);
        setAddress(result.address);
        setWebsite(result.website);
        setLogo(result.logo_path);
      })
      .catch((error) => console.error(error));
  };

  const handleUpload = () =>{
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("profession", profession);
      formdata.append("email", email);
      formdata.append("phone", phone);
      formdata.append("website", website);
      formdata.append("address", address);
      formdata.append("logo", logo);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow"
      };

      fetch(BASE_URL+"api/upload_cart_details", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
  }



  return (
    <>
      <div>
        <div className="container">
          <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
            <Form.Label column sm="6">
              Upload Card image:
            </Form.Label>
            <Col sm="6">
              <Form.Control type="file" size="sm" onChange={handelImage} />
            </Col>

            <Button variant="dark" className="w-25" onClick={handleSubmit}>
              Upload
            </Button>
          </Form.Group>
        </div>
      </div>
      {logo && (
        <Container>
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <Row>
                <Col md={12}>
                  <label>Name:</label>{" "}
                  <input
                    type="text"
                    className=""
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    value={name}
                  />
                </Col>
                <Col md={12}>
                  <label>Profession:</label>{" "}
                  <input
                    type="text"
                    className=""
                    onChange={(event) => {
                      setProfession(event.target.value);
                    }}
                    value={profession}
                  />
                </Col>
                <Col md={12}>
                  <label>Email:</label>{" "}
                  <input
                    type="text"
                    className=""
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                    value={email}
                  />
                </Col>
                <Col md={12}>
                  <label>Phone:</label>{" "}
                  <input
                    type="text"
                    className=""
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                    value={phone}
                  />
                </Col>
                <Col md={12}>
                  <label>Address:</label>{" "}
                  <input
                    type="text"
                    className=""
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                    value={address}
                  />
                </Col>
                <Col md={12}>
                  <label>Website:</label>{" "}
                  <input
                    type="text"
                    className=""
                    onChange={(event) => {
                      setWebsite(event.target.value);
                    }}
                    value={website}
                  />
                </Col>
                <Col md={12}>
                  <label>Logo:</label>{" "}
                  <img src={`${BASE_URL}${logo}`} alt="logo_img" />
                </Col>
              </Row>
            </Col>
            <Col md={3}></Col>
          </Row>
          <Button variant="primary" className="w-25" onClick={handleUpload}>
            Submit
          </Button>
        </Container>
      )}
    </>
  );
};

export default FileUpload;
