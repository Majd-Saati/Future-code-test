import {
  Col,
  Button,
  Row,
  Container,
  Card,
  Form,
  Image,
} from "react-bootstrap";
import { useFormik } from "formik";
import { LoginSchema } from "../util/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { loginHandler } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import futurelogo from "../assets/Futrelogo.jpeg";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      dispatch(loginHandler({ phone: values.phone, password: values.password }))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          alert(error.mesaage);
        });
    },
  });
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Loading loading={loading} error={error}>
              <div className="border border-3 border-primary"></div>
              <Card className="shadow">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <Image src={futurelogo} className="w-25" />
                    <h2 className="fw-bold mb-2 text-uppercase ">
                      Future Code Test
                    </h2>
                    <p className=" mb-5">
                      Please enter your phone and password!
                    </p>
                    <div className="mb-3">
                      <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">Phone</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="Enter number"
                            name="phone"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            isInvalid={!!formik.errors.phone}
                          />

                          <Form.Control.Feedback type="invalid">
                            {formik.errors.phone}
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            isInvalid={!!formik.errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                          </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox"
                        >
                          <p className="small">
                            <a className="text-primary" href="#!">
                              Forgot password?
                            </a>
                          </p>
                        </Form.Group>
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            Login
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                        <p className="mb-0  text-center">
                          Don't have an account?{" "}
                          <a href="{''}" className="text-primary fw-bold">
                            Sign Up
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Loading>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
