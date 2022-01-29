import React, { lazy, useEffect } from 'react';
import { useState } from 'react';
import { SearchBar }from 'rpg2014-components';
import './componentlibrary.scss';

import {predictive_input }from 'component-wasm-functions'; 
import getLazyLoadedComponent from '../../NavBar/NavBar';
import { useFetch } from 'react-async';
import { HTTPMethod } from '../../../epics/common';

interface Prediction {
    score: number,
    text: string,
}

interface PredictionResponse {
    top_result: Prediction,
    result_list: Prediction[],
}
let listOfWords = ["able","alphabet","discussion", "stuff", "test"];

const options = {
    method: HTTPMethod.GET,
  };

export const PredictiveInput = (props:{}): React.ReactElement => {
    const { data, error, isPending, run, isFulfilled } = useFetch<String[]>("https://random-word-api.herokuapp.com/all", options ,{json: true})
    useEffect(()=> {
        console.log(data?.length)
    }
    ,[data])
    const[predictionsToShow, setPredictionsToShow] = useState<Prediction[]>([])
    const onChange = (searchText: string) => {
        if(searchText !== "" && !isPending && data && isFulfilled){
            var d = new Date();
            var startTime = d.getTime();
            const predictionResponse: PredictionResponse = predictive_input(searchText, data, 0);
            var d2 = new Date();
            const endTime = d2.getTime();
            console.log("Time Taken: " +(endTime-startTime) / 1000)
            console.log("Top Result: " + JSON.stringify(predictionResponse.top_result))
            setPredictionsToShow(predictionResponse.result_list.slice(0,5))
        }
        
    }
    return (
        <div className='predictive-input-wrapper mx-auto pt-5'>
            <SearchBar width='40%' buttonLabel='🡲' placeholder="Component name" variant='underline' onChange={(searchText) => onChange(searchText)}/>
            <List input={predictionsToShow} /> 
        </div>
    )
}
export default PredictiveInput

const List = (props: {input: Prediction[]}) => {
    
    return (
        <div>
            {props.input.map( (prediction: Prediction) => <div key={prediction.text}>text: {prediction.text} | score: {prediction.score} </div>)}
        </div>
    )   
}