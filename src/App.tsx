import React, { useState, useEffect } from 'react';
import LoadingScreen from "./components/LoadingScreen";
import ErrorPage from "./components/ErrorPage";
import { Routes, Route, Navigate } from "react-router-dom";
import JobList from "./components/JobList";
import DetailedJob from "./components/DetailedJob";


// API URL
const url =
  "https://api.json-generator.com/templates/ZM1r0eic3XEy/data?access_token=";

  // API Bearer Token
const bearerToken = process.env.REACT_APP_BEARER_TOKEN;


  // Type of single job
export interface Job {
    id: string;
    name: string;
    email: string;
    phone: string;
    title: string;
    location: {
      lat: number;
      long: number;
    };
    address: string;
    benefits: string[];
    description: string;
    employment_type: string[];
    pictures: string[];
    salary: string;
    createdAt: string;
    updatedAt: string;
}

// Type of array of jobs
export interface Jobs {
  jobs: Job[];
}

/**
 * Type of the state of app
 */
interface IState {
  jobs: Job[];
  error: boolean;
}


export default function App() {

  /**
   * Create state with a default value of null and a type: array of jobs or null
   */
   const [jobs, setJobs] = useState<IState["jobs"] | null>(null);

  
   /**
    * Create error state to manage error screen
    */
   const [error, setError] = useState<IState["error"]>(false);

 
   /**
    * Fetch jobs list from provided URL and set is as a state, if failed set error state to true
    *
    * @returns json array of objects
    */
   async function getData() {
 
     // Fetch jobs list data from url
     try {
       const result = await fetch(url + bearerToken);
 
       // Convert data to JSON
       const json = await result.json();
 
       // Set state to received jobs list
       setJobs(json);
       return json;
 
       // If failed to fetch data...
     } catch (e) {
 
       // set error state to true
       return setError(true);
     }
   };
 
   
   /**
    * When component first loads call getData() function once to receive job list and set state
    */
   useEffect(() => {
     getData();
   }, []);
 
 
   // If jobs list is not fetched yet...
   if (jobs === null) {
 
     // and there is no error...
     if (!error) {
 
       // render LoadingScreen...
       return <LoadingScreen />;
 
       // and if there is an error...
     } else {
 
       // render ErrorPage
       return <ErrorPage />;
     }
   }


  return (
    <Routes>
        <Route path='/' element={<Navigate to='/1' />}/>
        <Route path=':page' index element={<JobList jobs={jobs} />} />
        <Route path='/id/:id' element={<DetailedJob jobs={jobs} />} />
    </Routes>
  );
}