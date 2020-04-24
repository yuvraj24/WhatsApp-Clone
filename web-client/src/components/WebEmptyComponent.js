import React from "react";
import { GRAY, WHITE } from "../utils/webColors";
import CHAT from "../assets/images/chat.png";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";

const WebEmptyComponent = ({ message }) => {
  const classes = useStyles();

  return (
    <html className={classes.parent}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </head>
      <div className={classes.parent}>
        <img
          alt={"Chat"}
          className={classes.alertIcon}
          src={CHAT}
          loop={true}
        />
        <p style={{ fontSize: 16, color: GRAY, marginTop: 5 }}>{message}</p>
      </div>
    </html>
  );
};

const useStyles = makeStyles({
  parent: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    display: "flex",
    fontFamily:'Roboto',
    flex:1, 
  },
  alertIcon: {
    height: 60,
    width: 60,
    alignSelf: "center",
    justifyContent:'center',
    color: GRAY,
    marginBottom: "3%",
    fontFamily:'Roboto',
    // marginLeft: '15%'
  },
});

export default WebEmptyComponent;
