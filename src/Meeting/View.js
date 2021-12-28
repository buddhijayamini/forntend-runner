import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Dashboard from "./../Components/MenuBar";
function ViewMeeting() {
  const [meets, setMeets] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("http://localhost:8000/api/v1/meetings?data=10", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    const data = await res.json();
    try {
      setMeets(data.data);
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
        <h1 style={{ float: "left", marginLeft: "40%" }}>Meeting List</h1>
        <Button
          style={{
            float: "right",
            marginRight: "10%",
            backgroundColor: "blue",
          }}
        >
          <a href="/addMeeting" style={{ color: "white" }}>
            Add Meeting
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
            <th style={{ width: "25%" }}>Id</th>
            <th style={{ width: "25%" }}>External Id</th>
            <th style={{ width: "25%" }}>Name</th>
            <th style={{ width: "25%" }}>Created At</th>
          </tr>
        </thead>

        <tbody>
          {meets &&
            meets.map((meet) => (
              <tr key={meet.id}>
                <td>{meet.id}</td>
                <td>{meet.external_id}</td>
                <td>{meet.name} </td>
                <td>{meet.created_at.substring(0, 10)}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewMeeting;
