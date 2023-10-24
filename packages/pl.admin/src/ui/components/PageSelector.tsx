import { FC } from "react";
import { useRoute } from "react-router5";
import { AUTH_ROUTES } from "../../modules/auth/config/routes";
import SignIn from "../../modules/auth/ui/Login";
import Layout from "./Layout";
import { AppSettingsViewModel } from "../../modules/core/view_model/appSettings.viewmodel.ts";
import { useVM } from "../hooks/useVM";
import { observer } from "mobx-react-lite";

interface IProps {}

const PagesSelector: FC<IProps> = ({}) => {
  const app = useVM<AppSettingsViewModel>(AppSettingsViewModel);
  const route = useRoute().route;

  if (route.name === AUTH_ROUTES.LOGIN) {
    return <SignIn />;
  }

  if (app.auth && app.authComplete) {
    return <Layout />;
  }
  return null;
};

export default observer(PagesSelector);
