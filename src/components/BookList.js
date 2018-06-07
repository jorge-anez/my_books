import React, {Component} from 'react';
import {View} from 'react-native';
export  default class BookList extends Component {
    state = {};
    componentWillMount() {
    }

    render() {
        return (
            <View style = {cardContainerStyle}>
                {this.props.children}
            </View>
        );
    }
}

const cardContainerStyle = {
    minHeight: 200,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
};