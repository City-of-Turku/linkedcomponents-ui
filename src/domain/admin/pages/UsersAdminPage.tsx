import { Table } from 'hds-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UserFieldsFragment, useUsersQuery } from '../../../generated/graphql';
import getPathBuilder from '../../../utils/getPathBuilder';
import PageWrapper from '../../app/layout/PageWrapper';
import { usersPathBuilder } from '../../user/utils';

const UsersAdminPage: React.FC = () => {
  const { t } = useTranslation();
  const cols = [
    { key: 'id', headerName: 'Not rendered' },
    { key: 'username', headerName: 'Username', isSortable: true },
    { key: 'email', headerName: 'E-Mail', isSortable: true },
    { key: 'firstName', headerName: 'First name', isSortable: true },
    { key: 'lastName', headerName: 'Last name', isSortable: true },
    // TODO: Rooli. Mistä pitäisi päätellä? Ei määritelty.
    {
      key: '',
      headerName: '',
      transform: () => {
        return <button>Muokkaa</button>;
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

  console.log(users);
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <PageWrapper
      description="helpPage.pageDescriptionInstructions"
      keywords={['keywords.support', 'keywords.help', 'keywords.instructions']}
      title="helpPage.pageTitleInstructions"
    >
      <h1>{t('adminPage.sideNavigation.users')}</h1>
      {!loading && (
        <div>
          <Table
            checkboxSelection
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            heading="Foo"
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
      {/* <IconAngleDown aria-hidden /> */}
    </PageWrapper>
  );
};

export default UsersAdminPage;
