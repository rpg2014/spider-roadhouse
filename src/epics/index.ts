import { combineEpics } from "redux-observable";
import { pingEpic } from "./pingEpic";
import { serverStatusEpic } from "./serverStatusEpic";
import { serverDetailsEpic } from "./serverDetailsEpic";


export default combineEpics(
    pingEpic,
    serverStatusEpic,
    serverDetailsEpic,
);