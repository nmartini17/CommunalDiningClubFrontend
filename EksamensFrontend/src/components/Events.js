import facade from "../apiFacade";
import { useState, useEffect } from "react";

function Events() {
  const [allEvents, setAllEvents] = useState([
    {
      id: "",
      time: "",
      location: "",
      dish: "",
      price: "",
    },
  ]);

  const updates = (data) => {
    const allEventsList = [];
    data.map((i) => {
      allEventsList.push({
        id: i.id,
        time: i.time,
        location: i.location,
        dish: i.dish,
        price: i.price,
      });
    });
    setAllEvents(allEventsList);
    console.log(allEventsList);
  };

  useEffect(() => {
    facade.fetchData("dinnerevent/all", updates);
  }, [facade]);

  function tableRows() {
    return allEvents.map((i) => {
      return (
        <tr>
          <td>{i.id}</td>
          <td>{i.time}</td>
          <td>{i.location}</td>
          <td>{i.dish}</td>
          <td>{i.price}</td>
        </tr>
      );
    });
  }

  return (
    <div>
      <h1>Here are all the events</h1>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Time</th>
            <th scope="col">Location</th>
            <th scope="col">Dish</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>{tableRows()}</tbody>
      </table>
    </div>
  );
}

export default Events;
