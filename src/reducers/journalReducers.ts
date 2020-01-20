import { IAction, FETCH_JOURNAL_ENTRIES, FETCH_JOURNAL_ENTRIES_DONE, CREATE_JOURNAL_ENTRY, CREATE_JOURNAL_ENTRY_DONE, TOGGLE_NEW_DIALOG, DELETE_ENTRY } from "../actions/constants";
import { IFetchingState } from "../interfaces/IFetchingState";
import { JournalEntryProps } from "../components/JournalPage/JournalList";
import { initalJournalEntrys, initalDeleteEntry, startOpen } from "../store/store";



export function fetchJournalEntriesReducer(fetchingState: IFetchingState<JournalEntryProps[]> = initalJournalEntrys, action: IAction<JournalEntryProps[], any>): IFetchingState<JournalEntryProps[]> {
    switch (action.type) {
        case FETCH_JOURNAL_ENTRIES: 
            return {
                isFetching: true,
                data: fetchingState.data,
                errorData: undefined,
                isError: false,
            }
        case FETCH_JOURNAL_ENTRIES_DONE: 
            if(action.errorData){
                return {
                    isFetching: false,
                    data: undefined,
                    isError: true,
                    errorData: action.errorData
                }
            } else {
                return {
                    isError: false,
                    isFetching: false,
                    data: action.response,
                    errorData: undefined
                }
            }
        case DELETE_ENTRY: 
            const journalList = fetchingState.data ? fetchingState.data : null
            const idToRemove = action.request ? action.request.id : null
            if(journalList === null || idToRemove === null) {
                return {...fetchingState};
            }
            
            let indexToRemove: number = -1;
            journalList.forEach((entry:JournalEntryProps, index: number) => {
                if(entry.id === idToRemove) {
                    indexToRemove = index;
                }
            })
            if(indexToRemove !== -1){
                delete journalList[indexToRemove];
            }
            return {
                ...fetchingState,
                data: journalList
            }
        default: 
            return {
                ...fetchingState
            }
    }
}


export function createEntryReducer(fetchingState: IFetchingState<boolean> = initalDeleteEntry, action: IAction<boolean, Partial<JournalEntryProps>>): IFetchingState<boolean> {
    switch (action.type) {
        case CREATE_JOURNAL_ENTRY:
            return {
                isFetching: true,
                isError: false,
                data: undefined,
                errorData: undefined
            }
        case CREATE_JOURNAL_ENTRY_DONE:
            if(action.errorData){
                return {
                    isFetching: false,
                    data: undefined,
                    isError: true,
                    errorData: action.errorData
                }
            } else {
                return {
                    isError: false,
                    isFetching: false,
                    data: action.response,
                    errorData: undefined
                }
            }
        default: 
            return {
                ...fetchingState
            }
    }
}


export function toggleNewDialogReducer(state: boolean = startOpen, action:IAction<null>): boolean {
    switch (action.type) {
        case TOGGLE_NEW_DIALOG:
            return state ? false : true;
        default: 
            return state;
    }
    
}