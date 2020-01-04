import React, { useReducer } from "react"
import { JournalEntryProps } from "../components/JournalPage/JournalList"
import { IFetchingState } from "../interfaces/IFetchingState";

interface ICreateJournalEntry {

}

export interface IJournalContext {
    isNewEntryDialogOpen: boolean;
}