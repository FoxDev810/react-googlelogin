import { useSelector } from 'react-redux'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import { ReactComponent as WelcomeSvg } from "../../core/assets/welcome.svg";
import SvgContainer from "../../core/components/SvgContainer";
import { RootStore } from '../../utils/TypeScript';

const WelcomeWidget = () => {
  const { auth } = useSelector((state: RootStore) => state)
  const { t } = useTranslation();

  return (
    <Card elevation={0} sx={{ backgroundColor: "transparent", mb: 2 }}>
      <CardContent>
        <Typography component="div" gutterBottom variant="h1">
          {t("admin.home.welcome.title", { name: auth.user?.name })}
        </Typography>
        <Typography
          component="div"
          sx={{ fontWeight: 300, mb: 3 }}
          variant="h1"
        >
          {t("admin.home.welcome.subTitle")}
        </Typography>
        <Typography
          color="textSecondary"
          component="p"
          gutterBottom
          marginBottom={2}
          variant="subtitle1"
        >
          {t("admin.home.welcome.message")}
        </Typography>
        <SvgContainer>
          <WelcomeSvg />
        </SvgContainer>
      </CardContent>
    </Card>
  );
};

export default WelcomeWidget;
