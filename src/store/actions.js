
export const setUser = ({commit},payload) => {
    commit('setUser',payload);
};
export const setProducts = ({commit},payload) => {
    commit('setProducts', payload);
};
export const setAdmin = ({commit},payload) => {
    commit('setAdmin', payload);
};
export const addCartItem = ({commit},payload) => {
    commit('addCartItem',payload);
};
export const removeCartItem = ({commit},payload) => {
    commit('removeCartItem',payload);
};
export const resetCart = ({commit}) => {
    commit('resetCart');
};
export const setApplicationJob = ({commit}, payload) => {
    commit('setApplicationJob',payload);
};
export const setDeliveryBoy = ({commit}, payload) => {
    commit('setDeliveryBoy',payload);
};
