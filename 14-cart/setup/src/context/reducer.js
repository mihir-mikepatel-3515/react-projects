// src/context/reducer.js

const reducer = (state, action) => {
  // ૧. Loading State
  if (action.type === 'LOADING') {
    return { ...state, loading: true };
  }

  // ૨. API Data Loaded
  if (action.type === 'DISPLAY_ITEMS') {
    return { ...state, cart: action.payload, loading: false };
  }

  // ૩. Clear Cart Action
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }

  // ૪. Remove Item Action
  if (action.type === 'REMOVE') {
    const updatedCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: updatedCart };
  }

  // ૫. Increase Amount Action
  if (action.type === 'INCREASE') {
    const updatedCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    return { ...state, cart: updatedCart };
  }

  // ૬. Decrease Amount Action
  if (action.type === 'DECREASE') {
    const updatedCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      })
      .filter((item) => item.amount > 0);
    return { ...state, cart: updatedCart };
  }

  // ૭. Get Totals
  if (action.type === 'GET_TOTALS') {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );

    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }

  throw new Error(`No matching action type: ${action.type}`);
};

export default reducer;