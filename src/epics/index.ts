import { combineEpics } from "redux-observable";
import { pingEpic } from "./pingEpic";
import { serverStatusEpic } from "./serverStatusEpic";
import { serverDetailsEpic } from "./serverDetailsEpic";
import { serverActionEpic } from "./serverActionEpic";
import { fetchJournalEntriesEpic, createJournalEntryEpic } from './JournalEpics'


export default combineEpics(
    pingEpic,
    serverStatusEpic,
    serverDetailsEpic,
    serverActionEpic,
    fetchJournalEntriesEpic,
    createJournalEntryEpic,
);