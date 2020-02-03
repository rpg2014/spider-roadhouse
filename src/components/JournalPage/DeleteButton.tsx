import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import IApplicationStore from '../../interfaces/IApplicationStore'
import { IErrorDetail } from '../../interfaces/IErrorDetail';
import { useFetch } from "react-async"
import { SPIDERMAN_BASE_URL, JOURNAL } from '../../store/paths';
import { HTTPMethod } from '../../epics/common';
import { Modal, Button, Alert, Spinner } from 'react-bootstrap';
import { deleteEntryAction } from '../../actions/journalActions';



export interface IDeleteButtonProps {
    id: string
}
interface IDeleteResponse {
    success: boolean
}
interface IDeleteButtonState {
    isFetching: boolean,
    isError: boolean,
    errorDetail: IErrorDetail
}


export const DeleteButton = (props: IDeleteButtonProps) => {
    const authToken = useSelector((state: IApplicationStore) => state.authDetails.accessToken? state.authDetails.accessToken.getJwtToken(): "")
    const dispatch = useDispatch();
    const [isAreYouSureVisible, setAreYouSureVisible] = useState(false);
    const [hideError, setHideError] = useState(false);
    const headers = {
        'spider-access-token': authToken ,
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
    }
    const options = {
        headers,
        method: HTTPMethod.DELETE,

    }

    const {data, error ,isPending, run, isFulfilled} = useFetch<IDeleteResponse>(SPIDERMAN_BASE_URL + JOURNAL + "/" + props.id, options )
    
        

    const deleteEntry = () => {
        toggleAreYouSure()
        if(hideError) {
            setHideError(false);
        }
        run()
    }

    const toggleAreYouSure = () => {
        setAreYouSureVisible(isAreYouSureVisible? false: true);
    }

    if(error && !hideError) {
        console.log(error)
        setTimeout(()=> {
            setHideError(true);
        },2000)
        return <Alert variant="danger" >{error.message}</Alert>
    }

    if(isFulfilled && data && data.success) {
        dispatch(deleteEntryAction({
            id: props.id
        }))
    }

    const getText = () => {
        return (isPending ? <Spinner variant='danger' animation='border' size='sm' as='span' role='status'/> : "Delete")
    }

    return (
        <>
            <button className='btn-sm btn-dark btn-outline-light float-right small-font' onClick={toggleAreYouSure}>
                {getText()}
            </button>

            <Modal show={isAreYouSureVisible} onHide={toggleAreYouSure} centered >
                <Modal.Header className='bg-dark text-white' closeButton>
                    <Modal.Title className=''>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark lead'>Are you sure you want to delete this entry? It cannot be recovered.</Modal.Body>
                <Modal.Footer className='bg-dark'>
                    <Button variant="outline-light"  onClick={toggleAreYouSure}>
                        Close
                    </Button>
                    <Button variant="outline-danger" onClick={deleteEntry}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}