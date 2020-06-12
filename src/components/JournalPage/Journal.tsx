import * as React from 'react';
import {JournalList} from './JournalList'
import { SignOut } from 'aws-amplify-react';
import { ConfirmEmail } from '../Auth/ConfirmEmail';
import { CognitoUser } from "amazon-cognito-identity-js";
import { useDispatch, useSelector } from 'react-redux';
import { useAuthData, AuthProps } from '../Auth/common';
import IApplicationStore from '../../interfaces/IApplicationStore';
import { fetchEntriesAction, toggleNewDialog } from '../../actions/journalActions';
import { NewEntry } from './NewEntry'
import { LoadingSpinner } from '../LoadingSpinner';
import { CSSTransition } from 'react-transition-group';




interface JournalProps {
}

export const Journal: React.FC<JournalProps&AuthProps> = (props: JournalProps & AuthProps) => {
    const isNewEntryDialogOpen = useSelector((state:IApplicationStore)=> state.isNewJournalDialogOpen);
    const dispatch = useDispatch();
    
    const authToken = useSelector( (state:IApplicationStore) => state.authDetails.accessToken ? state.authDetails.accessToken.getJwtToken(): undefined);
    const submitNewEntrySuccess = useSelector((state : IApplicationStore) => state.createEntryState.data);
    
    useAuthData(props.authData)

    // Fetch journal entries on load. (after we get an authToken or whenever it changes)
    React.useEffect(() => {
        if(authToken){
            dispatch(fetchEntriesAction());
        }
    },[authToken])

    React.useEffect(()=> {
        if(submitNewEntrySuccess === true) {
            dispatch(fetchEntriesAction())
        }
    },[submitNewEntrySuccess])

    const toggleNew = () => {
        dispatch(toggleNewDialog())
    }

    if(props.authState === "confirmSignUp"){
        return(
        <ConfirmEmail/>
        )
    }
    if(props.authState === "loading") {
        return (
            <div className='m-auto text-center'>

                <div className='display-1 text-muted'>Logging in...</div>
                <LoadingSpinner variant='dark' />
            </div>
        )
    }
    if(props.authState !== "signedIn" || !props.authData) {
        return null
    }
    return (
        <>
            <div className='row d-flex max_width center mx-auto pt-3 '>
                <div className='col-10 '>
                    <p className=' lead text-dark text-left align-middle  rounded'>
                        Here are all of your journal entries sorted by date    
                        <br/>
                        <span className='smallest-font'>
                            The notes are encrypted before they are saved on the server.  No one has access to them but you
                        </span>
                    </p>
                </div>
                <div className='col-2'>
                    <button className='btn  btn-outline-dark float-right' onClick={toggleNew}>
                        {isNewEntryDialogOpen ? "Cancel" : "New"}
                    </button>
                </div>
            </div>
               <CSSTransition
               in={isNewEntryDialogOpen}
                 classNames="newEntry"
                 unmountOnExit
                 timeout={300}
                 transitionEnter={true}
                 transitionLeave={true}>
                    <NewEntry />
               </CSSTransition>
               <JournalList />
            <div className='row center mx-auto mt-2'>
                <SignOut/>
            </div>
        </>
        );
}



