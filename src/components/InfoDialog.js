import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckIcon from "@material-ui/icons/Check";
import React from "react";
function InfoDialog(props) {
  const handleClose = () => {
    props.handleClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle id="simple-dialog-title">Interval Scheduling</DialogTitle>
      <DialogContent>
        <DialogContentText id="simple-dialog-description">
          The interval/job scheduling problem tries to schedule as many
          compatible jobs as possible. Two jobs must not overlap in order for
          them to be compatible. The timeline (from 0-100) represents the time.
          To solve the problem, a greedy algorithm is used. Before the greedy
          algorithm can start adding jobs, it is necessary to sort the jobs. The
          way the intervals are sorted is extremely important. In general there
          are four ways to sort the jobs:
          <List>
            <ListItem>
              <CancelIcon />
              <ListItemText primary={"Starttime"} />
            </ListItem>
            <ListItem>
              <CancelIcon />
              <ListItemText primary={"Smallest interval"} />
            </ListItem>
            <ListItem>
              <CheckIcon />
              <ListItemText primary={"Endtime"} />
            </ListItem>
            <ListItem>
              <CancelIcon />
              <ListItemText primary={"Least conflicts"} />
            </ListItem>
          </List>
          The correct way to sort the problem is by sorting the jobs ascending
          according to the endtime. Then the greedy algorithm can start doing
          his job.
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default InfoDialog;
