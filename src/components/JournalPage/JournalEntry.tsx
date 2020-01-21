import React, { ChangeEvent, useState } from 'react'
import { DeleteButton } from "./DeleteButton";
import { LoadingSpinner } from '../GameOfLifePage/GameOfLifeWithNav';
import { useFetch } from 'react-async';
import { SPIDERMAN_BASE_URL, JOURNAL } from '../../store/paths';
import { HTTPMethod } from '../../epics/common';
import { useSelector, useDispatch } from 'react-redux';
import IApplicationStore from '../../interfaces/IApplicationStore';
import { Alert, Spinner } from 'react-bootstrap';
import { deleteEntryAction, createEntryAction, fetchEntriesAction } from '../../actions/journalActions';

export interface JournalEntryProps {
    dateTime: string;
    id: string;
    text: string;
    title?: string;
    isMarkdown: boolean;
}
interface JournalEntryState {
    editMode: boolean,

}

export const JournalEntry = (props: JournalEntryProps) => {
    const [editMode, setEditMode] = useState(false);
    let date = new Date(props.dateTime+"Z");
    if(editMode) {
        return <EditEntry {...props} date={date} toggleEntryMode={() => setEditMode(!editMode)} />;
    }
    return (
        <div className="card text-white bg-dark mb-3 mx-3">
            <div className="card-header text-left align-middle py-2 px-3">
                Date: {date.toLocaleString()}
                <button className='btn-sm btn-dark btn-outline-light float-right small-font mx-2' onClick={() => setEditMode(!editMode)}>
                         Edit
                     </button>
                <DeleteButton id={props.id}/>
                </div>
            
            <div className="card-body py-2 px-3">
                {props.title ?  getTitle(props.title): null}
                
                <p className="card-text text-left ">{props.text}</p>
            </div>
        </div>
    )
}

const getTitle = (title: string) => {
    return(<h5 className="card-title text-left border-bottom border-secondary">{title}</h5>)
}
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

    const headers = {
        'spider-access-token': authToken ,
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    }
    let formData: Partial<JournalEntryProps> = {
        title,
        text,
        dateTime: dateTime.toISOString(),
        isMarkdown
    }

    const options = {
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
        if(hideError) {
            setHideError(false);
        }
        run()
    }
    if(isFulfilled && data && data.success) {
        initalState.toggleEntryMode();
        dispatch(deleteEntryAction({
            id: initalState.id
        }));
        dispatch(fetchEntriesAction());

        // do after I fix the create entry to work like edit / delete
        // dispatch(createEntryAction({
        //     id: initalState.id,
        //     ...formData
        // }))
    }
    
    
    const getSubmitButton = () => {
        if(error && !hideError) {
            console.log(error)
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




