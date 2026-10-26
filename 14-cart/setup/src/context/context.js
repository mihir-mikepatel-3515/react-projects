// src/context/context.js
import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';

// Course API URL
const url = 'https://www.course-api.com/react-useReducer-cart-project';

const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: [], // શરૂઆતમાં ખાલી એરે રહેશે
  total: 0,
  amount: 0,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id });
  };

  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id });
  };

  // API Call Function (Asynchronous JS: async/await)
  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const response = await fetch(url);
      const cart = await response.json();
      dispatch({ type: 'DISPLAY_ITEMS', payload: cart });
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  // Mounting Lifecycle: પેજ પહેલીવાર લોડ થાય ત્યારે જ રન થશે
  useEffect(() => {
    fetchData();
  }, []);

  // જ્યારે પણ state.cart બદલાય ત્યારે Totals અપડેટ થશે
  useEffect(() => {
    dispatch({ type: 'GET_TOTALS' });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};