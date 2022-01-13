import facade from "../apiFacade";
import { useState, useEffect } from "react";

function Owners() {
  const [allOwners, setAllOwners] = useState([
    { id: "", name: "", address: "", phone: "" },
  ]);

  const [boatOwner, setBoatOwner] = useState("");
  const [boatOwner1, setBoatOwner1] = useState([
    {
      id: "",
      name: "",
      address: "",
      phone: "",
    },
  ]);

  const updates = (data) => {
    const allOwnersList = [];
    data.map((i) => {
      allOwnersList.push({
        id: i.id,
        name: i.name,
        address: i.address,
        phone: i.phone,
      });
    });
    setAllOwners(allOwnersList);
    console.log(allOwnersList);
  };

  const updates1 = (data) => {
    const boatOwnerList = [];
    data.map((i) => {
      boatOwnerList.push({
        id: i.id,
        name: i.name,
        address: i.address,
        phone: i.phone,
      });
    });
    setBoatOwner1(boatOwnerList);
    console.log(boatOwner);
    console.log(boatOwnerList);
  };

  useEffect(() => {
    facade.fetchData("owner/all", updates);
  }, [facade]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    facade.fetchData("owner/boat/" + boatOwner, updates1);
  };

  function handleInput(e) {
    const target = e.target;
    const value = target.value;
    setBoatOwner(value);
    console.log(value);
  }

  function tableRows() {
    return allOwners.map((i) => {
      return (
        <tr>
          <td>{i.id}</td>
          <td>{i.name}</td>
          <td>{i.address}</td>
          <td>{i.phone}</td>
        </tr>
      );
    });
  }

  function tableRowsBoat() {
    return boatOwner1.map((i) => {
      return (
        <tr>
          <td>{i.id}</td>
          <td>{i.name}</td>
          <td>{i.address}</td>
          <td>{i.phone}</td>
        </tr>
      );
    });
  }

  return (
    <div>
      <h1>Here are all the owners</h1>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>{tableRows()}</tbody>
      </table>
      <form onSubmit={handleSubmit} onChange={handleInput}>
        <input
          onChange={handleInput}
          type="text"
          placeholder="Boat name"
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
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>{tableRowsBoat()}</tbody>
      </table>
    </div>
  );
}

export default Owners;
