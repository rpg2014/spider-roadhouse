import * as React from "react";
import './Journal.css'
import { LoadingSpinner } from "../GameOfLifePage/GameOfLifeWithNav";
import { useSelector, useDispatch } from "react-redux";
import IApplicationStore from "../../interfaces/IApplicationStore";
import { ErrorAlert } from './Error'
import { toggleNewDialog } from "../../actions/journalActions";
import { JournalEntry } from "./JournalEntry";



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


