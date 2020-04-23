import createActivityDetector from "activity-detector";
import moment from "moment";
import { webConstants } from "./webConstants";
import { getSocket, getLocalData } from "./webHelperFunctions";

let socket = getSocket();

export function detectUserActivity() {
  const activityDetector = createActivityDetector({
    timeToIdle: 60000,
  });

  // On page load
  // socket.emit(webConstants.LAST_SEEN, getUserData("Online"));

  activityDetector.on("idle", () => {
    // console.info("The user is In Active");
    socket.emit(webConstants.LAST_SEEN, getUserData("Offline"));
  });

  activityDetector.on("active", () => {
    // console.info("The user is Active");
    socket.emit(webConstants.LAST_SEEN, getUserData("Online"));
  });
  return activityDetector;
}

export function sendPageLoadStatus() {
  // On page load
  socket.emit(webConstants.LAST_SEEN, getUserData("Online"));
}

function getUserData(status) {
  const data = {
    userId: getLocalData(webConstants.USER_ID),
    userName: getLocalData(webConstants.USER_NAME),
    status: status,
    lastSeen: moment().format(),
  };
  console.log(JSON.stringify(data));
  return data;
}
