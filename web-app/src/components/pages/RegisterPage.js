import React, { useEffect } from "react";
import { useHistory, Link as RouterLink } from "react-router-dom";

// Components
import Footer from "../layouts/Footer";

// Apollo Hooks
import { useMutation } from "@apollo/client";
import REGISTER_USER from "../../graphql/mutations/REGISTER_USER";
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
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Paper,
  makeStyles,
} from "@material-ui/core";
import {
  LockOpenOutlined as LockOpenOutlinedIcon,
  FavoriteOutlined as FavoriteOutlinedIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@material-ui/icons/";
import { red } from "@material-ui/core/colors";

// Redux
import { userSelector } from "../../state/slices/userSlice";
import { useSelector } from "react-redux";

// Schema validation utils
export const schemaValidation = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Has to be an email").required("Email is required"),
  password: yup.string().required("Password is required"),
  checkbox: yup.bool().oneOf([true], "You must agree to register!!!"),
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
    margin: theme.spacing(1, 0, 0, 0),
  },
}));

export const RegisterPage = () => {
  // Top hooks
  const classes = useStyles();
  const history = useHistory();
  const userState = useSelector(userSelector);

  // *Apollo hooks
  const [registerUser, { error }] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      history.push("/login");
    },
    onError: () => {},
  });
  // *form hooks
  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  // Submit handler
  const onSubmit = (data) => {
    const userInfo = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
    };
    registerUser({
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
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              error={!!errors?.firstName?.message}
              helperText={errors.firstName?.message}
              name="firstName"
              autoComplete="fname"
              variant="outlined"
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              defaultValue=""
              control={control}
              as={<TextField className={classes.textField} />}
            />

            <Controller
              error={!!errors?.lastName?.message}
              helperText={errors.lastName?.message}
              variant="outlined"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              defaultValue=""
              control={control}
              as={<TextField className={classes.textField} />}
            />

            <Controller
              error={!!errors?.email?.message}
              helperText={errors.email?.message}
              variant="outlined"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              defaultValue=""
              control={control}
              as={<TextField className={classes.textField} />}
            />

            <Controller
              error={!!errors?.password?.message}
              helperText={errors.password?.message}
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
            <FormControlLabel
              name="checkboxLabel"
              control={
                <Checkbox
                  name="checkbox"
                  icon={<FavoriteBorderIcon />}
                  checkedIcon={<FavoriteIcon />}
                  color="primary"
                />
              }
              label="I will have fun :P"
              inputRef={register}
            />
            <Grid item xs={12}>
              <Typography
                data-testid="error-message"
                className={classes.errorMessage}
              >
                {errors?.checkbox?.message || error?.message}
              </Typography>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <RouterLink to="/">Already have an account? Sign in</RouterLink>
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

export default RegisterPage;
