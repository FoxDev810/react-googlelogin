import React, { useEffect } from 'react'
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LoadingButton from "@material-ui/lab/LoadingButton";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import BoxedLayout from "../../core/components/BoxedLayout";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";

import { login } from '../../redux/actions/authAction'
import { RootStore } from '../../utils/TypeScript';
import { useTypedDispatch, useTypedSelector } from '../../redux/store';
import GoogleAuth from '../../core/components/googleAuth';

const Login = () => {
  const { auth } = useTypedSelector((state: RootStore) => state)
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { t } = useTranslation();

  useEffect(() => {
    if (auth.isAuthenticated === true) {
      navigate(`/${process.env.PUBLIC_URL}/admin`)
    }
  },[auth.isAuthenticated, navigate])

  const handleLogin = (email: string, password: string) => {
    const userLogin = { email, password };
    dispatch(login(userLogin))
      .then(() => {
        snackbar.success(t("auth.login.notifications.success"));
      })
      .catch(() => {
        snackbar.error(t("common.errors.unexpected.subTitle"));
      })
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("common.validations.email"))
        .required(t("common.validations.required")),
      password: Yup.string()
        .min(8, 'Password must be 8 characters long')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol')
        .required(t("common.validations.required")),

    }),
    onSubmit: (values) => handleLogin(values.email, values.password),
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(./img/startup.svg)",
          backgroundRepeat: "no-repeat",
          bgcolor: "background.default",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} square>
        <BoxedLayout>
          <Typography component="h1" variant="h5">
            {t("auth.login.title")}
          </Typography>
          <Box
            component="form"
            marginTop={3}
            noValidate
            onSubmit={formik.handleSubmit}
          >
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              id="email"
              label={t("auth.login.form.email.label")}
              name="email"
              autoComplete="email"
              disabled={auth.loading}
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              variant="filled"
              required
              fullWidth
              name="password"
              label={t("auth.login.form.password.label")}
              type="password"
              id="password"
              autoComplete="current-password"
              disabled={auth.loading}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box sx={{ textAlign: "right" }}>
              <Link
                component={RouterLink}
                to={`/${process.env.PUBLIC_URL}/forgot-password`}
                variant="body2"
              >
                {t("auth.login.forgotPasswordLink")}
              </Link>
            </Box>
            <div style={{textAlign:"right"}}>
              <GoogleAuth/>
            </div>
            <LoadingButton
              type="submit"
              fullWidth
              loading={auth.loading}
              variant="contained"
              sx={{ mt: 3 }}
            >
              {t("auth.login.submit")}
            </LoadingButton>
            <Button
              component={RouterLink}
              to={`/${process.env.PUBLIC_URL}/register`}
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {t("auth.login.newAccountLink")}
            </Button>
          </Box>
        </BoxedLayout>
      </Grid>
    </Grid>
  );
};

export default Login;
