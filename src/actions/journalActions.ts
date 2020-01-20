import { IAction, FETCH_JOURNAL_ENTRIES, FETCH_JOURNAL_ENTRIES_DONE, CREATE_JOURNAL_ENTRY, CREATE_JOURNAL_ENTRY_DONE, TOGGLE_NEW_DIALOG, DELETE_ENTRY } from "./constants"
import { JournalEntryProps } from "../components/JournalPage/JournalList"
import { IErrorDetail } from "../interfaces/IErrorDetail"

export interface fetchEntriesResponse {
    response?: JournalEntryProps[]
    errorData?: IErrorDetail
}

export interface IDeleteEntryRequest {
    id: string    
}

export function fetchEntriesAction(): IAction<fetchEntriesResponse> {
    return {
        type: FETCH_JOURNAL_ENTRIES,
    }
}

export function fetchEntriesFinished(response?: JournalEntryProps[], errorDetail?: IErrorDetail): IAction<JournalEntryProps[]> {
    const response1 = response ? response : undefined
    const error = errorDetail ? errorDetail : undefined
    return{
        type: FETCH_JOURNAL_ENTRIES_DONE,
        response: response1,
        errorData: error,
    }
}


export function createEntryAction(request: Partial<JournalEntryProps>): IAction<boolean, Partial<JournalEntryProps>> {
    return {
        type: CREATE_JOURNAL_ENTRY,
        request
    }
}
export function createEntryFinished(response?: boolean, errorDetail?: IErrorDetail): IAction<boolean, Partial<JournalEntryProps>> {
    const response1 = response ? response : undefined
    const error = errorDetail ? errorDetail : undefined
    return{
        type: CREATE_JOURNAL_ENTRY_DONE,
        response: response1,
        errorData: error,
    }
}

export function toggleNewDialog(){
    return {
        type: TOGGLE_NEW_DIALOG
    }
}

export function deleteEntryAction(request: IDeleteEntryRequest) : IAction<boolean, IDeleteEntryRequest>{
    return {
        type: DELETE_ENTRY,
        request
    }
}