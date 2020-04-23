import React, { Component } from 'react';
import { View, Text } from 'react-native'; 
import { DefaultTheme } from '@react-navigation/native';
import { GREEN } from './colors';
// import { DefaultTheme } from '@react-navigation/native';


export const ThemeManager = { 
    roundness: 20,
    colors: { 
        primary: GREEN,
        accent: GREEN,
         
    },

    // dark: false,
    // colors: {
    //     primary: 'rgb(255, 45, 85)',
    //     background: 'rgb(242, 242, 242)',
    //     card: 'rgb(255, 255, 255)',
    //     text: 'rgb(28, 28, 30)',
    //     border: 'rgb(199, 199, 204)',
    // },
}
