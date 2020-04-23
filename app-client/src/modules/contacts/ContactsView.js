import React, {useEffect, useState} from 'react';
import {
  FlatList,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
} from 'react-native';
import _Divider from '../../components/_Divider';
import constants from '../../utils/constants';
import {Container} from 'native-base';
import ContactsHeaderView from './ContactsHeaderView';
import Contacts from 'react-native-contacts';
import ContactsItem from './ContactsItem';
import {getLoggedInUserList} from '../../api/apiController';
import {getLocalData} from '../../utils/helperFunctions';
import EmptyComponent from '../../components/EmptyComponent';

const ContactsView = ({navigation, route}) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    getRegisteredUsers();
  }, []);

  const getRegisteredUsers = () => {
    getLoggedInUserList()
      .then(async res => {
        console.log('User List Response => ', res.data);
        if (res.data.success) {
          var userList = res.data.data;
          var ownerID = await getLocalData(constants.USER_ID);

          for (let index = 0; index < userList.length; index++) {
            const user = userList[index];
            if (user.userId === ownerID) {
              userList.splice(index, 1);
            }
          }
          setContacts(userList);
        }
      })
      .catch(err => {
        console.log('User List Error => ', err);
      });
  };

  const getAllContacts = () => {
    if (Platform.OS === 'android') {
      console.log('PLATFORM => ', Platform.OS);
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Accept',
        },
      )
        .then(flag => {
          console.log('WRITE_CONTACTS Permission Granted => ', flag);

          if (flag === 'granted') {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
              {
                title: 'Contacts',
                message: 'This app would like to view your contacts.',
                buttonPositive: 'Accept',
              },
            )
              .then(flag => {
                console.log('READ_CONTACTS Permission Granted => ', flag);
                if (flag === 'granted') {
                  fectchContacts();
                }
              })
              .catch(() => {
                console.log('READ_CONTACTS Permission Denied');
              });
          }
        })
        .catch(() => {
          console.log('WRITE_CONTACTS Permission Denied');
        });
    } else {
      fectchContacts();
    }
  };

  const fectchContacts = () => {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        // error
        console.log('fectchContacts Error');
      } else {
        // contacts returned in Array
        // console.log(JSON.stringify(contacts));

        setContacts(contacts);
      }
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <ContactsHeaderView
          item={contacts ? contacts.length : 0}
          navigation={navigation}
        />
        {contacts.length <= 0 && <EmptyComponent message={'No User Found'} />}
        <FlatList
          // contentContainerStyle={DEFAULT_STYLES.container}
          data={contacts}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => {
            return <_Divider />;
          }}
          renderItem={({item}) => {
            return (
              <ContactsItem
                item={item}
                navigation={navigation}
                userChatList={route.params.chatList}
              />
            );
          }}
        />
      </Container>
    </SafeAreaView>
  );
};

export default ContactsView;
