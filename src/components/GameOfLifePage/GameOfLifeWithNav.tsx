import React, { lazy, Suspense } from 'react';
import { NavBar } from '../NavBar/NavBar';

const LazyLoadedGameOfLife = lazy(() => import('./GameOfLife'));

export default function GameOfLifeWithNav(){
    return (
        <div className='cover-container d-flex h-100 p-3 mx-auto flex-column'>
            <div className = 'mb-4'>
                <NavBar />
            </div>
            <Suspense fallback={<LoadingSpinner/>}>
                <LazyLoadedGameOfLife/>
            </Suspense>
        </div>
    )
}

function LoadingSpinner(): JSX.Element {
    return (
        <div className='inner mb-auto mt-3 text-center'>
            <div className='spinner-border text-light'/>
        </div>
    )
}
