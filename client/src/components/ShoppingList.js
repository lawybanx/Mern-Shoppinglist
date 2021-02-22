import { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ItemModal from './ItemModal';

import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

function ShoppingList({ getItems, item }) {
  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const [items, setItems] = useState(initialState);
  // const addItem = ({ name }) => {
  //   if (name) {
  //     // setItems([...items, { id: uuidv4(), name }]);
  //   }
  // };
  // const onDeleteClick = (id) => {
  //   // setItems(items.filter((item) => item.id !== id));
  // };
  const { items } = item;
  return (
    <>
      <Container>
        <ItemModal
        // addItem
        />
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    // onClick={() => onDeleteClick(id)}
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

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});

export default connect(mapStateToProps, { getItems })(ShoppingList);
