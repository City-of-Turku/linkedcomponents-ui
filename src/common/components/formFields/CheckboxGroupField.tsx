import classNames from 'classnames';
import { FieldProps, useField } from 'formik';
import { CheckboxProps, IconAngleDown, IconAngleUp } from 'hds-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { OptionType } from '../../../types';
import { getErrorText } from '../../../utils/validationUtils';
import Button from '../button/Button';
import Checkbox from '../checkbox/Checkbox';
import styles from './checkboxGroupField.module.scss';

type Columns = 1 | 2 | 3 | 4;

type Props = {
  columns: Columns;
  disabledOptions: string[];
  errorName?: string;
  min: number;
  options: OptionType[];
  visibleOptionAmount?: number;
} & FieldProps &
  CheckboxProps;

const CheckboxGroupField: React.FC<Props> = ({
  columns = 2,
  disabled,
  disabledOptions,
  field: { name, onBlur, value, ...field },
  form,
  errorName,
  min = 0,
  options,
  visibleOptionAmount,
  ...rest
}) => {
  const { t } = useTranslation();
  const [, { error, touched: touchedError }] = useField(errorName || name);
  const [, { touched }] = useField(name);

  const errorText = getErrorText(error, touched || touchedError, t);
  const [showAll, setShowAll] = React.useState(false);

  const visibleOptions = [...options].slice(
    0,
    showAll ? undefined : visibleOptionAmount
  );

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleBlur = () => {
    onBlur({ target: { id: name, value } });
  };

  return (
    <>
      <div
        id={errorName}
        className={classNames(
          styles.checkboxsWrapper,
          styles[`columns${columns}`]
        )}
      >
        {visibleOptions.map((option, index) => {
          const checked = value.includes(option.value);

          return (
            <Checkbox
              key={index}
              {...rest}
              {...field}
              id={`${name}-${option.value}`}
              name={name}
              checked={value.includes(option.value)}
              disabled={
                disabled ||
                (checked && value.length <= min) ||
                disabledOptions?.includes(option.value)
              }
              onBlur={handleBlur}
              value={option.value}
              label={option.label}
            />
          );
        })}
      </div>
      {errorText && <div className={styles.errorText}>{errorText}</div>}
      {visibleOptionAmount && (
        <div className={styles.buttonWrapper}>
          <Button
            iconLeft={showAll ? <IconAngleUp /> : <IconAngleDown />}
            onClick={toggleShowAll}
            variant="supplementary"
          >
            {showAll ? t('common.showLess') : t('common.showMore')}
          </Button>
        </div>
      )}
    </>
  );
};

export default CheckboxGroupField;
