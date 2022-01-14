import facade from "../apiFacade";
import { useState, useEffect } from "react";

function AdminPage() {
  const [allEvents, setAllEvents] = useState([
    {
      id: "",
      time: "",
      location: "",
      dish: "",
      price: "",
    },
  ]);

  const init = {
    time: "",
    location: "",
    dish: "",
    price: "",
  };

  const init1 = {
    address: "",
    phone: "",
    email: "",
    bdayyear: "",
    account: "",
  };

  const [createEvent, setCreateEvent] = useState(init);

  const [deleteEvent, setDeleteEvent] = useState("");

  const [createMember, setCreateMember] = useState(init1);

  // const [addFormData, setAddFormData] = useState(init);

  /* 
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      time: addFormData.time,
      location: addFormData.location,
      dish: addFormData.dish,
      price: addFormData.price,
    };

    const newContacts = [...createEvent, newContact];
    setCreateEvent(newContacts);
  }; */

  const performCreateMember = (evt) => {
    evt.preventDefault();
    facade.postCreateMember(
      createMember.address,
      createMember.phone,
      createMember.email,
      createMember.bdayyear,
      createMember.account
    );
  };

  const onChangeMember = (evt) => {
    setCreateMember({
      ...createMember,
      [evt.target.id]: evt.target.value,
    });
  };

  const performCreateEvent = (evt) => {
    evt.preventDefault();
    facade.postEvent(
      createEvent.time,
      createEvent.location,
      createEvent.dish,
      createEvent.price
    );
  };

  const onChange = (evt) => {
    setCreateEvent({
      ...createEvent,
      [evt.target.id]: evt.target.value,
    });
  };

  const deleteEvent1 = (evt) => {
    evt.preventDefault();
    facade.deleteEvent(deleteEvent.id);
  };

  const onChangeDeleteEvent = (evt) => {
    setDeleteEvent({
      ...deleteEvent,
      [evt.target.id]: evt.target.value,
    });
  };

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
      <div className="container-md">
        <div className="row mb-2">
          <div className="col-sm-4" />
          <div className="col-sm-4 ">
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
        </div>
      </div>
      <form onChange={onChange}>
        <div className="container-md">
          <div className="row mb-2">
            <div className="col-sm-4" />
            <div className="col-sm-4">
              <input
                className="form-control col-md-auto mb-2"
                type="number"
                placeholder="Time"
                name="time"
                id="time"
                required="required"
              />
              <input
                className="form-control col-md-auto mb-2"
                type="text"
                placeholder="Location"
                name="location"
                id="location"
                required="required"
              />
              <input
                className="form-control col-md-auto mb-2"
                type="text"
                placeholder="Dish"
                name="dish"
                id="dish"
                required="required"
              />
              <input
                className="form-control col-md-auto mb-2"
                type="number"
                placeholder="Price"
                name="price"
                id="price"
                required="required"
              />
              <button
                className="btn btn-primary mb-2"
                type="submit"
                onClick={performCreateEvent}
              >
                Add event
              </button>
              <p>You need to reload the webpage, to see changes.</p>
            </div>
          </div>
        </div>
      </form>

      <form onChange={onChangeDeleteEvent}>
        <div className="container-md">
          <div className="row">
            <div className="col-sm-4" />
            <div className="col-sm-4">
              <input
                className="form-control col-md-auto mb-2"
                type="number"
                placeholder="ID of event you want to delete"
                name="id"
                id="id"
                required="required"
              />
              <button
                className="btn btn-primary mb-2"
                type="submit"
                onClick={deleteEvent1}
              >
                Delete event
              </button>
              <p>You need to reload the webpage, to see changes.</p>
            </div>
          </div>
        </div>
      </form>

      <form onChange={onChangeMember}>
        <div className="container-md">
          <div className="row mb-2">
            <div className="col-sm-4" />
            <div className="col-sm-4">
              <input
                className="form-control col-md-auto mb-2"
                type="text"
                placeholder="Address"
                name="address"
                id="address"
                required="required"
              />
              <input
                className="form-control col-md-auto mb-2"
                type="number"
                placeholder="Phone"
                name="phone"
                id="phone"
                required="required"
              />
              <input
                className="form-control col-md-auto mb-2"
                type="text"
                placeholder="Email"
                name="email"
                id="email"
                required="required"
              />
              <input
                className="form-control col-md-auto mb-2"
                type="number"
                placeholder="Date of Birth"
                name="bdayyear"
                id="bdayyear"
                required="required"
              />
              <input
                className="form-control col-md-auto mb-2"
                type="number"
                placeholder="Amount of money"
                name="account"
                id="account"
                required="required"
              />
              <button
                className="btn btn-primary mb-2"
                type="submit"
                onClick={performCreateMember}
              >
                Create Member
              </button>
              <p>Check database</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AdminPage;
