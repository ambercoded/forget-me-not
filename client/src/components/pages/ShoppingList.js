import React from "react";

const ShoppingList = () => {
  return (
    <div className="text-center">
      <h1>Shopping List</h1>

      <input type="text" />
      <button className="btn btn-primary">
        <i className="fas fa-plus"></i>Add item <em>(+ 2 coins)</em>
      </button>

      <div className="container text-center my-1 ">
        <p>No items on your shopping list yet. Add a new item.</p>
        <i className="fas fa-box-open"></i>
      </div>

      <div className="card bg-light ">
        <h2>Add items you liked in the past</h2>
        <div className="grid-3">
          <div className="card">Apples</div>
          <div className="card">Pasta</div>
          <div className="card">Milk</div>
          <div className="card">Orangejuice</div>
          <div className="card">Cheese</div>
          <div className="card">Spinach</div>
          <div className="card">Red wine</div>
          <div className="card">Toiletpaper</div>
        </div>
      </div>
    </div>
  );
};
export default ShoppingList;
