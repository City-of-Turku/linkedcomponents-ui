import React from 'react';
import { useTranslation } from 'react-i18next';

import FieldColumn from '../../layout/FieldColumn';
import FieldRow from '../../layout/FieldRow';
import { RecurringEventSettings } from '../../types';
import AddRecurringEventForm from './AddRecurringEventForm';
import EventTimesSummary from './EventTimesSummary';
import TimeSectionContext from './TimeSectionContext';
import TimeSectionNotification from './TimeSectionNotification';
import { sortRecurringEvents } from './utils';
import ValidationError from './ValidationError';

const RecurringEventTab: React.FC = () => {
  const { t } = useTranslation();
  const { recurringEvents, setRecurringEvents } =
    React.useContext(TimeSectionContext);

  const addRecurringEvent = (recurringEvent: RecurringEventSettings) => {
    const sortedRecurringEvents = [...recurringEvents];
    sortedRecurringEvents.push(recurringEvent);
    sortedRecurringEvents.sort(sortRecurringEvents);
    setRecurringEvents(sortedRecurringEvents);
  };

  return (
    <>
      <h3>{t('event.form.titleRecurringEvent')}</h3>
      <FieldRow notification={<TimeSectionNotification />}>
        <FieldColumn>
          <AddRecurringEventForm onSubmit={addRecurringEvent} />
          <ValidationError />
        </FieldColumn>
        <EventTimesSummary />
      </FieldRow>
    </>
  );
};

export default RecurringEventTab;
