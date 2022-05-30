import React, { useState } from "react";
import "../App.css";
import TextField from "@material-ui/core/TextField";
import { Button, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InfoIcon from "@material-ui/icons/Info";
import InfoDialog from "./InfoDialog";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

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
          label="Number of intervals"
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
          disabled={props.running}
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
          <FormControl style={{ minWidth: 160 }}>
            <InputLabel
              id="demo-controlled-open-select-label"
              onChange={() => props.sortIntervals()}
            >
              Sorting method
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              open={formOpen}
              onClose={() => setFormOpen(false)}
              onOpen={() => setFormOpen(true)}
              onChange={(e) => props.changeDropdown(e)}
              value={props.sortMethod}
              color="primary"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {/*TODO: align order with the order in the slides*/}
              <MenuItem value={0}>Earliest endtime (correct)</MenuItem>
              <MenuItem value={1}>Earliest starttime (incorrect)</MenuItem>
              <MenuItem value={2}>Smallest interval (incorrect)</MenuItem>
              {/* <MenuItem value={3}>Least conflicts (incorrect)</MenuItem> TODO: implement */}
            </Select>
          </FormControl>
          <Button
            color="secondary"
            variant="contained"
            className={classes.button}
            onClick={() => props.sortIntervals()}
            disabled={props.running}
          >
            Sort Intervals
          </Button>

          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => props.performGreedy()}
            disabled={props.running}
          >
            Start Greedy
          </Button>
          <IconButton onClick={() => setDialogOpen(true)}>
            <InfoIcon style={{ color: "white" }} />
          </IconButton>
        </div>
      </div>
      <InfoDialog
        open={dialogOpen}
        handleClose={() => {
          setDialogOpen(false);
        }}
      />
    </div>
  );
}

export default NavBar;
