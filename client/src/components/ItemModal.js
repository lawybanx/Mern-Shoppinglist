import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

function ItemModal({ addItem }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const onAdd = (e) => {
    e.preventDefault();

    console.log(e.target);
  };

  return (
    <div>
      <Button color="dark" style={{ marginBottom: '2rem' }} onClick={toggle}>
        Add Item
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={onAdd}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input type="text" name="name" placeholder="Add shopping item" />
            </FormGroup>
            <Button type="submit" color="dark" block onClick={toggle}>
              Add Item
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ItemModal;
