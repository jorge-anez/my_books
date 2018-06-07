import * as BooksAPI from "./BooksAPI";

export default function apiTest() {
  //Get all my books
  BooksAPI.getAll().then(books => {
    console.log("My Books", books);
  });

  //Get a single book-item
  const bookId = "sJf1vQAACAAJ"; //This id corresponds to book-item "Learning Web Development with React and Bootstrap"
  BooksAPI.get(bookId)
    .then(book => {
      console.log("Book for id sJf1vQAACAAJ: ", book);
    })
    .catch(alertException);

  //Move a book-item to a shelf
  //Possible shelves are: wantToRead, currentlyReading, read, none
  BooksAPI.moveToShelf(bookId, "currentlyReading")
    .then(() => {
      console.log("Book moved to wantToRead shelf");
    })
    .catch(alertException);

  //Search all books that match a criteria
  BooksAPI.search("Android")
    .then(books => {
      console.log('Books that match query "Android" ', books);
    })
    .catch(alertException);

  /*Valid book-item search queries:

  'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat',
  'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket',
  'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education',
  'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi',
  'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn',
  'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy',
  'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire',
  'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate',
  'Virtual Reality', 'Web Development', 'iOS'
   */
}

function alertException(exc) {
  alert(`ERROR!\n ${exc.message}`);
}
