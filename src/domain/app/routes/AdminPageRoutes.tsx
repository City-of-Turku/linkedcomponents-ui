import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { ROUTES } from '../../../constants';
import { Language } from '../../../types';
import OrganizationAdminPage from '../../admin/pages/OrganizationAdminPage';
import UsersAdminPage from '../../admin/pages/UsersAdminPage';
import NotFound from '.././../notFound/NotFound';

interface Props {
  locale: Language;
}

const AdminRoutes: React.FC<Props> = ({ locale }) => {
  const getLocalePath = (path: string) => `/${locale}${path}`;

  return (
    <Switch>
      <Redirect
        exact
        path={getLocalePath(ROUTES.ADMIN)}
        to={getLocalePath(ROUTES.ADMIN_ORGANIZATIONS)}
      />
      <Route
        path={getLocalePath(ROUTES.ADMIN_ORGANIZATIONS)}
        component={OrganizationAdminPage}
      />
      <Route
        path={getLocalePath(ROUTES.ADMIN_USERS)}
        component={UsersAdminPage}
      />
      <Route component={NotFound} />
    </Switch>
  );
};

const AdminPageRoutes: React.FC<Props> = ({ locale }) => {
  const getLocalePath = (path: string) => `/${locale}${path}`;

  return (
    <Switch>
      <Redirect
        exact
        path={getLocalePath(ROUTES.HELP)}
        to={getLocalePath(ROUTES.INSTRUCTIONS)}
      />
      <Route path={getLocalePath(ROUTES.ADMIN)}>
        <AdminRoutes locale={locale} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
};

export default AdminPageRoutes;
