import React, { useState } from "react";
import Dashboard from "./../Components/MenuBar";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

function AddMeeting() {
  const [name, setName] = useState("");
  const [external_id, setExternalId] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8000/api/v1/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          name: name,
          external_id: external_id,
        }),
      });
      if (res.status === 201) {
        setName("");
        setExternalId("");
        setMessage("Meeting created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Dashboard />
      <Button></Button>
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

export default AddMeeting;
