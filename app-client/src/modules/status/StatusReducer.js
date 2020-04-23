import constants from '../../utils/constants';

export const statusState = {
  statusData: '',
  recentStatusList: [],
  viewedStatusList: [],
  refresh: true,
  loading: false,
  imageList: [],
  messageList: [],
  status: [],
  isFlashEnabled: false,
  isFrontCam: false,
};

export const REFRESH = 'REFRESH',
  LOADING = 'LOADING',
  STATUS_LIST = 'STATUS_LIST',
  IMAGE_LIST = 'IMAGE_LIST',
  MESSAGE_LIST = 'MESSAGE_LIST',
  RECENT_STATUS_LIST = 'RECENT_STATUS_LIST',
  VIEWED_STATUS_LIST = 'VIEWED_STATUS_LIST',
  TOGGLE_FLASH = 'TOGGLE_FLASH',
  TOGGLE_CAMERA = 'TOGGLE_CAMERA';

export const statusReducer = (state, action) => {
  console.log(action.type, action.payload);

  switch (action.type) {
    case STATUS_LIST:
      return {...state, statusData: action.payload};

    case RECENT_STATUS_LIST:
      return {...state, recentStatusList: action.payload};

    case VIEWED_STATUS_LIST:
      return {...state, viewedStatusList: action.payload};

    case REFRESH:
      return {...state, refresh: action.payload};

    case LOADING:
      return {...state, loading: action.payload};

    case IMAGE_LIST:
      return {...state, imageList: action.payload};

    case MESSAGE_LIST:
      return {...state, messageList: action.payload};

    case TOGGLE_FLASH:
      return {...state, isFlashEnabled: action.payload};

    case TOGGLE_CAMERA:
      return {...state, isFrontCam: action.payload};
  }
};
