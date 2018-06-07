/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import book from './src/components/book';
import { View } from 'react-native';
import MyApp from './src/components/MyApp';

import { Root } from "native-base";
import { StackNavigator } from "react-navigation";
import Book from "./src/components/Book";


/*const AppNavigator = StackNavigator({
        Page: { screen: ActionSheetExample }
    }
);*/


export default class App extends Component {
  render() {
    return (
        <Root>
            {/*<AppNavigator />*/}
            <MyApp/>
        </Root>
    );
  }
}

