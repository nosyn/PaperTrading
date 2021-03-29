import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

// Material UI
import { MenuItem, Menu, IconButton } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

// Apollo
import { useMutation } from "@apollo/client";
import LOGOUT_USER from "../../graphql/mutations/LOGOUT_USER";

// Redux
import { useDispatch } from "react-redux";
import { getUserFailure } from "../../state/slices/userSlice";

const UserMenu = ({ setOpen }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  // Redux
  const dispatch = useDispatch();
  const [logout] = useMutation(LOGOUT_USER, {
    onCompleted: () => {
      dispatch(getUserFailure());
      setOpen(false);
      history.push("/login");
    },
    onError: (error) => {
      console.log("error when log out: ", error);
    },
  });

  return (
    <div data-testid="user-menu">
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            logout();
          }}
        >
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
};

UserMenu.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default UserMenu;
