import React, {Component} from 'react';
import {View} from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text, Content } from 'native-base';
import * as BooksAPI from '../utils/BooksAPI';
import BookList from './BookList';
import Book from './Book';
import {NONE} from "./globals";
// import Loading from "../loading";

export default class StoreBook extends Component {
    state = {
        storeBooks: [],
        loading: false,
        searchString: ''
    };

    componentDidMount() {
    }
    renderBooks() {
        /*if(this.state.loading) {
            return (
                <Loading/>
            );
        }*/
        if(this.state.storeBooks) {
            return this.state.storeBooks.map(itemBook => {
                    return (
                        <Book key = {itemBook.id}
                              categoryId = {itemBook.shelf?itemBook.shelf:NONE}
                              onCategoryChange = {this.onCategoryChange.bind(this)}
                              book = {itemBook}
                        />
                    );
            });
        }
    }

    render() {
        return(
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Button onPress={this.goToMainPage} transparent>
                            <Icon name="md-arrow-back" />
                        </Button>


                        <Input placeholder="Buscar..."
                               onChangeText={this.onChangeText}
                               value={this.state.searchString}
                        />
                        <Icon name="search" />
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Content padder>
                    <BookList>
                        {this.renderBooks()}
                    </BookList>
                </Content>
            </Container>
        );
    }

    onChangeText = (searchString) => {
        this.setState({searchString});
        if(searchString.length <= 0) {
            this.setState({storeBooks: []});
            return;
        }

        this.setState({loading: true});
        BooksAPI.search(searchString).then((books)=>{
            let storeBooks = [];
            if(!Array.isArray(books)) {
                this.setState({storeBooks: []});
            } else {
                books.forEach((storeBook)=>{
                    let book = this.props.myBooks.find((item)=> item.id === storeBook.id);
                    if(book) {
                        storeBook.shelf = book.shelf;
                    } else {
                        storeBook.shelf = NONE;
                    }
                    storeBooks.push(storeBook);
                });
                this.setState({storeBooks});
            }
            console.log(storeBooks);
            this.setState({loading: false});
        }).catch((error)=>{
            this.setState({storeBooks: []});
            this.setState({loading: false});
        });
    }

    onCategoryChange(book, newCategory) {
        this.props.onChangeState(book, newCategory);
        if(book.shelf !== newCategory) {
            let storeBooks = [];
            this.state.storeBooks.forEach((item)=>{
                if(item.id === book.id) {
                    item.shelf = newCategory;
                }
                storeBooks.push(item);
            });
            this.setState({storeBooks});
        }
    }

    goToMainPage = () => {
        this.props.onChangePage(1);
    }
}