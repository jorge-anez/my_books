import React, { Component } from "react";
import { Container, Header, Button, Content, ActionSheet, Text, Left, Right, Icon, Body, Title, Item, Input } from "native-base";
import Shelf from "./Shelf";
import StoreBook from "./StoreBook";
import * as BooksAPI from '../utils/BooksAPI';
import {NONE} from "./globals";

export default class MyApp extends Component {
    state = {
        myBooks: [],
        activePage: 1
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({myBooks: books});
        }).catch(error=>{
            this.setState({myBooks: []});
        });
    }

    onChangeState = (book, newState) => {
        let myBooks = [];
        if(newState === NONE) {
            myBooks = this.state.myBooks.filter((item)=>item.id !== book.id);
        } else {
            if(!this.state.myBooks.find((item)=>item.id === book.id)) {
                book.shelf = newState;
                myBooks.push(book);
            }
            this.state.myBooks.forEach((itemBook)=> {
                if(itemBook.id === book.id) {
                    itemBook.shelf = newState;
                }
                myBooks.push(itemBook)
            });
        }
        this.setState({myBooks});
    };

    changePage = (page) => {
        this.setState({activePage: page});
    };

    renderPage() {
        if(this.state.activePage === 1)
            return (
                <Container>
                    <Header style={{backgroundColor: '#2D7B30'}}>
                        <Body style={{alignItems: 'center'}}>
                        <Title>Mis Libros</Title>
                        </Body>
                    </Header>
                    <Content padder>
                        <Shelf
                            myBooks = {this.state.myBooks}
                            onChangePage={this.changePage}
                            onChangeState={this.onChangeState}
                        />
                    </Content>
                </Container>
            );
        return (
            <StoreBook
                myBooks = {this.state.myBooks}
                onChangePage={this.changePage}
                onChangeState={this.onChangeState}
            />
        );
    }

    render() {
        return (
            this.renderPage()
        );
    }
}