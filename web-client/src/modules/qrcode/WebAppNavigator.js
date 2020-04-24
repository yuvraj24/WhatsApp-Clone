import { ThemeProvider } from "@material-ui/core/styles";
import { themeConfig } from "../../utils/ThemeUtils";
import {
  getSocket,
  storeLocalData,
  getLocalData,
} from "../../utils/webHelperFunctions";
import { webConstants } from "../../utils/webConstants";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import WebHomeScreen from "../home/WebHomeScreen";
import ScanCodeView from "./ScanCodeView";
import React, { useEffect } from "react";
import { APP_BG_COLOR, RED } from "../../utils/webColors";
import WebContactsView from "../contacts/WebContactsView";

const WebAppNavigator = ({ params }) => {
  useEffect(() => {
    // let userID = getLocalData(webConstants.USER_ID);
    // if (userID && userID != null && userID != "") {
    //   window.location = "/home";
    // }
  }, []);

  return (
    <ThemeProvider theme={themeConfig}>
      <HashRouter>
        <Switch> 
          <Route path="/chat" exact component={WebHomeScreen} />
          <Route path="/" component={ScanCodeView} />
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
};

export default WebAppNavigator;
