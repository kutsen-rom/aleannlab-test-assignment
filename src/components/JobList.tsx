import { Jobs as IProps } from "../App";
import { Link, useParams } from 'react-router-dom'
import JobCard from "./JobCard";
import Pagination from "./Pagination";
import { jobsPerPage } from "./Pagination";


export default function JobList ({ jobs }: IProps) {
    // React Router variable to get page number from URL
    const params = useParams();

    // Current page number from URL
    const currentPage = Number(params.page);

    // Number (index) from where we will show jobs array
    const from = (currentPage - 1) * jobsPerPage;

    // Number (index) to which we will show jobs array
    const to = currentPage * jobsPerPage - 1;

    // Scroll to the top of the page at every page load
    window.scroll(0, 0);
  
  return (
    // MAIN CONTAINER: JOB LIST
    <div className="main-container-job-list bg-background flex flex-col items-center 
    lg:pt-[1.8rem] min-h-[100vh]">

      {/* For every job in a jobs array... */}
      {jobs.map((job, index) => {
        if (index >= from && index <= to) {
          return (

            // CONTAINER: LINK
            <div className="container-link w-full flex flex-col items-center 
            lg:mb-2">

                {/* render link... */}
                <Link key={job.id} className="link w-[95%] flex justify-center 
                lg:w-[85%]
                xl:w-[80%]
                2xl:w-[73%] " to={`/id/${job.id}`}>

                    {/* to JobCard component */}
                    <JobCard key={job.id} job={job} />
                </Link>
            </div>
        )
        } else return null
      })}

      {/* PAGINATION COMPONENT */}
      <Pagination jobs={jobs} />
    </div>
  );
};
