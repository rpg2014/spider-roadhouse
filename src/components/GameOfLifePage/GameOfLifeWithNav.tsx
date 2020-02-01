import React, { lazy, Suspense } from 'react';
import {Spinner} from 'react-bootstrap';

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

type VariantType = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark";
type SizeType = "sm"
export interface ILoadingProps {
    variant?: VariantType,
    size?: SizeType
}

export const LoadingSpinner = (props: ILoadingProps ): JSX.Element => {
    if(!props.variant){
        props.variant ='secondary';
    }
    
    return (
        <div className='inner mb-auto my-3 text-center'>
            <Spinner animation='border' variant={props.variant} size={props.size ? props.size : undefined} />
        </div>
    )
}
