import React, { useState, useEffect } from "react";
import Dashboard from "./../Components/MenuBar";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";
import axios from "axios";

function AddRunner() {
  const [name, setName] = useState("");
  const [external_id, setExternalId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [races, setRace] = useState([]);
  const [selectedRace, setSelectedRace] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      const response1 = await axios.get("http://localhost:8000/api/v1/races", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      setRace(response1.data.data);
      setLoading(false);
    };

    loadPost();
  }, []);

  function handleSelect(e) {
    //console.log("Selected Race", e.target.value);
    const raceSel = e.target.value;
    setSelectedRace(raceSel);
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8000/api/v1/runner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          name: name,
          external_id: external_id,
          race_id: selectedRace,
        }),
      });
      if (res.status === 201) {
        setName("");
        setExternalId("");
        setRace("");
        setMessage("Runner created successfully");
      } else {
        setMessage("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dashboard />
      <form onSubmit={handleSubmit}>
        <Card
          style={{
            padding: "10px",
            marginLeft: "10%",
            marginTop: "50px",
            marginRight: "10%",
            backgroundColor: "gray",
          }}
        >
          <CardContent>
            <div>
              {loading ? (
                <h4>Loading...</h4>
              ) : (
                <select
                  className="form-control"
                  onChange={(e) => handleSelect(e)}
                  value={selectedRace}
                  required
                >
                  <option>Select Race</option>
                  {races &&
                    races.length > 0 &&
                    races.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              )}
            </div>
            <br />
            <Typography>
              <input
                type="text"
                className="form-control"
                value={external_id}
                required
                placeholder="External Id"
                onChange={(e) => setExternalId(e.target.value)}
              />
            </Typography>
            <br />
            <Typography>
              <input
                type="text"
                value={name}
                className="form-control"
                required
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              type="submit"
              className="form-control"
              style={{ backgroundColor: "blue", color: "white" }}
            >
              Save
            </Button>
            <br />
            <div className="message">{message ? <p>{message}</p> : null}</div>
          </CardActions>
        </Card>
      </form>
    </div>
  );
}

export default AddRunner;
