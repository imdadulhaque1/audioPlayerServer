import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is missing!")
    .min(3, "Name is too short!")
    .max(50, "Name is too Long!"),
  email: yup
    .string()
    .email()
    .required("Email is missing!")
    .email("Invalid email address"),
  password: yup
    .string()
    .trim()
    .required("Password is missing!")
    .min(6, "Password is too short!")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#\$%\^&\*])[a-zA-Z\d!@#\$%\^&\*]+$/,
      "Password is too simple!"
    ),
});
