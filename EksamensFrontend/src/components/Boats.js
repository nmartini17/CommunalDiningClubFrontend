import facade from "../apiFacade";
import { useState, useEffect } from "react";

function Boats() {
  const [boatsInHarbour, setBoatsInHarbour] = useState([
    { id: "", brand: "", make: "", name: "", image: "" },
  ]);

  const [harbourName, setHarbourName] = useState("");

  const updates = (data) => {
    const boatsInHarbourList = [];
    data.map((i) => {
      boatsInHarbourList.push({
        id: i.id,
        brand: i.brand,
        name: i.make,
        make: i.name,
        image: i.image,
      });
    });
    setBoatsInHarbour(boatsInHarbourList);
    console.log(boatsInHarbour);
    console.log(boatsInHarbourList);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    facade.fetchData("boat/harbour/" + harbourName, updates);
  };

  function handleInput(e) {
    const target = e.target;
    const value = target.value;
    setHarbourName(value);
    console.log(value);
  }

  function tableRows() {
    return boatsInHarbour.map((i) => {
      return (
        <tr>
          <td>{i.id}</td>
          <td>{i.brand}</td>
          <td>{i.make}</td>
          <td>{i.name}</td>
          <td>{i.image}</td>
        </tr>
      );
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit} onChange={handleInput}>
        <input
          onChange={handleInput}
          type="text"
          placeholder="Harbour name"
          id="searchBox"
        />
        <div>
          <button
            onClick={handleSubmit}
            type="button"
            className="btn btn-primary mb-2"
          >
            Search
          </button>
        </div>
      </form>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Brand</th>
            <th scope="col">Make</th>
            <th scope="col">Name</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>{tableRows()}</tbody>
      </table>
    </div>
  );
}

export default Boats;
