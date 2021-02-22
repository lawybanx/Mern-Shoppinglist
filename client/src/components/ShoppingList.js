import { useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { v4 as uuidv4 } from 'uuid';
import ItemModal from './ItemModal';

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

function ShoppingList() {
  const [items, setItems] = useState(initialState);

  const addItem = ({ name }) => {
    if (name) {
      setItems([...items, { id: uuidv4(), name }]);
    }
  };

  const onDeleteClick = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <Container>
        <ItemModal addItem={addItem} />
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
