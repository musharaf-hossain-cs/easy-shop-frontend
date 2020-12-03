
export const setUser = (state, user) => {
    state.User = user;
    console.log(user);
};
export const setProducts = (state,products) => {
    state.products = products;
};
export const setAdmin = (state,status) => {
    state.isAdmin = status;
};
export const addCartItem = (state, payload) => {
    state.currentCart.push(payload);
};
export const removeCartItem = (state,payload) => {
    let idx = state.currentCart.findIndex(item => item.id === payload);
    if(idx >= 0){
        state.currentCart.splice(idx,1);
    }
};
