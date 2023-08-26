import { FC } from 'react';
import { Link, useRoute } from 'react-router5';
import { AUTH_ROUTES } from '../../modules/auth/config/routes';
import SignIn from '../../modules/auth/ui/Login';
import Layout  from './Layout';
import { AppSettingsVM } from '../../modules/core/view_model/AppSettingsVM';
import { useVM } from '../hooks/useVM';
import { observer } from 'mobx-react-lite';
import { CORE_ROUTES } from '../../modules/core/config/routes';

interface IProps {}

const PagesSelector: FC<IProps> = ({}) => {
  const app = useVM<AppSettingsVM>(AppSettingsVM);
  const route = useRoute().route;

  if (route.name === AUTH_ROUTES.LOGIN) {
    return <SignIn />;
  }

  if (app.auth && app.authComplete) {
    switch (route.name) {
      case CORE_ROUTES.HOME:
        return <Layout />;
        break;
      case CORE_ROUTES.DASHBOARD:
        return <Link routeName={CORE_ROUTES.HOME}>asdas</Link>;
        break;
      default:
        return <>AAAA</>;
    }
  }
  return null;
};

export default observer(PagesSelector);
