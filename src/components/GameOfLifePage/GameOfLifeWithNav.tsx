import React, { lazy, Suspense } from 'react';
import { LoadingSpinner } from '../LoadingSpinner';

const LazyLoadedGameOfLife = lazy(() => import('./GameOfLife'));

export default function GameOfLifeLazyWrapper(){
    React.useEffect(() => {
        document.title = "Life"
    }, [])
    return (
        <div className='cover-container d-flex row p-3 mx-auto flex-column'>
            <Suspense fallback={<LoadingSpinner/>}>
                <LazyLoadedGameOfLife/>
            </Suspense>
        </div>
    )
}


