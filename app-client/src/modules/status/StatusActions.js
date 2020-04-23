import {
  STATUS_LIST,
  RECENT_STATUS_LIST,
  VIEWED_STATUS_LIST,
  LOADING,
  IMAGE_LIST,
  MESSAGE_LIST,
} from './StatusReducer';
import {getStatusModel} from '../../utils/helperModels';
import {
  createUserStatus,
  setUserStatusViewedForID,
  getAllUserStatus,
} from '../../api/apiController';
import {
  showToast,
  getUniqueId,
  getLocalData,
  getSocket,
} from '../../utils/helperFunctions';
import storage from '@react-native-firebase/storage';
import constants from '../../utils/constants';

export function getStatus(statusData, dispatch) {
  const mImageArray = [];
  const mMsgArray = [];
  statusData.status.forEach(element => {
    mImageArray.push(element.image);
    mMsgArray.push(element.message);
  });
  dispatch({type: IMAGE_LIST, payload: mImageArray});
  dispatch({type: MESSAGE_LIST, payload: mMsgArray});
}

export async function getUserStatusFromAPI(dispatch) {
  const id = await getLocalData(constants.USER_ID);
  const res = await getAllUserStatus();
  if (res.status === 200) {
    // console.log(res.data);
    if (res.data.status) {
      getUserStatusTypes({
        userId: id,
        dispatch: dispatch,
        statusList: res.data.status,
      });
    }
  }
}

export function getUserStatusTypes({userId, dispatch, statusList}) {
  const recentStatus = [];
  const viewedStatus = [];

  statusList.forEach(item => {
    if (item.userId === userId) {
      dispatch({type: STATUS_LIST, payload: item});
    } else {
      var count = 0;

      item.status.forEach(element => {
        for (let i = 0; i < element.seenUsers.length; i++) {
          const statusUserId = element.seenUsers[i];
          if (statusUserId === userId) {
            count++;
          }
        }
      });

      if (count < item.status.length) {
        recentStatus.push(item);
      } else {
        viewedStatus.push(item);
      }
    }
  });

  dispatch({type: RECENT_STATUS_LIST, payload: recentStatus});
  dispatch({type: VIEWED_STATUS_LIST, payload: viewedStatus});
}

export async function uploadStatus(
  imageClicked,
  message,
  navigation,
  dispatch,
) {
  const imageName = getUniqueId();
  const imagePath = 'images/' + imageName + '.jpg';
  var reference = storage().ref(imagePath);
  const task = reference.putFile(imageClicked);
  task.on('state_changed', taskSnapshot => {
    console.log(
      `${taskSnapshot.bytesTransferred} transferred out of ${task.totalBytes}`,
    );
  });

  task.then(async () => {
    console.log('Image uploaded to the bucket!');
    const mDownloadUrl = await storage()
      .ref(imagePath)
      .getDownloadURL();
    console.log('Image Upload URL : ', mDownloadUrl);
    await onSendStatus(message, navigation, mDownloadUrl, dispatch);
  });
}

export async function onSendStatus(
  message,
  navigation,
  mDownloadUrl,
  dispatch,
) {
  try {
    const statusModel = await getStatusModel(mDownloadUrl, message);
    const res = await createUserStatus(statusModel);
    // console.log('Status Response : ', res);
    if (res.status === 200) {
      console.log('Status Success : ', res.data);
      showToast({text: res.data.message, type: 'success'});
      dispatch({type: LOADING, payload: false});
      getSocket().emit(constants.USER_STATUS, statusModel);
      setTimeout(function() {
        navigation && navigation.goBack();
      }, 800);
    } else {
      showToast({type: 'danger', text: 'Status update failed'});
    }
  } catch (error) {
    console.log('Status Error : ', error);
  }
}

export async function setUserStatusViewed(statusItem, position) {
  const payload = {
    userId: statusItem.userId,
    loginId: await getLocalData(constants.USER_ID),
    statusId: statusItem.status[position]._id,
  };
  const res = await setUserStatusViewedForID(payload);
  console.log('Status Viewed : ', res.data);
}
