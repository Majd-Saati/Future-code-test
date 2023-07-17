import { Outlet, useNavigate } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import withGuard from "../util/withGuard";
import { useEffect } from "react";


const RootLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } 
  }, [navigate]);

  return (
    <Container>
      <Header />
      <Row>
        <Col xs={{ span: 8, offset: 2 }}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default withGuard(RootLayout);
