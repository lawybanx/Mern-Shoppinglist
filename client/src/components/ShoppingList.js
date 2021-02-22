import { useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';

const initialState = [
  {
    id: uuidv4(),
    name: 'Eggs',
  },
  {
    id: uuidv4(),
    name: 'Steak',
  },
];

const onDeleteClick = (id) => {
  return id;
};

function ShoppingList() {
  const [items, setItems] = useState(initialState);

  const addItem = () => {
    const name = prompt('Enter Item');
    if (name) {
      setItems([...items, { id: uuidv4(), name }]);
    }
  };
  return (
    <>
      <Container>
        <Button color="dark" style={{ marginBottom: '2rem' }} onClick={addItem}>
          Add Item
        </Button>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => onDeleteClick(id)}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    </>
  );
}

export default ShoppingList;
