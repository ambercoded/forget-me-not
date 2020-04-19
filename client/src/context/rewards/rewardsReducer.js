import { ADD_COINS, REMOVE_COINS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case ADD_COINS:
      return {
        coins: state.coins + action.payload,
      };
    case REMOVE_COINS:
      return {
        coins: state.coins - action.payload,
      };

    default:
      return state;
  }
};
