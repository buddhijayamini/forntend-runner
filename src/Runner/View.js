import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Dashboard from "./../Components/MenuBar";
import { useNavigate } from "react-router-dom";

function ViewRunner() {
  const [runs, setRuns] = useState([]);
  const navigate = useNavigate();

  const toViewFormData = () => {
    let runId = 1; //runs.id;//e.target.value;
    navigate("/viewFormData", { state: { id: runId } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await fetch("http://localhost:8000/api/v1/runner?data=10", {
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
    //       "Authorization": "Bearer "+localStorage.getItem("access_token"),
    //    },
    //    }
    //    );
    // const data1 = await res.json();
    try {
      setRuns(data.data);
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
        <h1 style={{ float: "left", marginLeft: "40%" }}>Runner List</h1>
        <Button
          style={{
            float: "right",
            marginRight: "10%",
            backgroundColor: "blue",
          }}
        >
          <a href="/addRunner" style={{ color: "white" }}>
            Add Runner
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
            <th style={{ width: "20%" }}>Race Id</th>
            <th style={{ width: "20%" }}>External Id</th>
            <th style={{ width: "20%" }}>Name</th>
            <th style={{ width: "10%" }}>Created At</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {runs &&
            runs.map((run) => (
              <tr key={run.id}>
                <td>{run.id}</td>
                <td>{run.race_id}</td>
                <td>{run.external_id}</td>
                <td>{run.name} </td>
                <td>{run.created_at.substring(0, 10)}</td>
                <td>
                  <button
                    onClick={() => {
                      toViewFormData();
                    }}
                    value={run.id}
                  >
                    View Form
                  </button>
                  {/* <Link to={{
      pathname: '/viewFormData',
      state: {id: run.id}
    }} >Learn More</Link> */}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewRunner;
