import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { connect } from "react-redux";
import { toggleCatHidden } from "../../redux/cart/cart.actions";
import './cart-icon.styles.scss';

const CartIcon = ({ toggleCatHidden }) => (
  <div className='cart-icon' onClick={toggleCatHidden}>
    <ShoppingIcon className='shopping-icon'/>
    <span className='item-count'>0</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  toggleCatHidden: () => dispatch(toggleCatHidden())
});

export default connect(null, mapDispatchToProps)(CartIcon);