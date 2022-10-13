import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

// Global Store Setup
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    // action
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      // go throw the list to try and find the id
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      // make a copy of the basket
      let newBasket = [...state.items];
      if (index > -1) {
        //Them item exists.. remove it
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cannot remove product (id: ${action.payload.id}) as its not in the basket`
        );
      }
      state.items = newBasket;
    },
    removeGroupedFromBasket: (state, action) => {
      let newBasket = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      state.items = newBasket;
    },
    clearBasket: (state, action) => {
      state.items = [];
    },
  },
});

export const { addToBasket, removeFromBasket, removeGroupedFromBasket } =
  basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
