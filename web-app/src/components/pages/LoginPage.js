import React, { useEffect } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";

// Components
import Footer from "../layouts/Footer";

// Apollo Hooks
import { useMutation } from "@apollo/client";
import LOGIN_USER from "../../graphql/mutations/LOGIN_USER";

// React hook forms
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Redux
import { getUserSuccess, userSelector } from "../../state/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

// Yup for validation
import * as yup from "yup";

// JWT decode
import jwt_decode from "jwt-decode";

// Material UI
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons/";

// Schema validation utils
export const schemaValidation = yup.object().shape({
  email: yup
    .string()
    .email("* Has to be an email")
    .required("* Email is required"),
  password: yup.string().required("* Password is required"),
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  textField: {
    margin: theme.spacing(1, 0, 1, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    color: theme.palette.colors.red,
    margin: theme.spacing(1, 0, 1, 0),
  },
}));

export const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const userState = useSelector(userSelector);

  // Top hooks
  // *Apollo hooks
  const [loginUser, { error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const decoded = jwt_decode(data?.loginUser?.jwtToken);
      dispatch(getUserSuccess(decoded));
      history.push("/");
    },
    onError: (error) => {
      console.log("error: ", error);
    },
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
    loginUser({
      variables: {
        input: userInfo,
      },
    });
  };

  // ! REDIRECT TO ROOT FOR NOW
  // TODO: find a way to use useLocation to forward back to the previous route
  useEffect(() => {
    if (userState.user) history.push("/dashboard");
  }, [history, userState]);

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
              autoFocus
              control={control}
              as={<TextField className={classes.textField} />}
            />

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
              as={<TextField className={classes.textField} />}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Typography
              data-testid="error-message"
              className={classes.errorMessage}
            >
              {error?.message}
            </Typography>
            <Grid container>
              <Grid item xs>
                <RouterLink to="#">Forgot password?</RouterLink>
              </Grid>
              <Grid item>
                <RouterLink to="/register">
                  Don't have an account? Sign up.
                </RouterLink>
              </Grid>
            </Grid>
          </form>
          <Box mt={5}>
            <Footer />
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
