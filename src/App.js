import logo from "./logo.svg";
import "./App.css";
import Interval from "./components/Interval";
import { useState, useRef, createRef } from "react";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { blue, amber, yellow } from "@material-ui/core/colors";
import NavBar from "./components/Navbar";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f54287",
    },
    secondary: amber,
  },
  multilineColor: {
    color: "#000000",
  },
  root: {
    "& .MuiFilledInput-root": {
      background: "rgb(232, 241, 250)",
    },
  },
});

function App() {
  const [intervals, setIntervals] = useState([
    { startTime: 20, endTime: 30, name: "Job 1", color: "white", id: 0 },
    { startTime: 40, endTime: 60, name: "Job 2", color: "white", id: 0 },
    { startTime: 0, endTime: 30, name: "Job 3", color: "white", id: 0 },
    { startTime: 10, endTime: 30, name: "Job 4", color: "white", id: 0 },
    { startTime: 60, endTime: 90, name: "Job 5", color: "white", id: 0 },
    { startTime: 60, endTime: 90, name: "Job 5", color: "white", id: 0 },
    { startTime: 60, endTime: 90, name: "Job 5", color: "white", id: 0 },
    { startTime: 40, endTime: 60, name: "Job 2", color: "white", id: 0 },
    { startTime: 0, endTime: 30, name: "Job 3", color: "white", id: 0 },
    { startTime: 10, endTime: 30, name: "Job 4", color: "white", id: 0 },
    { startTime: 60, endTime: 90, name: "Job 5", color: "white", id: 0 },
    { startTime: 60, endTime: 90, name: "Job 5", color: "white", id: 0 },
    { startTime: 60, endTime: 90, name: "Job 5", color: "white", id: 0 },
  ]);

  const myRefs = useRef([]); //passes refs to each interval
  const timer = (ms) => new Promise((res) => setTimeout(res, ms)); //timer for loop

  const sortJobs = () => {
    //sorts the jobs based on endTime
    let newArray = intervals;
    newArray.sort((job1, job2) =>
      job1.endTime > job2.endTime ? 1 : job1.endTime < job2.endTime ? -1 : 0
    );
    setIntervals([...newArray]);
  };

  const performGreedy = async () => {
    //performs the greedy algorithm
    let solution = [];
    let time = 0;
    for (let i = 0; i < intervals.length; i++) {
      if (time <= intervals[i].startTime) {
        solution.push(intervals[i]);
        changeColor(i);
        executeScroll(intervals[i].id);
        time = intervals[i].endTime;
      }
      await timer(100);
    }
  };

  const generateRandomArray = (size) => {
    let generatedArray = [];
    for (let i = 0; i < size; i++) {
      let startTime = Math.random() * 100;
      let length = Math.random() * 50;
      if (startTime + length <= 100) {
        generatedArray.push({
          startTime: startTime,
          endTime: startTime + length,
          name: "Job " + i,
          color: "white",
          id: i,
        });
      }
    }
    setIntervals(generatedArray);
  };

  const changeColor = (index) => {
    //changes color of interval
    intervals[index].color = "#2196f3";
    setIntervals([...intervals]);
  };

  const executeScroll = (index) => {
    //executes the scroll to the now colored interval
    myRefs.current[index].scrollIntoView({ block: "end", behavior: "smooth" });
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        {/* <div
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
              variant="filled"
              style={{ margin: "0 2%" }}
              color="secondary"
            />
            <TextField
              id="filled-basic"
              label="Enter endtime here"
              variant="filled"
              className={theme.root}
            />
            <Button onClick={sortJobs} color="primary" variant="contained">
              Sort me
            </Button>
            <Button
              onClick={performGreedy}
              color="secondary"
              variant="contained"
            >
              Sort me
            </Button>
            <Button
              onClick={() => {
                generateRandomArray(1000);
              }}
              color="secondary"
              variant="contained"
            >
              Generate!
            </Button>
          </div>
        </div> */}
        <NavBar
          generateArray={(intervalSize) => generateRandomArray(intervalSize)}
          sortIntervals={() => sortJobs()}
          performGreedy={() => performGreedy()}
        />
        {/* <div
        style={{ width: "50%", backgroundColor: "white", marginBottom: "0.1%" }}
      >
        Intervall 1
      </div> */}
        <div style={{ marginTop: "6%" }}>
          {intervals.map((interval, index) => {
            return (
              <div ref={(id) => (myRefs.current[interval.id] = id)}>
                <Interval
                  key={index}
                  startTime={interval.startTime}
                  endTime={interval.endTime}
                  name={interval.name}
                  color={interval.color}
                />
              </div>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            position: "fixed",
            bottom: 0,
            color: "white",
          }}
        >
          <p>10</p>
          <p>20</p>
          <p>30</p>
          <p>40</p>
          <p>50</p>
          <p>60</p>
          <p>70</p>
          <p>80</p>
          <p>90</p>
          <p>100</p>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
