/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import AppNavigator from './src/navigator/AppNavigator';
import {ThemeManager} from './src/utils/themeManager';
import {StatusBar, View, Platform} from 'react-native';
import {GREEN} from './src/utils/colors';
import {Root} from 'native-base';
import HomeHeader from './src/modules/home/HomeHeader';

console.disableYellowBox = true;

const App = () => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      {Platform.OS === 'ios' && (
        <View
          //To set the background color in IOS Status Bar also
          style={{
            backgroundColor: GREEN,
            height: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight,
          }}>
          <StatusBar barStyle="light-content" backgroundColor={GREEN} />
        </View>
      )}

      {Platform.OS === 'android' && (
        <StatusBar barStyle="light-content" backgroundColor={GREEN} />
      )}
      <AppNavigator />
    </View>
  );
};
export default App;
