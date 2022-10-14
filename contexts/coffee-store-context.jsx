import { createContext, useReducer, useState } from "react";

const COFFEE_STORE_ACTION_TYPES = {
  SET_LAT_LONG: "SET_LAT_LONG",
  SET_COFFEE_STORES: "SET_COFFEE_STORES",
  SET_COFFEE_STORE_PHOTOS: "SET_COFFEE_STORE_PHOTOS",
};

const coffeeStoreReducer = (state, action) => {
  switch (action.type) {
    case COFFEE_STORE_ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latlong: action.payload };
    }
    case COFFEE_STORE_ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, nearbyStores: action.payload };
    }
    case COFFEE_STORE_ACTION_TYPES.SET_COFFEE_STORE_PHOTOS: {
      return { ...state, nearbyPhotos: action.payload };
    }
    default:
      throw new Error(`Unhandled action type : ${action.type}`);
  }
};

const CoffeeStoreContext = createContext();

const CoffeeStoreProvider = ({ children }) => {
  const initialState = {
    latlong: "",
    nearbyStores: [],
    nearbyPhotos: [],
  };

  const [state, dispatch] = useReducer(coffeeStoreReducer, initialState);

  return (
    <CoffeeStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </CoffeeStoreContext.Provider>
  );
};

export {
    CoffeeStoreContext,
    COFFEE_STORE_ACTION_TYPES,
    CoffeeStoreProvider
  }
  