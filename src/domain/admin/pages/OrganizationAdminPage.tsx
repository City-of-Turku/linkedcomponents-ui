import { IconPlus, Table } from 'hds-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import Button from '../../../common/components/button/Button';
import { ROUTES } from '../../../constants';
import {
  OrganizationFieldsFragment,
  useOrganizationsQuery,
  UserFieldsFragment,
  useUsersQuery,
} from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getPathBuilder from '../../../utils/getPathBuilder';
import Container from '../../app/layout/Container';
import PageWrapper from '../../app/layout/PageWrapper';
import { organizationsPathBuilder } from '../../organization/utils';
import { usersPathBuilder } from '../../user/utils';
import styles from './usersAdminPage.module.scss';

const OrganizationAdminPage: React.FC = () => {
  const history = useHistory();
  const locale = useLocale();
  const goToEditOrganizationPage = (organizationId: string) => {
    history.push({
      pathname: `/${locale}${ROUTES.ADMIN_EDIT_ORGANIZATION.replace(
        ':id',
        organizationId
      )}`,
    });
  };
  const { t } = useTranslation();
  const cols = [
    { key: 'name', headerName: 'Name', isSortable: true },
    { key: 'id', headerName: 'ID', isSortable: true },
    { key: 'dataSource', headerName: 'Datalähde', isSortable: true },
    { key: 'classification', headerName: 'Luokittelu', isSortable: true },
    // TODO: Role. How should we decide this? Not specified.
    {
      key: 'id',
      headerName: '',
      transform: ({ id }: { id: string }) => {
        return (
          <button onClick={() => goToEditOrganizationPage(id)}>Muokkaa</button>
        );
      },
    },
  ];

  const { data: organizationsData, loading } = useOrganizationsQuery({
    skip: false,
    variables: {
      createPath: getPathBuilder(organizationsPathBuilder),
    },
  });

  const organizations =
    (organizationsData?.organizations?.data as OrganizationFieldsFragment[]) ||
    [];

  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <PageWrapper
      description="helpPage.pageDescriptionInstructions"
      keywords={['keywords.support', 'keywords.help', 'keywords.instructions']}
      title="helpPage.pageTitleInstructions"
    >
      <h1>{t('adminPage.sideNavigation.organizations')}</h1>

      <div className={styles.buttonWrapper}></div>
      {!loading && (
        <div>
          <Table
            // TODO: We currently do not have any batch actions, so we'll remove this for now.
            // checkboxSelection
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            heading=" "
            id="checkbox-selection"
            indexKey="id"
            renderIndexCol={true}
            cols={cols}
            rows={organizations}
            selectAllRowsText="Select all rows"
            clearSelectionsText="Clear selections"
            ariaLabelCheckboxSelection="Row selection"
            variant="light"
          />
        </div>
      )}
    </PageWrapper>
  );
};

export default OrganizationAdminPage;
