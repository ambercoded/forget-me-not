import React, { useReducer } from "react";
import { ADD_COINS, REMOVE_COINS } from "../types";
import rewardsReducer from "./rewardsReducer";
import RewardsContext from "./rewardsContext";

// TODO: this shall later be replaced by having a "coins" attribute on the user model that is then retrieved after logging in

const RewardsState = (props) => {
  // set initialState
  const initialState = {
    coins: 0,
  };

  const [state, dispatch] = useReducer(rewardsReducer, initialState);

  // the actions that can be dispatched and called

  // add coins
  const addCoins = (amountOfCoins) => {
    dispatch({ type: ADD_COINS, payload: amountOfCoins });
  };

  // remove coins
  const removeCoins = (amountOfCoins) => {
    dispatch({ type: REMOVE_COINS, payload: amountOfCoins });
  };

  return (
    <RewardsContext.Provider
      value={{
        coins: state.coins,
        addCoins,
        removeCoins,
      }}
    >
      {props.children}
    </RewardsContext.Provider>
  );
};

export default RewardsState;
