import { combineReducers } from "redux";
import bugs from "./bugs";
import projects from "./projects";
import user from "./user";

export default combineReducers({
  bugs: bugs,
  projects: projects,
  users: user,
});
