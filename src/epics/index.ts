import { combineEpics } from "redux-observable";
import { pingEpic } from "./pingEpic";
import { serverStatusEpic } from "./serverStatusEpic";


export default combineEpics(
    pingEpic,
    serverStatusEpic,
);