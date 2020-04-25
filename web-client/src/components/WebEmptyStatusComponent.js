import React from "react";
import { GRAY, WHITE } from "../utils/webColors";
import STATUS from "../assets/svg/status.svg";
import CANCEL from "../assets/svg/cancel.svg";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";

const WebStatusEmptyComponent = ({ message, onCancelClick }) => {
  const classes = useStyles();

  return (
    <div className={classes.parent}>
      <img onClick={onCancelClick} alt={"Cancel"} className={classes.cancelIcon} src={CANCEL} />
      <img alt={"Chat"} className={classes.alertIcon} src={STATUS} />
      <p style={{ fontSize: 16, color: GRAY, marginTop: 5, fontFamily: 'Roboto', }}>{message}</p>
    </div>
  );
};

export default WebStatusEmptyComponent;

const useStyles = makeStyles({
  parent: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center", 
    display: "flex",
    fontFamily: 'Roboto',
  },
  alertIcon: {
    height: 80,
    width: 80,
    alignSelf: "center",
    color: GRAY,
    marginBottom: "3%",
  },
  cancelIcon: {
    alignSelf: "center",
    color: GRAY,
    position: "absolute",
    top: 20,
    right: 20,
    cursor:'pointer'
  },
});
