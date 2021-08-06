import { ThemeProvider } from "@material-ui/core";
import { amber } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core/styles";
import { useRef, useState } from "react";
import "./App.css";
import Interval from "./components/Interval";
import NavBar from "./components/Navbar";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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

  const [open, setOpen] = useState(true);
  const [solutionLength, setSolutionLength] = useState(0);

  const myRefs = useRef([]); //passes refs to each interval
  const timer = (ms) => new Promise((res) => setTimeout(res, ms)); //timer for loop

  const handleClose = () => {
    setOpen(false);
  };

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
      await timer(20);
    }
    setSolutionLength(solution.length);
    setOpen(true);
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
        <NavBar
          generateArray={(intervalSize) => generateRandomArray(intervalSize)}
          sortIntervals={() => sortJobs()}
          performGreedy={() => performGreedy()}
        />
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "center", horizontal: "center" }}
        >
          <MuiAlert onClose={handleClose} severity="success">
            It was possible to finish {solutionLength} jobs!
          </MuiAlert>
        </Snackbar>

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
