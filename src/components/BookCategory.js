import React, {Component} from 'react';
import BookList from "./BookList";
import Book from "./Book";

import {View, Text} from 'react-native';

export default class BookCategory extends Component {
    state = {
        myCategoryBooks: []
    };

    onCategoryChange = (book, newCategory) => {
        this.props.onCategoryChange(book, newCategory);
    };

    renderBooks() {
            return this.props.myCategoryBooks.map(itemBook => {
                return (
                    <Book key = {itemBook.id}
                          categoryId = {this.props.categoryId}
                          onCategoryChange = {this.onCategoryChange}
                          book = {itemBook}
                    />
                );
            });
    }
    render() {
        return (
            <View>
                <Text style = {categoryNameStyle}>{this.props.categoryName}({this.props.numBooks})</Text>
                <BookList>
                    {this.renderBooks()}
                </BookList>
            </View>
        );
    }
}

const categoryNameStyle = {
    color: '#000',
    paddingTop: 5,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
    borderBottomColor: '#c8cace',
    borderBottomWidth: 1
};