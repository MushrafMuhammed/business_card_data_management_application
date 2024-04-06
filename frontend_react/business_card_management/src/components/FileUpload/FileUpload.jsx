import { useState } from "react";
import { Button, Col, Form, Row, Container } from "react-bootstrap";
import { BASE_URL } from "../../constants/urls";

const FileUpload = () => {
  const [image, setImage] = useState("");
  const [card, setCard] = useState(null);
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

    fetch(BASE_URL + "api/extract_business_card_details", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setCard(result.card);
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

  const handleUpload = () => {
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
      redirect: "follow",
    };

    fetch(BASE_URL + "api/upload_cart_details", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  };

  return (
    <>
    {/* Card upload */}
      <Container>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            <Row className="justify-content-center mt-5">
              <Col md={12}>
                <h4>Upload Business Card:</h4>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <label>Upload Card image:</label>{" "}
                <input
                  type="file"
                  className="form-control"
                  onChange={handelImage}
                />
              </Col>
            </Row>
          </Col>
          <Col md={3}></Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md={6}>
            <Button variant="primary" className="w-100" onClick={handleSubmit}>
              Upload
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Preview section */}
      {logo && (
        <Container>
          
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <Row className="justify-content-center mt-5">
                <Col md={12}>
                  <h4>Preview Section:</h4>
                </Col>
              </Row>
              <Row>
              <Col md={12}>
                  <label>Card:</label>{" "}
                  <img src={`${BASE_URL}${card}`} className="form-control" style={{ maxHeight: "200px" }} alt="card_img" />
                </Col>
                <Col md={12}>
                  <label>Name:</label>{" "}
                  <input
                    type="text"
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
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
                    className="form-control"
                    onChange={(event) => {
                      setWebsite(event.target.value);
                    }}
                    value={website}
                  />
                </Col>
                <Col md={12}>
                  <label>Logo:</label>{" "}
                  <img src={`${BASE_URL}${logo}`} className="form-control" style={{ maxWidth: "50%" ,maxHeight: "200px" }} alt="logo_img" />
                </Col>
              </Row>
            </Col>
            <Col md={3}></Col>
          </Row>
          <Row className="justify-content-center mt-2">
            <Col md={6}>
              <Button
                variant="danger"
                className="w-100"
                onClick={handleUpload}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default FileUpload;
