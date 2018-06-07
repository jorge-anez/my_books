import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {ActionSheet, Button} from "native-base";
import {CURRENTLY_READING, WANT_TO_READ, READ, NONE} from './globals';

const options = [
    {categoryId: CURRENTLY_READING, label:'Leendo actualmente'},
    {categoryId: WANT_TO_READ, label:'Quisiera leerlo'},
    {categoryId: READ, label:'Leído'},
    {categoryId: NONE, label:'Ninguno'}
];

export default class Book extends Component {
    state = {};

    openActionSheet = ()=>{
        const BUTTONS = options.map((item) =>{
            if(item.categoryId === this.props.categoryId) {
                return {text: item.label, icon: "md-checkmark", iconColor: "#2c8ef4"};
            }else {
                return {text: item.label};
            }
        });

        const DESTRUCTIVE_INDEX = -1;
        const CANCEL_INDEX = -1;

        ActionSheet.show({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Opcion"
            },
            (buttonIndex) => {
                console.log(buttonIndex);
                if(buttonIndex === -1) return;
                const option = options[buttonIndex];
                this.onOptionSelected(option.categoryId);
            })
    };

    render() {
        const {imageLinks, title, authors } = this.props.book;
        return (
            <View style = {cardItemStyle}>
                <View style = {cardBodyStyle}>
                    <View style = {cardImageStyle}>
                        <Image style = {{width: 128, height: 183}} source = {{uri: !imageLinks? '': imageLinks.smallThumbnail}}/>
                    </View>
                    <Button style = {cardOptionStyle}
                        onPress={this.openActionSheet}
                    >
                        <View style = {iconShape}></View>
                    </Button>
                </View>
                <View className="card-footer">
                    <Text style = {tittleBookStyle}>{title}</Text>
                    <Text style={{color: '#848891', fontWeight: 'normal', fontSize: 12}}>{authors? authors.join('; '): ''}</Text>
                </View>
            </View>
        );
    }

    onOptionSelected = (option) => {
        this.props.onCategoryChange(this.props.book, option);
    };
}


// STYLES
const cardItemStyle = {
    margin: 5,
    width: 140,

};

const cardBodyStyle = {
    height: 200,
    /*position:'relative',*/
    /*backgroundColor: '#e5e937'*/
};

const cardImageStyle = {
    borderColor: '#000',
    borderRadius: 5,
    /*elevation: 2,*/
    height: 183,
    width: 128
};

const cardOptionStyle = {
    width: 40,
    height: 40,
    backgroundColor: '#5CAF55',
    position: 'absolute',
    borderRadius: 20,
    bottom:0,
    right:0,
    flex: 1,
    /*display: 'flex',*/
    justifyContent: 'center',
    alignItems: 'center',
    /*elevation: 1*/
};

const iconShape = {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 7,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#fff'
};

const tittleBookStyle = {
    fontSize: 12,
    padding: 1,
    margin: 1,
    color: '#000'
};