import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

import axios from "axios";

import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateAddress, setUpdateAddress] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [attandances, setAttandances] = useState([]);
  const [isUpdate, setIsUpdate] = useState(0);
  const [attandanceId, setAttandanceId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      name: name,
      address: address,
      email: email,
      phone: phone
    };

    function createAttandance() {
      axios
        .post("https://powerful-dawn-07149.herokuapp.com/create", payload)
        .then(({ data: { data } }) => {
          setAttandances([...attandances, data]);
        })
        .catch(err => {
          console.log(err);
        });
    }

    createAttandance();

    setName("");
    setAddress("");
    setEmail("");
    setPhone("");
  }

  function updateAttandance(number, person) {
    setIsUpdate(number);
    setAttandanceId(person._id);
    setUpdateName(person.name);
    setUpdateAddress(person.address);
    setUpdateEmail(person.email);
    setUpdatePhone(person.phone);
  }

  function cancelUpdateAttandance() {
    setIsUpdate(0);
  }

  function handleSubmitUpdate(e) {
    e.preventDefault();

    const payload = {
      name: updateName,
      address: updateAddress,
      email: updateEmail,
      phone: updatePhone
    };

    function submitUpdateAttandance() {
      axios
        .patch(
          `https://powerful-dawn-07149.herokuapp.com/update/${attandanceId}`,
          payload
        )
        .then(data => {
          const newAttandances = attandances.map(attandance => {
            if (attandance._id === attandanceId) {
              attandance.name = updateName;
              attandance.address = updateAddress;
              attandance.email = updateEmail;
              attandance.phone = updatePhone;
            }

            return attandance;
          });

          setAttandances(newAttandances);
          setIsUpdate(0);
        })
        .catch(err => {
          console.log(err);
        });
    }

    submitUpdateAttandance();

    setAttandanceId("");
    setUpdateName("");
    setUpdateAddress("");
    setUpdateEmail("");
    setUpdatePhone("");
  }

  function deleteAttandance(id) {
    axios
      .delete(`https://powerful-dawn-07149.herokuapp.com/delete/${id}`)
      .then(data => {
        const deleteAttandaceById = attandances.filter(
          attandance => attandance._id !== id
        );

        setAttandances(deleteAttandaceById);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    function getData() {
      axios
        .get("https://powerful-dawn-07149.herokuapp.com")
        .then(({ data: { data } }) => {
          setAttandances(data);
        })
        .catch(err => {
          console.log(err);
        });
    }

    getData();
  }, []);

  return (
    <div>
      <h1 className="text-center mt-3">Daftar Kehadiran Peserta Rapat</h1>
      <form className="text-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          className="ml-1"
          name="address"
          value={address}
          placeholder="Address"
          onChange={e => setAddress(e.target.value)}
        />
        <input
          type="text"
          className="ml-1"
          name="email"
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="ml-1"
          name="phone"
          value={phone}
          placeholder="Phone"
          onChange={e => setPhone(e.target.value)}
        />
        <input className="ml-1" type="submit" />
      </form>
      <div className="m-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {attandances.map((person, index) => (
              <tr key={index}>
                {isUpdate === index + 1 ? (
                  <>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={updateName}
                        placeholder="Name"
                        onChange={e => setUpdateName(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="ml-1"
                        name="address"
                        value={updateAddress}
                        placeholder="Address"
                        onChange={e => setUpdateAddress(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="ml-1"
                        name="email"
                        value={updateEmail}
                        placeholder="Email"
                        onChange={e => setUpdateEmail(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="ml-1"
                        name="phone"
                        value={updatePhone}
                        placeholder="Phone"
                        onChange={e => setUpdatePhone(e.target.value)}
                      />
                    </td>
                    <td>
                      <button onClick={handleSubmitUpdate}>update</button>
                      &nbsp;
                      <button onClick={cancelUpdateAttandance}>cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{index + 1}</td>
                    <td>{person.name}</td>
                    <td>{person.address}</td>
                    <td>{person.email}</td>
                    <td>{person.phone}</td>
                    <td>
                      <button
                        onClick={() => updateAttandance(index + 1, person)}
                      >
                        edit
                      </button>
                      &nbsp;
                      <button onClick={() => deleteAttandance(person._id)}>
                        delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
