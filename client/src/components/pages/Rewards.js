import React from "react";

const Rewards = () => {
  return (
    <div>
      <h1 className="text-center">Rewards</h1>
      <p className="my-1">
        You can exchange your coins for rewards here. Create rewards together
        and motivate yourself to do chores that are not that much fun.
      </p>
      <div className="text-center">
        <button className="btn btn-primary">
          <i className="fas fa-plus"></i>Create a new reward
        </button>
      </div>
    </div>
  );
};

export default Rewards;
