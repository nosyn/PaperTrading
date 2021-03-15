import React from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";

// Apollo Hooks
import { useMutation } from "@apollo/client";
import LOGIN_USER from "../../graphql/mutations/LOGIN_USER";

// React hook forms
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Yup for validation
import * as yup from "yup";

// Material UI
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core";
import {
  LockOutlined as LockOutlinedIcon,
  FavoriteOutlined as FavoriteOutlinedIcon,
} from "@material-ui/icons/";
import { red } from "@material-ui/core/colors";

// Schema validation utils
export const schemaValidation = yup.object().shape({
  email: yup
    .string()
    .email("* Has to be an email")
    .required("* Email is required"),
  password: yup.string().required("* Password is required"),
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  heart: {
    color: red[900],
  },
  errorMessage: {
    color: red[900],
    margin: theme.spacing(1, 0, 1, 0),
  },
}));

export const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();

  // Top hooks
  // *Apollo hooks
  const [registerUser, { error }] = useMutation(LOGIN_USER, {
    onCompleted: () => {
      history.push("/cards");
    },
    onError: () => {},
  });
  // *form hooks
  const { handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  // Submit handler
  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    registerUser({
      variables: {
        input: userInfo,
      },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                error={!!errors?.email?.message}
                helperText={errors?.email?.message}
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                defaultValue=""
                control={control}
                as={<TextField />}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                error={!!errors?.password?.message}
                helperText={errors?.password?.message}
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                defaultValue=""
                control={control}
                as={<TextField />}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid item xs={12}>
            <Typography
              data-testid="error-message"
              className={classes.errorMessage}
            >
              {error?.message}
            </Typography>
          </Grid>
          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink to="/register">
                Don't have an account? Sign up.
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Typography variant="body2" color="textPrimary" align="center">
          {"Made with  "}
          <FavoriteOutlinedIcon className={classes.heart} />
          {" by "}
          <Link color="inherit" href="https://github.com/biem97">
            Son Nguyen
          </Link>
          {` © ${new Date().getFullYear()}.`}
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
