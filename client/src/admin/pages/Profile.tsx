import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSnackbar } from "../../core/contexts/SnackbarProvider";
import AdminAppBar from "../components/AdminAppBar";
import AdminToolbar from "../components/AdminToolbar";
import CircleProgressWidget from "../widgets/CircleProgressWidget";

import { logout } from "../../redux/actions/authAction";
import { RootStore } from "../../utils/TypeScript";
import { useTypedDispatch, useTypedSelector } from "../../redux/store";

const Profile = () => {
  const { auth } = useTypedSelector((state: RootStore) => state);
  const snackbar = useSnackbar();
  const { t } = useTranslation();
  const dispatch = useTypedDispatch();

  const { isAuthenticated, user } = auth;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <React.Fragment>
      <AdminAppBar>
        <AdminToolbar>
          <Link 
            to={`/${process.env.PUBLIC_URL}/`}
            onClick={handleLogout}
          >
            <Fab
              aria-label="logout"
              color="secondary"
              disabled={isAuthenticated}
            >
              <ExitToAppIcon />
            </Fab>
          </Link>
        </AdminToolbar>
      </AdminAppBar>
      <Grid container spacing={12}>
        <Grid item xs={12} md={4} marginTop={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              mb: 6,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "background.paper",
                mb: 3,
                height: 160,
                width: 160,
              }}
            >
              <PersonIcon sx={{ fontSize: 120 }} />
            </Avatar>
            <Typography
              component="div"
              variant="h4"
            >{`${user?.name}`}</Typography>
            <Typography variant="body2">{`${user?.email}`}</Typography>
          </Box>
          <CircleProgressWidget
            height={244}
            title={t("profile.completion.title")}
            value={75}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
