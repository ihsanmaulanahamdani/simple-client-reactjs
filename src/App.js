import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

import axios from "axios";

import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attandances, setAttandance] = useState([]);

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
        .post("http://localhost:4000/create", payload)
        .then(({ data: { data } }) => {
          setAttandance([...attandances, data]);
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

  useEffect(() => {
    function getData() {
      axios
        .get("http://localhost:4000")
        .then(({ data: { data } }) => {
          setAttandance(data);
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
            </tr>
          </thead>
          <tbody>
            {attandances.map((person, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{person.name}</td>
                <td>{person.address}</td>
                <td>{person.email}</td>
                <td>{person.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
