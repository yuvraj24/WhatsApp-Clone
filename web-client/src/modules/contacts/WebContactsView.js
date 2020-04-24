import React, { useEffect, useState } from "react";
import { webConstants } from "../../utils/webConstants";
import ContactsHeaderView from "./WebContactsHeaderView";
import ContactsItem from "./WebContactsItem";
import { getLoggedInUserList } from "../../api/webApiController";
import { getLocalData } from "../../utils/webHelperFunctions";
import EmptyComponent from "../../components/WebEmptyComponent";
import { Divider } from "@material-ui/core";
import { List, CellMeasurer, CellMeasurerCache } from "react-virtualized";
import { MENU_GRAY, WHITE } from "../../utils/webColors";
import { orange } from "@material-ui/core/colors";

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 80,
});

const WebContactsView = ({ onChatCloseClick, onItemClick }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getRegisteredUsers();
  }, []);

  const getRegisteredUsers = () => {
    getLoggedInUserList()
      .then(async (res) => {
        console.log("User List Response => ", res.data);
        if (res.data.success) {
          var userList = res.data.data;
          var ownerID = await getLocalData(webConstants.USER_ID);

          for (let index = 0; index < userList.length; index++) {
            const user = userList[index];
            if (user.userId === ownerID) {
              userList.splice(index, 1);
            }
          }
          setContacts(userList);
        }
      })
      .catch((err) => {
        console.log("User List Error => ", err);
      });
  };

  return (
    <div style={styles.parent}>
      <ContactsHeaderView
        item={contacts ? contacts.length : 0}
        onChatCloseClick={onChatCloseClick}
      />
      <div style={styles.parent} >
        {contacts.length <= 0 && <EmptyComponent message={"No User Found"} />}

        {contacts.length > 0 && (
          <List
            style={{
              outline: "none",
              height: window.innerHeight - 120,
            }}
            rowCount={contacts.length}
            height={window.innerHeight}
            width={window.innerWidth}
            rowHeight={cache.rowHeight}
            rowRenderer={({ index, parent, key, style }) => (
              <CellMeasurer
                key={key}
                cache={cache}
                parent={parent}
                columnIndex={0}
                rowIndex={index}
              >
                <ContactsItem
                  item={contacts[index]}
                  onItemClick={onItemClick}
                />
              </CellMeasurer>
            )}
            overscanRowCount={0}
            // data={refresh}
          />
        )}
      </div>

      {/* <FlatList
        // contentContainerStyle={DEFAULT_STYLES.container}
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => {
          return <Divider />;
        }}
        renderItem={({ item }) => {
          return <ContactsItem item={item} navigation={navigation} />;
        }}
      /> */}
    </div>
  );
};

export default WebContactsView;

const styles = {
  parent: {
    backgroundColor: WHITE,
    display: "flex",
    width: "100%",
    height: "100%",
    flexDirection: "column",
  },
};
