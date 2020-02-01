import React, { useState } from 'react'
import { DeleteButton } from "./DeleteButton";
import { EditEntry } from './EditEntry';

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
    let displayDate = date.toLocaleString();
    if (date.getDate() === new Date().getDate()) {
        displayDate = date.toLocaleTimeString();
    }
    if(editMode) {
        return <EditEntry {...props} date={date} toggleEntryMode={() => setEditMode(!editMode)} />;
    }
    return (
        <div className="card text-white bg-dark mb-3 mx-3">
            <div className="card-header text-left align-middle py-2 px-3">
                Date: {displayDate}
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






