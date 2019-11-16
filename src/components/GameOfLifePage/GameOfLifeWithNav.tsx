import React, { lazy, Suspense } from 'react';
import { NavBar } from '../NavBar/NavBar';

const LazyLoadedGameOfLife = lazy(() => import('./GameOfLife'));

export default function GameOfLifeWithNav(){
    return (
        <div className='cover-container d-flex h-100 p-3 mx-auto flex-column'>
                <NavBar />
                <Suspense fallback={<div className='spinner-border text-light'/>}>
                    <LazyLoadedGameOfLife/>
                </Suspense>
        </div>
    )
}


