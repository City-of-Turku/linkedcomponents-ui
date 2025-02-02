/* eslint-disable no-console */
import './test/testI18nInit';
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import 'jest-localstorage-mock';

// Mock scrollTo function
window.scrollTo = jest.fn();

const originalWarn = console.warn.bind(console.warn);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.warn = (msg: any, ...optionalParams: any[]) =>
  !msg
    .toString()
    .includes(
      'Using ReactElement as a label is against good usability and accessibility practices.'
    ) && originalWarn(msg, ...optionalParams);

jest.setTimeout(1000000);
