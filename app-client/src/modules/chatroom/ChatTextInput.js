import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Platform,
  Keyboard,
  Dimensions,
  KeyboardAvoidingViewBase,
  KeyboardAvoidingView,
} from 'react-native';
import {
  WHITE,
  GREEN,
  GRAY,
  TEXT_TITLE,
  LIGHT_GRAY,
  TEXT_DESCRIPTION,
  MENU_GRAY,
  LIGHT_GREEN,
} from '../../utils/colors';
import {Input, Textarea, Content, Icon, Item, Button} from 'native-base';

const ChatTextInput = ({params, onSendMessage, isStatus, onResetClick}) => {
  const [message, setMessage] = useState('');
  const [keyboardPadding, setKeyboardPadding] = useState(5);

  useEffect(() => {
    let listener1 = Keyboard.addListener('keyboardWillShow', onShowKeyboard);
    let listener2 = Keyboard.addListener('keyboardWillHide', onHideKeyboard);

    return () => {
      listener1.remove();
      listener2.remove();
    };
  }, []);

  function onShowKeyboard(e) {
    // alert('Keyboard Shown');
    console.log(e);
    setKeyboardPadding(
      (e.endCoordinates.height - e.startCoordinates.height) / 2,
    );
  }

  function onHideKeyboard(e) {
    // alert('Keyboard Hidden');
    setKeyboardPadding(0);
  }

  const getChatRoomInput = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <Item rounded style={{backgroundColor: WHITE, flex: 1}}>
          <Icon
            name="smiley"
            type="Octicons"
            style={[styles.menuIcons, {marginLeft: 5}]}
          />
          <Input
            multiline
            style={styles.userMessage}
            placeholder="Type a message ..."
            placeholderTextColor={LIGHT_GRAY}
            value={message}
            onChangeText={text => {
              setMessage(text);
            }}
          />
          <Icon name="attachment" type="Entypo" style={styles.menuIcons} />
          <Icon
            name="camera"
            type="MaterialCommunityIcons"
            style={[styles.menuIcons, {marginRight: 5}]}
          />
        </Item>
        <Button
          icon
          rounded
          large
          style={styles.sendIconView}
          onPress={() => {
            onSendMessage(message);
            setMessage('');
          }}>
          <Icon
            name={message === '' ? 'microphone' : 'send'}
            type="MaterialCommunityIcons"
            style={styles.sendIcon}
          />
        </Button>
      </View>
    );
  };

  const getStatusInput = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: '2%',
          justifyContent: 'center', 
        }}>
        <Button 
          rounded 
          style={styles.sendStatusIconView}
          onPress={() => {
            onResetClick();
            setMessage('');
          }}>
          <Icon
            name="camera"
            type="MaterialCommunityIcons"
            style={[styles.sendIcon]}
          />
        </Button>
        <Input
          multiline
          style={styles.userStatusMessage}
          placeholder="Type a message ..."
          placeholderTextColor={LIGHT_GRAY}
          value={message}
          onChangeText={text => {
            setMessage(text);
          }}
        />
        <Button
          icon
          rounded
          large
          style={styles.sendStatusIconView}
          onPress={() => {
            onSendMessage(message);
            setMessage('');
          }}>
          <Icon
            name={'send'}
            type="MaterialCommunityIcons"
            style={styles.sendIcon}
          />
        </Button>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={{paddingBottom: keyboardPadding}}>
      <View style={styles.parentView}>
        {isStatus ? getStatusInput() : getChatRoomInput()}
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatTextInput;

const styles = StyleSheet.create({
  parentView: {
    alignSelf: 'baseline',
    width: '100%',
    maxHeight: 120,
    position: 'relative',
    bottom: 0,
    elevation: 0,
    padding: 5,
    marginTop: 5,
  },
  sendIcon: {
    alignSelf: 'center',
    color: WHITE,
    justifyContent: 'center',
    fontSize: 24,
    width: 25,
    height: 25,
  },
  sendIconView: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    backgroundColor: GREEN,
  },
  sendStatusIconView: {
    width: 45,
    height: 45,
    alignSelf: 'center',
    justifyContent: 'center',
    marginRight: '2%',
    backgroundColor: GREEN,
    marginTop: -8,
  },
  userName: {
    fontSize: 16,
    color: WHITE,
    fontWeight: 'bold',
  },
  userMessage: {
    fontSize: 16,
    color: TEXT_TITLE,
    backgroundColor: WHITE,
    alignSelf: 'flex-start',
    marginLeft: -5,
    marginTop: Platform.OS === 'ios' ? 8 : 0,
    marginBottom: Platform.OS === 'ios' ? 8 : 0,
    textAlignVertical: 'center',
  },
  userStatusMessage: {
    fontSize: 16,
    color: TEXT_TITLE,
    backgroundColor: WHITE,
    alignSelf: 'flex-start',
    marginTop: Platform.OS === 'ios' ? 8 : 0,
    marginBottom: Platform.OS === 'ios' ? 8 : 0,
    textAlignVertical: 'center',
    borderRadius: 10,
    paddingLeft: 15,
    minHeight: Platform.OS === 'ios' ? 45 : 45,
    marginLeft: '2%',
    marginRight: '3%',
    paddingTop: Platform.OS === 'ios' ? 12 : 10,
  },
  menuIcons: {
    fontSize: 22,
    color: MENU_GRAY,
    alignSelf: 'center',
    justifyContent:'center'
  },
  menuStatusIcons: {
    fontSize: 25,
    color: WHITE,
    alignSelf: 'center',
    justifyContent:'center',
    marginRight: 5, 
    alignItems:'center'
  },
});
