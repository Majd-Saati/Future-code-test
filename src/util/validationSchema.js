import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  phone: Yup.number().required("Phone is required"),
  password: Yup.number().required("Password is required"),
});


export const AddSchema = Yup.object().shape({
  type :Yup.string().required("Type is required"),
  title_ar :Yup.string().required("Arabic title is required"),
  title_en :Yup.string().required("English title is required"),
  description_ar :Yup.string().required("Arabic discription is required"),
  description_en :Yup.string().required("English discription is required"),
  link :Yup.string(),
  image :Yup.string().required("image is required"),
  store :Yup.string()
});
