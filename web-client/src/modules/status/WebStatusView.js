import React, { useState, useReducer, useEffect } from "react";
import {
  GRAY,
  TINT_WHITE,
  GREEN,
  LIGHT_GREEN,
  BLACK,
  WHITE,
  MENU_GRAY,
} from "../../utils/webColors";

import WebMyStatusView from "./WebMyStatusView";
import WebStatusViewItem from "./WebStatusViewItem";
import { Typography, Icon, Button, Avatar, Divider } from "@material-ui/core";
import { webConstants } from "../../utils/webConstants";
import { List, CellMeasurer } from "react-virtualized";
import {
  getStatusView,
  statusCache,
  getUserStatusFromAPI,
} from "./WebStatusViewAction";
import WebStatusEmptyComponent from "../../components/WebEmptyStatusComponent";
import { getAllUserStatus } from "../../api/webApiController";
import {
  statusState,
  statusReducer,
  STATUS_LIST,
  SELECTED_STATUS,
} from "./WebStatusReducer";
import { getLocalData, getSocket } from "../../utils/webHelperFunctions";
import { WebStatusProgressView } from "../../components/WebStatusProgressView";
import { Animated } from "react-animated-css";
import WebZoneStatusComponent from "../../components/WebZoneStatusComponent";

const socket = getSocket();

const WebStatusView = ({ onCancelClick }) => {
  var [state, dispatch] = useReducer(statusReducer, statusState);

  var { statusData, masterStatusList, selectedStatus } = state;
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getUserStatusFromAPI(dispatch);
    listenSocket();
  }, []);

  useEffect(() => {
    console.log("masterStatusList : ", masterStatusList.length);
    setRefresh(!refresh);
  }, [masterStatusList, selectedStatus]);

  function toggleStatusView() {
    setRefresh(!refresh);
    getUserStatusFromAPI(dispatch);
    dispatch({ type: SELECTED_STATUS, payload: "" });
  }

  function listenSocket() {
    // socket.removeListener(webConstants.CHAT_LIST);
    socket.on(webConstants.USER_STATUS, async (statusModel) => {
      const id = getLocalData(webConstants.USER_ID);
      if (statusModel.userId != id) {
        console.log("STATUS RECEIVED");
        getUserStatusFromAPI(dispatch);
      }
    });
  }

  return (
    <div style={styles.parent}>
      <div style={styles.statusView}>
        <div style={styles.statusDivView}>
          <WebMyStatusView statusData={statusData} isUser dispatch={dispatch} isBorder={false} />
          <List
            style={{
              // height: window.innerHeight,
              // width: window.innerWidth,
              // paddingTop: "4%",
              outline: "none",
            }}
            // rowCount={40}
            rowCount={masterStatusList.length}
            height={window.innerHeight - 102}
            width={window.innerWidth / 3.5}
            rowHeight={statusCache.rowHeight}
            rowRenderer={({ index, parent, key, style }) => (
              <CellMeasurer
                key={key}
                cache={statusCache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}
              >
                {getStatusView({
                  index,
                  parent,
                  key,
                  style,
                  masterStatusList,
                  dispatch,
                })}
              </CellMeasurer>
            )}
            overscanRowCount={3}
            data={refresh}
          />
        </div>
      </div>

      {(!selectedStatus || selectedStatus === "") && (
        <div style={styles.statusDetailView}>
          {!statusData && (
            <WebStatusEmptyComponent
              message={"Click on a contact to view their status updates"}
              onCancelClick={onCancelClick}
            />
          )}
          {statusData && (
            <WebZoneStatusComponent
              statusData={statusData}
              onCancelClick={onCancelClick}
              dispatch={dispatch}
            />
          )}
        </div>
      )}

      <Animated
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInDuration={600}
        animationOutDuration={1000}
        isVisible={selectedStatus && selectedStatus != ""}
        animateOnMount={selectedStatus && selectedStatus != ""}
        style={{
          width: "100%",
          position: "absolute",
          height: "100%",
          zIndex: 500000,
        }}
      >
        {selectedStatus && selectedStatus != "" && (
          <div style={styles.statusDetailProgres}>
            <WebStatusProgressView
              statusData={selectedStatus ? selectedStatus : statusData}
              isUser={false}
              dispatch={dispatch}
              toggleStatusView={toggleStatusView}
            />
          </div>
        )}
      </Animated>
    </div>
  );
};

export default WebStatusView;

export const styles = {
  parent: {
    display: "flex",
    flexDirection: "row",
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: BLACK,
  },
  statusView: {
    width: "30%",
    backgroundColor: TINT_WHITE,
    paddingTop: "3%",
  },
  statusDetailView: {
    width: "70%",
    backgroundColor: BLACK,
  },
  statusDetailProgres: {
    width: "100%",
    display: "flex",
    height: "100%",
    position: "absolute",
    zIndex: 20000,
    backgroundColor: BLACK,
  },
  statusDivView: {
    marginLeft: webConstants.STATUS_MARGIN,
    marginRight: webConstants.STATUS_MARGIN,
  },
  dividerStyle: {
    backgroundColor: "#3b3b3b",
    width: "96%",
    height: 1,
    marginTop: "6%",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  userName: {
    fontSize: 13,
    marginTop: 5,
    color: "#b3b3b3",
    fontWeight: 600,
    marginBottom: "3%",
  },
  userMessage: {
    fontSize: 14,
    color: GRAY,
    alignSelf: "flex-start",
  },
  userTime: {
    fontSize: 14,
    color: GREEN,
    marginLeft: 15,
    marginVertical: 8,
    fontWeight: "bold",
  },
  msgIcon: {
    fontSize: 26,
    color: GREEN,
    alignSelf: "flex-end",
  },
  btnView: {
    marginTop: 15,
    marginRight: -5,
    width: 65,
    height: 65,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: LIGHT_GREEN,
  },
  thumbView: {
    width: 65,
    height: 65,
    justifyContent: "center",
    backgroundColor: LIGHT_GREEN,
  },
};
