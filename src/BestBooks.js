import React from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
require('dotenv').config();
class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }
  componentDidMount = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/books`).then((booksResponse) => {
      this.setState({ books: booksResponse.data });
    })
    console.log('receive response' + this.state.books);
  }
  render() {
    return (
      <>
        {
          this.state.books.length > 0 &&
          <>
            {
              this.state.books.map(book => {
                return (
                  <>
                    <Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                          {book.status}
                        </Card.Text>
                        <Card.Text>
                          {book.description}
                        </Card.Text>
                        <Card.Text>
                          {book.email}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </>
                )
              })
            }
          </>
        }
      </>
    )
  }
}

export default BestBooks;
