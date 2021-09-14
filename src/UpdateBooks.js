import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export class UpdateModel extends Component {


    render() {
        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.handelDisplayUpateModal}>
            <Modal.Header closeButton>
              <Modal.Title>Update Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form show={this.props.show} onSubmit={this.props.handelUpdateModal}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" name="bookName" placeholder="Enter Book Name" defaultValue= {this.props.bookSelectedData.title} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" name="bookdescription" placeholder="Enter Book Discription" defaultValue= {this.props.bookSelectedData.description} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Control type="text" name="bookstatus" placeholder="Enter Book Status" defaultValue= {this.props.bookSelectedData.status} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" name="useremail" placeholder="Enter Book Email" defaultValue= {this.props.bookSelectedData.email} />
                </Form.Group>
                <Button variant="primary" type="submit" >
                  Update Book
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
                
            </div>
        )
    }
}

export default UpdateModel
