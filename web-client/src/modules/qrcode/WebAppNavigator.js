import { ThemeProvider } from "@material-ui/core/styles";
import { themeConfig } from "../../utils/ThemeUtils";
import { Switch, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import OnboardingScreen from "../onboarding/OnboardingScreen";
import MessengerScreen from "../messenger/MessengerScreen";
import React from "react";

const WebAppNavigator = () => {
  return (
    <ThemeProvider theme={themeConfig}>
      <HashRouter>
        <Switch>
          <Route path="/chat" exact component={MessengerScreen} />
          <Route path="/" component={OnboardingScreen} />
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
};

export default WebAppNavigator;
