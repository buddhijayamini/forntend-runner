import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Dashboard from "./../Components/MenuBar";

function ViewRace() {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("http://localhost:8000/api/v1/races?data=10", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    const data = await res.json();
    //   const res1 = await fetch("http://localhost:8000/api/v1/meetings?data=10", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "access_token": localStorage.getItem("access_token"),
    //    },
    //    }
    //    );
    // const data1 = await res.json();
    try {
      setRaces(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line no-undef
      $("#example2").DataTable({
        destroy: true,
        dom: "rBftlip",
        buttons: [{}],
        lengthMenu: [
          [10, 20, 50, 100, -1],
          [10, 20, 50, 100, "All"],
        ],
        pageLength: 10,
      });
    }, 1000);
  }, []);

  return (
    <div>
      <Dashboard />
      <div style={{ padding: "10px" }}>
        <h1 style={{ float: "left", marginLeft: "40%" }}>Race List</h1>
        <Button
          style={{
            float: "right",
            marginRight: "10%",
            backgroundColor: "blue",
          }}
        >
          <a href="/addRacing" style={{ color: "white" }}>
            Add Race
          </a>
        </Button>
      </div>

      <table
        id="example2"
        className="table table-bordered table-hover"
        style={{ marginLeft: "10px", width: "100%" }}
      >
        <thead>
          <tr>
            <th style={{ width: "20%" }}>Id</th>
            <th style={{ width: "20%" }}>Meeting Id</th>
            <th style={{ width: "20%" }}>External Id</th>
            <th style={{ width: "20%" }}>Name</th>
            <th style={{ width: "20%" }}>Created At</th>
          </tr>
        </thead>

        <tbody>
          {races &&
            races.map((race) => (
              <tr key={race.id}>
                <td>{race.id}</td>
                <td>{race.meeting_id}</td>
                <td>{race.external_id}</td>
                <td>{race.name} </td>
                <td>{race.created_at.substring(0, 10)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewRace;
