// import React, { useReducer } from "react"

export const test = '';

// export const initalJournalState: IJournalContext = {
//     entries: {
//         isError: false,
//         isFetching: false,
//         data: undefined,
//         errorData: undefined,
//     },
//     isNewEntryDialogOpen: false,
// }

// export const JournalContext = React.createContext(initalJournalState)

// const UPDATE_FETCH = "UPDATE_FETCH"
// const SET_AUTH = 'SET_AUTH';
// export const useJournal = () => {
//     const [state, dispatch] = React.useReducer(journalReducer, initalJournalState);

//     React.useEffect(() => {
//         const fetchEntries = async () => {
//             dispatch({
//                 type: UPDATE_FETCH,
//                 isLoading: true,
//             })
//             try {
//             const res = await fetch("https://postman-echo.com/ip", {
//                 method: "GET",
//                 headers: {
//                     Accept: "application/json"
//                 },
//             });
//             const json = await res.json()
//             dispatch({
//                 type: UPDATE_FETCH,
//                 data: json,
//             })
//         }catch(error) {
//             dispatch({type: UPDATE_FETCH,
//             error
//         })
//         }

//         }
//         if(!state.entries.data && !state.entries.isError){
//             fetchEntries();
//         }
//     }, [state.authToken, dispatch, state.entries])
//     const toggleNew = () => {
//         dispatch({
//             type: "TOGGLE_NEW"
//         })
//     }
//     const setAuthToken = (authToken: string) => {
//         dispatch({
//             type: SET_AUTH,
//             authToken
//         })
//     }

//     return {state, dispatch, toggleNew, setAuthToken}
// }

// const journalReducer = (state: IJournalContext, action: any): IJournalContext => {
//     switch(action.type) {
//         case "TOGGLE_NEW":
//             return {
//                 ...state,
//                 isNewEntryDialogOpen: state.isNewEntryDialogOpen ? false : true,
//             };
//         case UPDATE_FETCH:
//             return {
//                 ...state,
//                 entries: {
//                     data: action.data,
//                     isFetching: action.isLoading,
//                     isError: action.error ? true: false,
//                     errorData: action.error,
//                 }
//             }
//         case SET_AUTH:
//             return {
//                 ...state,
//                 authToken: action.authToken
//             }
//         default:
//             return{...state}
//     }
// }
