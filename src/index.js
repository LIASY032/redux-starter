import configureStore from "./store/configureStore";

import { addBug, assignBugToUser, loadBugs, resolveBug } from "./store/bugs";
// import {
//   bugAdded,
//   bugAssignedToUser,
//   bugResolved,
//   getBugsByUser,
// } from "./store/bugs";
// import projects, { projectAdded } from "./store/projects";
// import { userAdded } from "./store/user";
const store = configureStore();
store.dispatch(loadBugs())
setTimeout(()=> store.dispatch(assignBugToUser(1, 4)), 2000)







// store.dispatch(userAdded({ name: "user 1" }));
// store.dispatch(function (dispatch, getState) {
//   dispatch({ type: "bugsRecieved", bugs: [1, 2, 3] });
// });
// store.dispatch(userAdded({ name: "user 2" }));
// store.dispatch(projectAdded({ name: "project 1" }));

// store.dispatch(bugAdded({ description: "Bug 1" }));
// store.dispatch(bugAdded({ description: "Bug 2" }));
// store.dispatch(bugAdded({ description: "Bug 3" }));
// store.dispatch(bugAssignedToUser({ bugId: 3, userId: 1 }));
// store.dispatch(bugResolved({ id: 3 }));
//
// const bugs = getBugsByUser(1)(store.getState());
// console.log(bugs);
