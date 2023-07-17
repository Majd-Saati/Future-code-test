import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useFormik } from "formik";
import { AddSchema } from "../util/validationSchema";
import { useDispatch, useSelector } from "react-redux";
import { editAd, fetchStores } from "../store/adsSlice";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";

const EditAdvertisment = () => {
  const { stores, loading, error } = useSelector((state) => state.ads);
  const [userToken, setUserToken] = useState("");
  const param = useParams()
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      type: "",
      title_ar: "",
      title_en: "",
      description_ar: "",
      description_en: "",
      image: null,
      store: "",
      link: "",
    },
    validationSchema: AddSchema,
    onSubmit: (values) => {
      // const id = Math.floor(Math.random() * 500);
      dispatch(
        editAd({
          id:param.id,
          userToken,
          title_ar: values.title_ar,
          title_en: values.title_en,
          description_ar: values.description_ar,
          description_en: values.description_en,
          tag: "tag",
          valid_to: "2023-5-1",
          store_id: values.store,
          // image: values.image,
        })
      )
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          alert(error.mesaage);
        });
    },
  });

  useEffect(() => {
    setUserToken(localStorage.getItem("token"));
    dispatch(fetchStores(userToken));
  }, [dispatch, userToken]);

  return (
    <Container>
      <Loading loading={loading} error={error}>
        <Form onSubmit={formik.handleSubmit}>
          <h1>Edit Advertisement</h1>
          <Form.Group>
            <Form.Label>Choose the type of advertisement:</Form.Label>
            <Form.Control
              as="select"
              name="type"
              onChange={formik.handleChange}
              value={formik.values.type}
              isInvalid={!!formik.errors.type}
            >
              <option value="">Select an option</option>
              <option value="image">Image</option>
              <option value="store">Store</option>
              <option value="link">Link</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.type}
            </Form.Control.Feedback>
          </Form.Group>

          {formik.values.type === "image" && (
            <Form.Group>
              <Form.Label>Upload an image:</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="image"
                onChange={(e) =>
                  formik.setFieldValue("image", e.currentTarget.files[0])
                }
                isInvalid={!!formik.errors.image}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.image}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          {formik.values.type === "store" && (
            <>
              <Form.Group>
                <Form.Label>Upload an image:</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) =>
                    formik.setFieldValue("image", e.currentTarget.files[0])
                  }
                  isInvalid={!!formik.errors.image}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.image}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Select a store:</Form.Label>
                <Form.Control
                  as="select"
                  name="store"
                  onChange={formik.handleChange}
                  value={formik.values.store}
                  isInvalid={!!formik.errors.store}
                >
                  <option value="">Select a store</option>
                  <option>1</option>
                  <option>12</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.store_name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.store}
                </Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          {formik.values.type === "link" && (
            <>
              <Form.Group>
                <Form.Label>Upload an image:</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={(e) =>
                    formik.setFieldValue("image", e.currentTarget.files[0])
                  }
                  isInvalid={!!formik.errors.image}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.image}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Enter a link:</Form.Label>
                <Form.Control
                  type="text"
                  name="link"
                  onChange={formik.handleChange}
                  value={formik.values.link}
                  isInvalid={!!formik.errors.link}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.link}
                </Form.Control.Feedback>
              </Form.Group>
            </>
          )}

          <Form.Group>
            <Form.Label>Title in Arabic</Form.Label>
            <Form.Control
              type="text"
              name="title_ar"
              onChange={formik.handleChange}
              value={formik.values.title_ar}
              isInvalid={!!formik.errors.title_ar}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.title_ar}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Title in English</Form.Label>
            <Form.Control
              type="text"
              name="title_en"
              onChange={formik.handleChange}
              value={formik.values.title_en}
              isInvalid={!!formik.errors.title_en}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.title_en}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description in Arabic</Form.Label>
            <Form.Control
              type="text"
              name="description_ar"
              onChange={formik.handleChange}
              value={formik.values.description_ar}
              isInvalid={!!formik.errors.description_ar}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description_ar}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description in English</Form.Label>
            <Form.Control
              type="text"
              name="description_en"
              onChange={formik.handleChange}
              value={formik.values.description_en}
              isInvalid={!!formik.errors.description_en}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description_en}
            </Form.Control.Feedback>
          </Form.Group>

          <Button className="mt-2 " type="submit">
            Edit Advertisement
          </Button>
        </Form>
      </Loading>
    </Container>
  );
};

export default EditAdvertisment;
