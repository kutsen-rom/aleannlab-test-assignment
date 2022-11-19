import { Jobs as IProps } from "../App";
import { Link } from 'react-router-dom'
import JobCard from "./JobCard";


export default function JobList ({ jobs }: IProps) {
  
  return (
    // MAIN CONTAINER: JOB LIST
    <div className="bg-background flex flex-col items-center justify-around">

      {/* For every job in a jobs array... */}
      {jobs.map((job) => {
        return (

            // CONTAINER: LINK
            <div className="container-link w-full flex flex-col items-center lg:mt-[1.625rem] ">

                {/* render link... */}
                <Link key={job.id} className="link w-[95%] flex justify-center lg:w-[73%] " to={`${job.id}`}>

                    {/* to JobCard component */}
                    <JobCard key={job.id} job={job} />
                </Link>
            </div>
           
        )
      })}
    </div>
  );
};
