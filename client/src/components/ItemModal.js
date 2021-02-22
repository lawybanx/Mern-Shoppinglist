import { useState } from 'react';
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

import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

function ItemModal({ addItem }) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [name, setName] = useState('');

  const onAdd = (e) => {
    e.preventDefault();

    const newItem = { name };

    addItem(newItem);
    setName('');
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
              <Input
                type="text"
                name="name"
                placeholder="Add shopping item"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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

ItemModal.propTypes = {
  addItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { addItem })(ItemModal);
