import 'react-native-gesture-handler/jestSetup';

jest.mock('native-base', () => {
  const React = require('react');
  const {View, Text} = require('react-native');
  const Component = ({children, ...props}) =>
    React.createElement(View, props, children);

  return {
    Root: Component,
    View: Component,
    Text: ({children, ...props}) =>
      React.createElement(Text, props, children),
    Icon: Component,
    Toast: {show: jest.fn()},
  };
});

jest.mock('@react-native-community/async-storage', () =>
  require('@react-native-community/async-storage/jest/async-storage-mock'),
);

jest.mock('@react-native-firebase/auth', () => () => ({
  signInWithPhoneNumber: jest.fn(),
}));
