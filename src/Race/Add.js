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

function AddRacing() {
  const [name, setName] = useState("");
  const [external_id, setExternalId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [meets, setMeets] = useState([]);
  const [selectedMeet, setSelectedMeet] = useState("");

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      const response1 = await axios.get(
        "http://localhost:8000/api/v1/meetings",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      setMeets(response1.data.data);
      setLoading(false);
    };

    loadPost();
  }, []);

  function handleSelect(e) {
    //console.log("Selected Meeting", e.target.value);
    const meetSel = e.target.value;
    setSelectedMeet(meetSel);
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8000/api/v1/races", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          name: name,
          external_id: external_id,
          meeting_id: selectedMeet,
        }),
      });
      if (res.status === 201) {
        setName("");
        setExternalId("");
        setMeets("");
        setMessage("Race created successfully");
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
                  value={selectedMeet}
                  required
                >
                  <option>Select Meeting</option>
                  {meets &&
                    meets.length > 0 &&
                    meets.map((item) => (
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

export default AddRacing;
