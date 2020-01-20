import React, { lazy, Suspense } from 'react';
import {Spinner} from 'react-bootstrap';

const LazyLoadedGameOfLife = lazy(() => import('./GameOfLife'));

export default function GameOfLifeWithNav(){
    return (
        <div className='cover-container d-flex row p-3 mx-auto flex-column'>
            <Suspense fallback={<LoadingSpinner/>}>
                <LazyLoadedGameOfLife/>
            </Suspense>
        </div>
    )
}

export function LoadingSpinner(): JSX.Element {
    return (
        <div className='inner mb-auto my-3 text-center'>
            <Spinner animation='border' variant='secondary' />
        </div>
    )
}
