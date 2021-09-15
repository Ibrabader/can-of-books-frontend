import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AddBook from './AddBook';
import UpdateModel from './UpdateBooks';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { withAuth0 } from '@auth0/auth0-react';
export class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BooksData: [],
      showAddModal: false,
      showUpdateModal: false,
      bookSelectedData : {},
    }
  }
  handelAddModal = (e) => {
    e.preventDefault();
    const reqBody = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.value,
      email: this.props.auth0.user.email
      // book_img: e.target.bookImage.value,
    }

    axios.post(`${process.env.REACT_APP_API_URL}/Books`, reqBody).then(createdBookObject => {
      this.state.BooksData.push(createdBookObject.data);
      this.setState({ BooksData: this.state.BooksData });
      this.handelDisplayAddModal();
    }).catch(() => alert("Something went wrong  - check axios.post function"));
  }
  handelDeleteBook = (bookId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/Books/${bookId}`).then(deleteResponse => {
      if (deleteResponse.data.deletedCount === 1) {
        const newBookArr = this.state.BooksData.filter(Book => Book._id !== bookId);
        this.setState({ BooksData: newBookArr });
      }
    }).catch(() => alert("something went wrong -check axios.delete function "));
  }
  handelUpdateModal = (e) => {
    e.preventDefault();
    const reqBodyUpdate = {
      title: e.target.bookName.value,
      description: e.target.bookdescription.value,
      status: e.target.bookstatus.value,
      email: e.target.useremail.value,
      // book_img: e.target.bookImage.value,
    }

    axios.put(`${process.env.REACT_APP_API_URL}/books/${this.state.bookSelectedData._id}`,reqBodyUpdate).then(updatedBookObject => {
      const updatedBooksArr = this.state.BooksData.map(book => {
        if (book._id === this.state.bookSelectedData._id ) {

          book = updatedBookObject.data;
          return book;
          
        }
        return book;
      })
      this.setState({
        BooksData: updatedBooksArr,
        bookSelectedData: {},
      })
      this.handelDisplayUpateModal();
    })
    .catch((error) => alert(error.message));




  }


  handelDisplayUpateModal = (Book) => {
    this.setState({
        showUpdateModal: !this.state.showUpdateModal,
        bookSelectedData: Book
    })

} 

    handelDisplayAddModal = () => {
      this.setState({ showAddModal: !this.state.showAddModal });
    }
    componentDidMount = () => {
      axios.get(`${process.env.REACT_APP_API_URL}/Books/${this.props.auth0.user.email}`).then((BookResponse) => {
        this.setState({ BooksData: BookResponse.data });
        // console.log('hwllo from get ');
      }).catch(error => alert(' get message'));
    }
    render() {
      return (
        <div>
          <Button onClick={this.handelDisplayAddModal}>
            Show Add Book Modal Form
          </Button>
          {this.state.showAddModal &&
            <>
              <AddBook
                show={this.state.showAddModal}
                handelAddModal={this.handelAddModal}
                handelDisplayAddModal={this.handelDisplayAddModal}
              />
            </>
          }

          {
            this.state.showUpdateModal &&
            <>
              <UpdateModel
                show={this.state.showUpdateModal}
                handelDisplayUpateModal={this.handelDisplayUpateModal}
                handelUpdateModal={this.handelUpdateModal}
                bookSelectedData={this.state.bookSelectedData}
              />
            </>
          }
          {
          this.state.BooksData.length > 0 &&
         
            <>
             <Row>
              {this.state.BooksData.map((Book,idx) => {
                return (
                  <>
                    <Col md={4} key={idx}>
                    <Card style={{ width: '18rem' }}>
                    {/* <Card.Img variant="top" src={book.book_img} /> */}
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
                        <br />
                        <br/>
                        <Button variant="warning" onClick={()=> this.handelDisplayUpateModal(Book)}>Update Book</Button>
                      </Card.Body>
                    </Card>
                    </Col>
                  </>
                )
              })
              }
         
               </Row>
            </>
          }
        </div>
      )
    }
  }

export default  withAuth0(Books);