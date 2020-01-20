import * as React from "react";
import './Journal.css'
import { LoadingSpinner } from "../GameOfLifePage/GameOfLifeWithNav";
import { useSelector, useDispatch } from "react-redux";
import IApplicationStore from "../../interfaces/IApplicationStore";
import { ErrorAlert } from './Error'
import { toggleNewDialog } from "../../actions/journalActions";
import { DeleteButton } from "./DeleteButton";



export const JournalList = () => {
    const entriesState = useSelector((state: IApplicationStore) => state.journalEntries)
    const dispatch = useDispatch();
    const toggleNew = () => {
        dispatch(toggleNewDialog())
    }

    const getSpinner =() => {
        return (entriesState.isFetching ?<LoadingSpinner/> : null)
    }

    if(entriesState.isFetching && !entriesState.data){
        return (
            <LoadingSpinner />
        )
    }
    if(entriesState.isError && entriesState.errorData){
        return (
            <ErrorAlert errorDetail={entriesState.errorData} />
        )
    }
    const list: JSX.Element[] = [];
    if(entriesState.data && entriesState.data.length > 0) {
        
        entriesState.data.forEach(element => {
            list.push(<JournalEntry key={element.id} {...element}/>)
        });
    } else {
        return <button className="btn  btn-outline-dark mx-auto py-3" onClick={toggleNew}>Create new Journal Entry</button>
    }
    
    return (
        <div className='row center max_width mx-auto'>
            {getSpinner()}
            <div className='container-fluid rounded'>
                {list}
            </div>
        </div>)
}


export interface JournalEntryProps {
    dateTime: string;
    id: string;
    text: string;
    title?: string;
    isMarkdown: boolean;
}

const JournalEntry = (props: JournalEntryProps) => {
    console.log(props.dateTime)
    let date = new Date(props.dateTime+"Z");
    
    return (
        <div className="card text-white bg-dark mb-3 mx-3">
            <div className="card-header text-left align-middle py-2 px-3">
                Date: {date.toLocaleString()}
                <button className='btn-sm btn-dark btn-outline-light float-right small-font mx-2'>
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