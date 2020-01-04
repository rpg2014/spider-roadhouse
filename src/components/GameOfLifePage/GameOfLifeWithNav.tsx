import React, { lazy, Suspense } from 'react';

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
        <div className='inner mb-auto mt-3 text-center'>
            <div className='spinner-border text-light'/>
        </div>
    )
}
