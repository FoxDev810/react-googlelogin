import { useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Stack from "@material-ui/core/Stack";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import LandingLayout from "../components/LandingLayout";

import { RootStore } from '../../utils/TypeScript';


const Landing = () => {
  const { auth } = useSelector((state: RootStore) => state)
  const { t } = useTranslation();

  return (
    <LandingLayout>
      <main>
        <Box
          sx={{
            py: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              variant="h1"
              align="center"
              color="text.primary"
              marginBottom={4}
            >
              Welcome to here!
            </Typography>
            <Stack
              sx={{ pt: 3 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                component={RouterLink}
                to={`/${process.env.PUBLIC_URL}/register`}
                rel="noopener noreferrer"
                variant="outlined"
              >
                Sign-up
              </Button>
              {auth.user.token ? (
                <Button
                  component={RouterLink}
                  to={`/${process.env.PUBLIC_URL}/admin`}
                  variant="contained"
                >
                  {t("landing.cta.mainAuth", { name: auth.user.name })}
                </Button>
              ) : (
                <Button
                  component={RouterLink}
                  to={`/${process.env.PUBLIC_URL}/login`}
                  variant="contained"
                >
                  Sign-in
                </Button>
              )}
            </Stack>
          </Container>
        </Box>
      </main>
    </LandingLayout>
  );
};

export default Landing;
