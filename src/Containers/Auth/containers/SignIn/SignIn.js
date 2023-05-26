import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import LogoImage from "../../../../assets/images/logo.png";
import { ROUTES } from "../../../../routes/constants";
import PrimaryButton from "../../../Common/Buttons/PrimaryButton";
import TextField from "../../../Common/TextField";
import { actions } from "../../store";
import styles from "./SignIn.module.scss";

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = {
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(3, "Password is too short - should be 3 chars minimum")
      .max(100, "Your password is very big!")
      .required("Password is required"),
  };
  return (
    <div className={styles.container__inner}>
      <div className={styles["login__container"]}>
        <img src={LogoImage} alt="logo" className={styles.logo} />
        <Formik
          initialValues={initialValues}
          validationSchema={yup.object().shape(validationSchema)}
          onSubmit={async (values) => {
            dispatch(
              actions.SIGN_IN.REQUEST(values, () =>
                navigate(ROUTES.DASHBOARD, { replace: true })
              )
            );
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles["login__form"]}>
              <Field
                name="email"
                id="email"
                label="Email"
                placeholder="Email"
                component={TextField}
                type="email"
                inputColor="white"
              />
              <Field
                name="password"
                id="password"
                label="Password"
                placeholder="Password"
                showPassword={true}
                component={TextField}
                type="password"
                inputColor="white"
              />
              <PrimaryButton width="100%" text="Accedi" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
