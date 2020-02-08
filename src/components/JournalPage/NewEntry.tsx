import  React, { useState, ChangeEvent } from "react"
import { useDispatch, useSelector } from "react-redux";
import { toggleNewDialog, fetchEntriesAction } from "../../actions/journalActions";
import IApplicationStore from "../../interfaces/IApplicationStore";
import { getHeaders } from "../Auth/common";
import { HTTPMethod } from "../../epics/common";
import { JournalEntryProps } from "./JournalEntry";
import { useFetch } from "react-async";
import { SPIDERMAN_BASE_URL, JOURNAL, NEW } from "../../store/paths";
import { Alert, Spinner } from "react-bootstrap";

interface ICreateEntryResponse {
    success: boolean
}

export const NewEntry: React.FC = () => {
    const [title, setTitle] = useState("");
    const authToken = useSelector((state: IApplicationStore) => state.authDetails.accessToken? state.authDetails.accessToken.getJwtToken(): "")
    const [text, setText] = useState("");
    const [isMarkdown, setIsMarkdown] = useState(false);
    const dispatch = useDispatch();
    const [hideError, setHideError] = useState(false);
    const [dateTime, setDateTime] = useState(new Date())
    const headers = getHeaders(authToken);

    // useEffect(() => {
    //     let timerId = setInterval(() => setDateTime(new Date()), 1000);
    //     return () => clearInterval(timerId);
    // }, [])

    // just needs the text, title and time and is markdown? I think so
    let formData: Partial<JournalEntryProps> = {
        title,
        text,
        dateTime: new Date().toISOString(),
        isMarkdown
    }
    const options: RequestInit = {
        headers,
        method: HTTPMethod.POST,
        body: JSON.stringify(formData)
    }

    const {data, error ,isPending, run, isFulfilled} = useFetch<ICreateEntryResponse>(SPIDERMAN_BASE_URL + JOURNAL + NEW, options )

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
        run();
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
        return <button className='btn btn-dark btn-outline-light float-right small-font mt-1' onClick={handleSubmit}>
                                     {isPending? <Spinner animation='border' size='sm' variant='info' /> : "Create Entry"}
                                 </button>
    }


    // create entry in local state,  Not gonna happen now tho
    
    // for now hop tback to journal
    if(isFulfilled && data) {
        console.log("done")
        dispatch(toggleNewDialog());
        dispatch(fetchEntriesAction())
        return (<>Switching...</>)
    }

    return (
        <div className='row center max_width mx-auto px-3'>
                <form className='form-group card text-white bg-dark mb-3 mx-3 w-100' onSubmit={(event)=> console.log(event)}>
                    <div className='card-header container-fluid text-left align-middle py-1 px-3'>
                        <div className='form-row'>
                            <div className='col-6 mx-auto'>
                                <input readOnly className="form-control-plaintext text-white bg-dark border-dark rounded" id="dateTime" value={dateTime.toLocaleTimeString()} / >
                            </div>
                            <div className='col-6'>
                                 {getSubmitButton()}
                            </div>
                        </div>
                    </div>
                    <div className='card-body py-2 px-3 d-flex align-middle border-bottom border-secondary'>
                        <div className='my-auto mr-2'>
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

