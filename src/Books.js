import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AddBook from './AddBook';
export class Books extends Component {

  constructor(props) {
    super(props);
    this.state = {
      BooksData: [],
      showAddModal: false,
    }

  }

  
  handelAddModal = (e) => {
    e.preventDefault();

    const reqBody = {
      title: e.target.title.value,
      description: e.target.description.value,
      statuses: e.target.status.value,
      email: e.target.email.value,
    }
  

    axios.post(`${process.env.REACT_APP_API_URL}/Books`, reqBody).then(createdBookObject => {
      this.state.BooksData.push(createdBookObject.data); // push the new data into the state of the BooksData
      this.setState({ BooksData: this.state.BooksData }); // update the data using setState to invoke the re-render
      this.handelDisplayAddModal(); // close the modal after we are done!
    })
    .catch(() => alert("Something went wrong!???????????"));
  }

  
  handelDeleteBook = (bookId) => {

    /**
     * Using axios you want to send the request with the ID of the Book as a param to backend so it delete that Book
     * 
     * After that when you get the response and check if the delete count is == 1
     * if its == 1 then remove that Book from the state and the set the state to invoke the render function again.
     */

    // console.log('Book ID', bookId);

    axios.delete(`${process.env.REACT_APP_API_URL}/Books/${bookId}`).then(deleteResponse => {
      if (deleteResponse.data.deletedCount === 1) {
        const newBookArr = this.state.BooksData.filter(Book => Book._id !== bookId);
        /**
         * I want to filter out the Book ID that I deleted, by returning only the Book object that doesn't match the id of the 
         * Book that I deleted
         */
        this.setState({ BooksData: newBookArr });
      }
    }).catch(() => alert("something went wrong"));
  }

  /**
 * Show/ Hide Add Modal
 */
  handelDisplayAddModal = () => {
    this.setState({ showAddModal: !this.state.showAddModal });
  }

  componentDidMount = () => {
    /**
     * Component did mount is a React lifecycle function that will execute/ invoke itself automatically after the render function finishes execution
     * 
     * It only occurs the first time the component finishes rendering
     * 
     */

    axios.get(`${process.env.REACT_APP_API_URL}/Books`).then((BookResponse) => {

      this.setState({ BooksData: BookResponse.data });
    }).catch(error => alert(error.message));


  }

  render() {
    return (
      <div>
        <Button onClick={this.handelDisplayAddModal}>
          Show Add Book Modal Form
        </Button>
        {/* ================================================ */}
        {/* Show/ Hide the Add New Book Modal Form */}
        {
          this.state.showAddModal &&
          <>
            <AddBook
              show={this.state.showAddModal}
              handelAddModal={this.handelAddModal}
              handelDisplayAddModal={this.handelDisplayAddModal}
            />
          </>
        }
        {/* ================================================ */}

        {/* Render the Cards only when we have data from the Backend */}
        {
          this.state.BooksData.length > 0 &&
          <>
            {/* Loop through the array of Books Data and render them */}
            {
              this.state.BooksData.map(Book => {
                return (
                  <>
                    <Card style={{ width: '18rem' }}>
                      <Card.Body>
                        <Card.Title>{Book.title}</Card.Title>
                        <Card.Text>
                          {Book.description}

                        </Card.Text>
                        <Card.Text>
                          {Book.status}
                        </Card.Text>
                        <Card.Text>
                          {Book.email}
                        </Card.Text>
                        <Button variant="danger" onClick={() => this.handelDeleteBook(Book._id)}>Delete Book</Button>
                      </Card.Body>
                    </Card>
                  </>
                )
              })
            }
          </>
        }
      </div>
    )
  }
}

export default Books