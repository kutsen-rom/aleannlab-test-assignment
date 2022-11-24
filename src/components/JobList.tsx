import { Jobs as IProps } from "../App";
import { Link, useParams } from 'react-router-dom'
import JobCard from "./JobCard";
import Pagination from "./Pagination";


export default function JobList ({ jobs }: IProps) {
    // React Router variable to get page number from URL
    const params = useParams();

    // Current page number from URL
    const currentPage = Number(params.page);
  
    // Quantity of jobs to show on one page
    const jobsPerPage = 3;

    // Number (index) from where we will show jobs array
    const from = (currentPage - 1) * jobsPerPage;

    // Number (index) to which we will show jobs array
    const to = currentPage * jobsPerPage - 1;

window.scroll(0, 0);
  
  return (
    // MAIN CONTAINER: JOB LIST
    <div className="main-container-job-list bg-background flex flex-col items-center justify-around 
    lg:pt-[1.8rem]">

      {/* For every job in a jobs array... */}
      {jobs.map((job, index) => {
        if (index >= from && index <= to) {
          return (

            // CONTAINER: LINK
            <div className="container-link w-full flex flex-col items-center 
            lg:mb-2">

                {/* render link... */}
                <Link key={job.id} className="link w-[95%] flex justify-center 
                lg:w-[73%] " to={`/id/${job.id}`}>

                    {/* to JobCard component */}
                    <JobCard key={job.id} job={job} />
                </Link>
            </div>
        )
        }
      })}

      <Pagination jobs={jobs} />
    </div>
  );
};
