import React, { useState } from "react";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
  },
  input: {
    color: "white",
  },
  button: {
    marginLeft: "1%",
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const [jobSize, setIntervalSize] = useState(0);

  return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        top: "0",
        backgroundColor: "#2196f3",
        marginBottom: "2%",
        zIndex: 3,
      }}
    >
      <div
        style={{
          margin: "0.2%",
          color: "white",
          display: "flex",
          flexDirection: "row",
          alignItems: "left",
        }}
      >
        {/* <Typography variant="h3">Interval Scheduling Visualizer</Typography> */}
        {/* <TextField
          label="Enter starttime here"
          id="filled-basic"
          style={{ margin: "0 2%" }}
          color="secondary"
          InputProps={{
            className: classes.input,
          }}
        />
        <TextField
          id="filled-basic"
          label="Enter endtime here"
          color="secondary"
          style={{ margin: "0 1%" }}
          InputProps={{
            className: classes.input,
          }}
        />
        <Button color="primary" variant="contained" className={classes.button}>
          Add Job
        </Button> */}
        <TextField
          id="filled-basic"
          label="Intervalsize"
          color="secondary"
          style={{ margin: "0 1%" }}
          InputProps={{
            className: classes.input,
          }}
          onChange={(e) => setIntervalSize(e.target.value)}
        />
        <Button
          onClick={() => {
            props.generateArray(jobSize);
          }}
          color="secondary"
          variant="contained"
          className={classes.button}
        >
          Generate!
        </Button>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
            alignItems: "right",
            width: "100%",
          }}
        >
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            onClick={() => props.sortIntervals()}
          >
            Sort Intervals
          </Button>

          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => props.performGreedy()}
          >
            Start Greedy
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
