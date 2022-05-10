import { ApolloQueryResult } from '@apollo/client';
import { Field, Formik } from 'formik';
import { IconCheck } from 'hds-react';
import React from 'react';
import { useParams } from 'react-router';

import Button from '../../../common/components/button/Button';
import TextInputField from '../../../common/components/formFields/TextInputField';
import LoadingSpinner from '../../../common/components/loadingSpinner/LoadingSpinner';
import {
  OrganizationFieldsFragment,
  OrganizationQuery,
  OrganizationQueryVariables,
  useOrganizationQuery,
} from '../../../generated/graphql';
import getPathBuilder from '../../../utils/getPathBuilder';
import Container from '../../app/layout/Container';
import PageWrapper from '../../app/layout/PageWrapper';
import {
  ORGANIZATION_FIELDS,
  ORGANIZATION_INITIAL_VALUES,
} from '../../organization/constants';
import {
  getOrganizationInitialValues,
  organizationPathBuilder,
} from '../../organization/utils';
import styles from './editOrganizationPage.module.scss';

interface EditOrganizationPageProps {
  organization: OrganizationFieldsFragment;
  refetch: (
    variables?: Partial<OrganizationQueryVariables>
  ) => Promise<ApolloQueryResult<OrganizationQuery>>;
}

const EditOrganizationPage: React.FC<EditOrganizationPageProps> = ({
  refetch,
}) => {
  const { id } = useParams<{ id: string }>();
  const { data: organizationData, loading: loadingOrganization } =
    useOrganizationQuery({
      fetchPolicy: 'no-cache',
      notifyOnNetworkStatusChange: true,
      //   skip: debouncedLoadingUser,
      variables: {
        createPath: getPathBuilder(organizationPathBuilder),
        id,
      },
    });
  const organization =
    organizationData?.organization as OrganizationFieldsFragment;

  const initialValues = React.useMemo(
    () => getOrganizationInitialValues(organization),
    [organization]
  );

  console.log(organization);
  return (
    <PageWrapper
      description="helpPage.pageDescriptionInstructions"
      keywords={['keywords.support', 'keywords.help', 'keywords.instructions']}
      title="helpPage.pageTitleInstructions"
    >
      <h1>Helsingin kaupunki</h1>
      <p className={styles.text}>Muokkaa organisaatiota</p>
      <LoadingSpinner isLoading={loadingOrganization}>
        <Formik
          initialValues={initialValues}
          onSubmit={/* istanbul ignore next */ () => undefined}
        >
          <form>
            <Field
              label="Nimi"
              name={ORGANIZATION_FIELDS.NAME}
              component={TextInputField}
            />
            <Container contentWrapperClassName={styles.saveButtonContainer}>
              <Button
                className={styles.saveButton}
                fullWidth={false}
                iconLeft={<IconCheck aria-hidden={true} />}
                // onClick={() => handleSubmit}
                type="submit"
                variant="primary"
              >
                Tallenna
              </Button>
            </Container>
          </form>
        </Formik>
      </LoadingSpinner>
    </PageWrapper>
  );
};

export default EditOrganizationPage;
