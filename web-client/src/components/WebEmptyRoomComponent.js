import React from "react";
import {
  GRAY,
  WHITE,
  TEXT_TITLE,
  MENU_GRAY,
  GREEN,
  LIGHT_GREEN,
} from "../utils/webColors";
import CHAT from "../assets/images/WhatsappEmpty.jpg";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";

const WebEmptyRoomComponent = ({ message }) => {
  const classes = useStyles();

  return (
    <html
      style={{
        backgroundColor: "#F8F9FB",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        display: "flex",
        marginTop: -15,
      }}
    >
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
      <div
        style={{
          backgroundColor: "#F8F9FB",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          alignSelf: "center",
          justifyContent: "center",
          display: "flex",
          marginTop: -15,
        }}
      >
        <img
          alt={"Chat"}
          className={classes.alertIcon}
          src={CHAT}
          loop={true}
        />

        <h1
          style={{
            color: "#525252",
            marginTop: 5,
            fontWeight: "normal",
            marginBottom: 0,
            fontFamily:'roboto'
          }}
        >
          Keep your phone connected
        </h1>
        <div>
          <p
            style={{
              textAlign: "center",
              color: MENU_GRAY,
              fontSize: 14,
              lineHeight: 1.5, 
              fontFamily:'Roboto'
            }}
          >
            WhatsApp connects to your phone to sync messages. To reduce data
            <br />
            usage, connect your phone to Wi-Fi.
          </p>
        </div>
        <Divider style={{ width: "45%", marginTop: 20 }} />
        <div
          style={{
            marginTop: 35,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center", 
            fontFamily:'Roboto'
          }}
        >
          <span data-icon="laptop" class="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 21 18"
              width="21"
              height="18"
            >
              <path
                fill="#87888A"
                d="M10.426 14.235a.767.767 0 0 1-.765-.765c0-.421.344-.765.765-.765s.765.344.765.765-.344.765-.765.765zM4.309 3.529h12.235v8.412H4.309V3.529zm12.235 9.942c.841 0 1.522-.688 1.522-1.529l.008-8.412c0-.842-.689-1.53-1.53-1.53H4.309c-.841 0-1.53.688-1.53 1.529v8.412c0 .841.688 1.529 1.529 1.529H1.25c0 .842.688 1.53 1.529 1.53h15.294c.841 0 1.529-.688 1.529-1.529h-3.058z"
              ></path>
            </svg>
          </span>
          <div
            style={{
              textAlign: "center",
              color: MENU_GRAY,
              fontSize: 14,
              marginLeft: 5,
              fontFamily:'Roboto'
            }}
          >
            WhatsApp is available for Mac.{" "}
            <a
              href="https://www.whatsapp.com/download"
              target="_blank"
              style={{
                color: LIGHT_GREEN, 
                textDecoration: "none",
              }}
            >
              Get it here.
            </a> 
          </div>
        </div>
      </div>
    </html>
  );
};

const useStyles = makeStyles({
  alertIcon: {
    height: 250,
    width: 250,
    alignSelf: "center",
    color: GRAY,
    marginBottom: 20,
  },
});

export default WebEmptyRoomComponent;
