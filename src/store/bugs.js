import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { initial } from "lodash";

import { createSelector } from "reselect";

let lastId = 0;

const slice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    bugAssignedToUser: (bugs, action) => {
      const { bugId, userId } = action.payload;
      const index = bugs.findIndex((bug) => bug.id === bugId);
      bugs[index].userId = userId;
    },

    bugAdded: (state, action) => {
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      });
    },

    bugResolved: (state, action) => {
      const index = state.findIndex((bug) => bug.id === action.payload.id);
      state[index].resolved = true;
    },
  },
});

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

export const { bugAdded, bugResolved, bugAssignedToUser } = slice.actions;
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
