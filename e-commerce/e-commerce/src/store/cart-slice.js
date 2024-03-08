import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState:{
      itemsList: [],
      totalQuantity: 0,
      showCart: false
    },
    reducers: {
        addToCart(state, action){
            const newItem = action.payload;
            const existingItem = state.itemsList.find((item)=> item.id === newItem.id);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
                existingItem.SL--;
            }else{
                state.itemsList.push({
                    id: newItem.ID,
                    price: newItem.price,
                    quantity: 1,
                    name: newItem.name,
                    SL: newItem.SL,
                    brand: newItem.brand,
                    img: newItem.img
                });
                state.totalQuantity++;
            }
        },
        removeFromCart(state, action){
            const ID = action.payload;
            const existingItem = state.itemsList.find(item=> item.id === ID);
            if (existingItem.quantity === 1){
                state.itemsList = state.itemsList.filter(item=> item.id !== ID);
                state.totalQuantity--;
            }else {
                existingItem.quantity--;
                existingItem.SL++;
                existingItem.totalPrice -= existingItem.price;
            }
        },
        setShowCart(state){
            state.showCart = !state.showCart;
        },
        resetCart: (state) => {
            state.itemsList = []
          },
    }
})
export const cartActions = cartSlice.actions;
export default cartSlice;