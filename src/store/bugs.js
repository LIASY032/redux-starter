import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { initial } from "lodash";

import { createSelector } from "reselect";
import { apiCallBegan } from "./api";
import moment from "moment"

// let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null
  },
  reducers: {

    bugsRequested: (bugs, action) => {
      bugs.loading = true;
    },

    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false;
    },

    //bugs/bugsRecieved
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload;
      bugs.loading = false;
      bugs.lastFetch = Date.now()
    },
    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload;
      const index = bugs.list.findIndex((bug) => bug.id === bugId);
      bugs.list[index].userId = userId;
    },

    bugAdded: (state, action) => {
      state.list.push(action.payload)
      // state.list.push({
      //   id: ++lastId,
      //   description: action.payload.description,
      //   resolved: false,
      // });
    },

    bugResolved: (state, action) => {
      const index = state.list.findIndex((bug) => bug.id === action.payload.id);
      state.list[index].resolved = true;
    },
  },
});


const url = "/bugs"

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
  if (diffInMinutes < 10) return
  dispatch(apiCallBegan({
     url,
    // method: "get",
    // data: {},
  onStart: slice.actions.bugsRequested.type,
    onSuccess: slice.actions.bugsReceived.type,
    onError: bugsRequestFailed.type
  }))
}


export const addBug = bug => apiCallBegan({
  url,
  method: "post",
  data: bug,
  onSuccess: bugAdded.type
})

// export const loadBugs = () => 

export const resolveBug = id => apiCallBegan({
  // /bugs
  //PATCH /bugs/id
  url: url + "/" + id,
  method: "patch",
  data: { reslved: true },
  onSuccess: bugResolved.type
})

export const assignBugToUser = (bugId, userId) => apiCallBegan({
  url: url + "/" + bugId,
  method: "patch",
  data: { userId },
  onSuccess: bugAssignedToUser.type
})




export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getBugsByUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  );
// (state) =>
// state.entities.bugs.filter((bug) => !bug.resolved);

export const { bugAdded, bugResolved, bugAssignedToUser, bugsReceived, bugsRequested, bugsRequestFailed } = slice.actions;
export default slice.reducer;

export const BUG_ADDED = "bugAdded";
export const BUG_REMOVED = "bugRemoved";
export const BUG_RESOLVED = "bugResolved";

// export const bugAdded = createAction("bugAdded");

// export const bugRemoved = createAction("bugRemoved");

// export const bugResolved = createAction("bugResolved");

// export default createReducer([], {
//   [bugAdded.type]: (state, action) => {
//     state.push({
//       id: ++lastId,
//       description: action.payload.description,
//       resolved: false,
//     });
//   },

//   bugResolved: (state, action) => {
//     const index = state.findIndex((bug) => bug.id === action.payload.id);
//     state[index].resolved = true;
//   },
// });

// export default function reducer(state = [], action) {
//   if (action.type === bugAdded.type) {
//     return [
//       ...state,
//       {
//         id: ++lastId,
//         description: action.payload.description,
//         resolved: false,
//       },
//     ];
//   } else if (action.type === "bugRemoved") {
//     return state.filter((bug) => bug.id !== action.payload.id);
//   } else if (action.type === "bugResolved") {
//     return state.map((bug) =>
//       bug.id !== action.payload.id ? bug : { ...bug, resolved: true }
//     );
//   }
//   return state;
// }
