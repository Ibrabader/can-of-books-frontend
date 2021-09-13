import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export class AddBook extends Component {

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handelDisplayAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={this.props.handelAddModal}>
            <Form.Group className="mb-3">
              <Form.Label>Book Title</Form.Label>
              <Form.Control type="text" name="title" placeholder="Enter Book title" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Book Description</Form.Label>
              <Form.Control type="text" name="description" placeholder="Enter Book description" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Book status</Form.Label>
              <Form.Control type="text" name="status" placeholder="Enter Book status" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Book email</Form.Label>
              <Form.Control type="text" name="email" placeholder="Enter Book email" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create New Book!
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    )
  }
}

export default AddBook