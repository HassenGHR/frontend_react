import { useReducer } from 'react';

import CartContext from './cart-context';


const defaultCartState = {
  items: [],
  totalAmount: 0,
  globalAmount: 0,
  productQuantity: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price ;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount +1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price ;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if (action.type === 'CLEAR') {
    return defaultCartState;
  }
  if (action.type === 'SET_PRODUCT_QUANTITY') {
    return {
      ...state,
      productQuantity: action.quantity,
    };
  }
  if (action.type === 'SET_GLOBAL_AMOUNT') {
    return {
      ...state,
      globalAmount: action.amount,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({type: 'CLEAR'});
  };

  const setProductQuantityHandler = (quantity) => {
    dispatchCartAction({ type: 'SET_PRODUCT_QUANTITY', quantity: quantity });
  };
  const setGlobalAmountHandler = (amount) => {
    dispatchCartAction({ type: 'SET_GLOBAL_AMOUNT', amount: amount });
  };
  

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    globalAmount:cartState.globalAmount,
    productQuantity: cartState.productQuantity,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    setProductQuantity: setProductQuantityHandler,
    setGlobalAmount: setGlobalAmountHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;