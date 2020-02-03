import React from 'react';
import { JournalEntryProps } from "./JournalEntry";
import { useSelector, useDispatch } from "react-redux";
import IApplicationStore from "../../interfaces/IApplicationStore";
import { useState, ChangeEvent } from "react";
import { HTTPMethod } from "../../epics/common";
import { useFetch } from "react-async";
import { SPIDERMAN_BASE_URL, JOURNAL } from "../../store/paths";
import { deleteEntryAction, fetchEntriesAction } from "../../actions/journalActions";
import { Alert, Spinner } from "react-bootstrap";
import { getHeaders } from '../Auth/common';


interface IEditResponse {
    success: boolean
}
interface editEntryProps {
    toggleEntryMode: () => void,
    date: Date,
}
export const EditEntry = (initalState: JournalEntryProps & editEntryProps) => {
    const authToken = useSelector((state: IApplicationStore) => state.authDetails.accessToken? state.authDetails.accessToken.getJwtToken(): "")
    const dispatch = useDispatch();
    const [hideError, setHideError] = useState(false);
    const [title, setTitle] = useState(initalState.title);
    const [text, setText] = useState(initalState.text);
    const [dateTime, setDateTime] = useState(initalState.date)
    const [isMarkdown, setMarkdown] = useState(initalState.isMarkdown)

    const headers = getHeaders(authToken);
    let formData: Partial<JournalEntryProps> = {
        title,
        text,
        dateTime: dateTime.toISOString(),
        isMarkdown
    }

    const options: RequestInit = {
        headers,
        method: HTTPMethod.POST,
        body: JSON.stringify(formData)
    }

    const {data, error ,isPending, run, isFulfilled} = useFetch<IEditResponse>(SPIDERMAN_BASE_URL + JOURNAL + "/" + initalState.id, options )

    const handleTitleChange = (event:ChangeEvent<HTMLInputElement> ) => {
        return setTitle(event.target.value)
    }
    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        return setText(event.target.value)
    }

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        if(hideError) {
            setHideError(false);
        }
        run()
    }
    // deletes the entry from the local state
    if(isFulfilled && data) {
        dispatch(deleteEntryAction({
            id: initalState.id
        }));
        dispatch(fetchEntriesAction());

        // do after I fix the create entry to work like edit / delete
        // dispatch(createEntryAction({
        //     id: initalState.id,
        //     ...formData
        // }))

        setTimeout(() => {
            console.log("Switching away from Edit mode")
            initalState.toggleEntryMode()
        }, 250)
    }
    
    
    
    const getSubmitButton = () => {
        if(error && !hideError) {
            console.log(error.stack)
            console.log(error.message)
            setTimeout(()=> {
                setHideError(true);
            },2000)
            return <Alert variant="danger" >{error.message}</Alert>
        }
        return <button className='btn btn-dark btn-outline-success float-right small-font' onClick={handleSubmit}>
                                     {isPending? <Spinner animation='border' size='sm' variant='light' /> : "Done"}
                                 </button>
    }

    return (
        <form className='form-group card text-white bg-dark mb-3 mx-3' onSubmit={(event)=> console.log(event)}>
                    
                    <div className='card-header container-fluid text-left align-middle py-2 px-3'>
                        <div className='form-row'>
                            <div className='col-6 mx-auto'>
                            
                                <input readOnly className="form-control-plaintext text-white bg-dark border-dark rounded" id="dateTime" value={dateTime.toTimeString()} / >
                            </div>
                            
                            <div className='col-6'>
                                <button className='btn btn-dark btn-outline-light small-font float-right mx-2 ' onClick={initalState.toggleEntryMode} >
                                    Cancel
                                </button>
                                {getSubmitButton()}
                            </div>
                        </div>
                    </div>
                    <div className='card-body py-2 px-3 d-flex align-middle border-bottom border-secondary'>
                        <div className='my-auto'>
                            Title:    
                        </div>
                        <input className='form-control-sm bg-dark text-light w-100'value={title} onChange={handleTitleChange} />
                    </div>
                    <div className='card-text text-left w-100 overflow-hidden height-300 p-2'>
                        <textarea className="form-control-sm w-100 h-100 bg-dark text-light overflow-hidden" id="text" rows={3} value={text} onChange={handleTextChange}></textarea>
                    </div>
                </form>
    )
}