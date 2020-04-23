import React from "react";

export const initialState = {
  progress: 0,
};

type ActionType = {
  type: string;
  payload: any;
};

export const PROGRESS = "PROGRESS";

export const progressReducer = (state: any, action: ActionType) => {
  // console.log(action.type, action.payload);

  switch (action.type) {
    case PROGRESS:
      return { ...state, progress: action.payload };
  }
};
