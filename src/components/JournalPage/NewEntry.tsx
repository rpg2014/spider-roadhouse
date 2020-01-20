import  React, { useState, ChangeEvent } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createEntryAction, toggleNewDialog } from "../../actions/journalActions";
import IApplicationStore from "../../interfaces/IApplicationStore";
import { LoadingSpinner } from "../GameOfLifePage/GameOfLifeWithNav";


export const NewEntry: React.FC = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [isMarkdown, setIsMarkdown] = useState(false);
    const submitState = useSelector((state : IApplicationStore) => state.createEntryState)
    const dispatch = useDispatch()

    const handleTitleChange = (event:ChangeEvent<HTMLInputElement> ) => {
        return setTitle(event.target.value)
    }
    const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        return setText(event.target.value)
    }
    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        dispatch(createEntryAction({
            text: text? text : undefined,
            title,
            dateTime: new Date().toISOString(),
        }))
        setTimeout(() => dispatch(toggleNewDialog()), 250)
    }

    return (
        <div className='row center max_width mx-auto'>
            
                <form className='form-group card text-white bg-dark mb-3 mx-3 w-100' onSubmit={(event)=> console.log(event)}>
                    
                    <div className='card-header container-fluid text-left align-middle py-2 px-3'>
                        <div className='form-row'>
                            <div className='col-6 mx-auto'>
                            
                                <input readOnly className="form-control-plaintext text-white bg-dark border-dark rounded" id="dateTime" value={new Date().toLocaleDateString()} / >
                            </div>
                            <div className='col-6'>
                                {submitState.isFetching? <LoadingSpinner/> : <button className='btn btn-dark btn-outline-light float-right small-font' onClick={handleSubmit}>
                                     Submit
                                 </button>}
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
          
        </div>)

}

