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
  const [intervals, setIntervals] = useState([]);

  const [open, setOpen] = useState(false);
  const [solutionLength, setSolutionLength] = useState(0);
  const [sortMethod, setSortMethod] = useState(0);

  const myRefs = useRef([]); //passes refs to each interval
  const timer = (ms) => new Promise((res) => setTimeout(res, ms)); //timer for loop

  const handleClose = () => {
    setOpen(false);
  };

  const sortJobs = () => {
    //sorts the jobs based on endTime
    let newArray = intervals;
    switch (sortMethod) {
      case 0:
        newArray.sort((job1, job2) =>
          job1.endTime > job2.endTime ? 1 : job1.endTime < job2.endTime ? -1 : 0
        );
        break;
      case 1:
        newArray.sort((job1, job2) =>
          job1.startTime > job2.startTime
            ? 1
            : job1.startTime < job2.startTime
            ? -1
            : 0
        );
        break;
      case 2:
        newArray.sort((job1, job2) =>
          job1.endTime - job1.startTime > job2.endTime - job2.startTime
            ? 1
            : job1.endTime - job1.startTime < job2.endTime - job2.startTime
            ? -1
            : 0
        );
        break;
      default:
        console.log("Something went wrong");
        break;
    }
    for (let i = 0; i < newArray.length; i++) {
      newArray[i].color = "white";
    }

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

  const changeSortMethod = (e) => {
    setSortMethod(e.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <NavBar
          key={1000}
          generateArray={(intervalSize) => generateRandomArray(intervalSize)}
          sortIntervals={() => sortJobs()}
          performGreedy={() => performGreedy()}
          sortMethod={sortMethod}
          changeDropdown={(e) => changeSortMethod(e)}
        />
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <MuiAlert onClose={handleClose} severity="success">
            It was possible to finish {solutionLength} jobs!
          </MuiAlert>
        </Snackbar>

        <div style={{ marginTop: "6%" }}>
          {intervals.map((interval, index) => {
            return (
              <div ref={(id) => (myRefs.current[interval.id] = id)} key={index}>
                <Interval
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
