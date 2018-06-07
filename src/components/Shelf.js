import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, Text, Icon, Fab} from 'native-base';
import BookCategory from './BookCategory';
import {CURRENTLY_READING, WANT_TO_READ, READ} from './globals';

export default class Shelf extends Component {
    state = {};
    componentWillMount() {
    }

    onCategoryChange = (book, newCategory) => {
        this.props.onChangeState(book, newCategory);
    };

    renderCategoryBook(categoryId, categoryName, myCategoryBooks) {
        return (
            <BookCategory  onCategoryChange = {this.onCategoryChange}
                           categoryId = {categoryId}
                           categoryName={categoryName}
                           myCategoryBooks = {myCategoryBooks}
                           numBooks = {myCategoryBooks.length}
            />
        );
    }

    render() {
        return (
            <View>
                {this.renderCategoryBook(
                      CURRENTLY_READING
                    , 'Leendo Actualmente'
                    , this.props.myBooks.filter((itemBook)=>itemBook.shelf === CURRENTLY_READING)
                )}

                {this.renderCategoryBook(
                       WANT_TO_READ
                    , 'Quisiera Leerlo'
                    , this.props.myBooks.filter((itemBook)=>itemBook.shelf === WANT_TO_READ)
                )}

                {this.renderCategoryBook(
                      READ
                    , 'Leído'
                    , this.props.myBooks.filter((itemBook)=>itemBook.shelf === READ)
                )}

                <Button onPress={this.goToSearch} rounded style={{backgroundColor: '#2D7B30', alignSelf:'flex-end'}}>
                    <Icon name='md-add' style={{color: '#fff'}} />
                </Button>
            </View>
        );
    }

    goToSearch = () => {
        this.props.onChangePage(2);
    };
}