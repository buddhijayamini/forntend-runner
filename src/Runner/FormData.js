import React, { useState, useEffect } from "react";
import Dashboard from "./../Components/MenuBar";
import { useLocation } from "react-router-dom";

function ViewFormData() {
  const [runData, setRunData] = useState([]);
  const [runName, setRunName] = useState([]);
  const [lastRun, setLastRun] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const id = location.state.id; //1; //this.state.id;
    console.log(id);
    const res = await fetch(
      `http://localhost:8000/api/v1/runner/` + id + `/form-data`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      }
    );
    const data = await res.json();

    try {
      setRunData(data.data.original.runner_data);
      setRunName(data.data.original.runner_name[0]);
      setLastRun(data.data.original.Last_runs);
      //   console.log(data.data.original.runner_name[0]["name"]);
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
      <div>
        <h1 style={{ float: "left", marginLeft: "35%" }}>Runner Form List</h1>
      </div>
      <br />
      <br />
      <br />
      <div style={{ float: "left" }}>
        <h3 style={{ marginLeft: "10px" }}>Runner Name : {runName.name}</h3>
      </div>
      <br />
      <br />
      <div>
        <h4 style={{ marginLeft: "10px", float: "left" }}>Runner Data</h4>
        <h4 style={{ marginRight: "50px", float: "right" }}>Last Runner</h4>
        <br />
        <br />
        <table
          id="example2"
          className="table table-bordered table-hover"
          style={{ marginLeft: "10px", width: "50%", float: "left" }}
        >
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Color</th>
              <th style={{ width: "20%" }}>Age</th>
              <th style={{ width: "20%" }}>Gender</th>
            </tr>
          </thead>
          <tbody>
            {runData &&
              runData.length > 0 &&
              runData.map((run) => (
                <tr key={run.color}>
                  <td>{run.color}</td>
                  <td>{run.age}</td>
                  <td>{run.sex}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <table
          id="example2"
          className="table table-bordered table-hover"
          style={{ marginRight: "50px", width: "20%", float: "right" }}
        >
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {lastRun &&
              lastRun.length > 0 &&
              lastRun.map((ltrun) => (
                <tr key={ltrun.name}>
                  <td>{ltrun.name}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewFormData;
