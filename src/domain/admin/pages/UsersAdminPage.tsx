import { IconPlus, Table } from 'hds-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import Button from '../../../common/components/button/Button';
import { ROUTES } from '../../../constants';
import { UserFieldsFragment, useUsersQuery } from '../../../generated/graphql';
import useLocale from '../../../hooks/useLocale';
import getPathBuilder from '../../../utils/getPathBuilder';
import Container from '../../app/layout/Container';
import PageWrapper from '../../app/layout/PageWrapper';
import { usersPathBuilder } from '../../user/utils';
import styles from './usersAdminPage.module.scss';

const UsersAdminPage: React.FC = () => {
  const history = useHistory();
  const locale = useLocale();
  const goToEditUserPage = (userId: string) => {
    history.push({
      pathname: `/${locale}${ROUTES.ADMIN_EDIT_USER.replace(':id', userId)}`,
    });
  };
  const goToCreateUserPage = () => {
    history.push({
      pathname: `/${locale}${ROUTES.ADMIN_CREATE_USER}`,
    });
  };
  const { t } = useTranslation();
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'username', headerName: 'Username', isSortable: true },
    { key: 'email', headerName: 'E-Mail', isSortable: true },
    { key: 'firstName', headerName: 'First name', isSortable: true },
    { key: 'lastName', headerName: 'Last name', isSortable: true },
    // TODO: Role. How should we decide this? Not specified.
    {
      key: 'uuid',
      headerName: '',
      transform: ({ uuid }: { uuid: string }) => {
        return <button onClick={() => goToEditUserPage(uuid)}>Muokkaa</button>;
      },
    },
  ];

  const { data: usersData, loading } = useUsersQuery({
    skip: false,
    variables: {
      createPath: getPathBuilder(usersPathBuilder),
    },
  });

  const users = (usersData?.users?.data as UserFieldsFragment[]) || [];

  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <PageWrapper
      description="helpPage.pageDescriptionInstructions"
      keywords={['keywords.support', 'keywords.help', 'keywords.instructions']}
      title="helpPage.pageTitleInstructions"
    >
      <h1>{t('adminPage.sideNavigation.users')}</h1>
      {/* <Container contentWrapperClassName={styles.headerContainer}>
        <Button
          className={styles.ctaButton}
          fullWidth={true}
          iconLeft={<IconPlus aria-hidden={true} />}
          onClick={goToCreateUserPage}
          variant="primary"
        >
          Lisää käyttäjä
        </Button>
      </Container> */}

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
            renderIndexCol={false}
            cols={cols}
            rows={users}
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

export default UsersAdminPage;
