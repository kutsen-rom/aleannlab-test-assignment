import { Job as Props} from "../App";
import { Link } from 'react-router-dom'
import JobCard from "./JobCard";

// Type of props
interface IProps {
  jobs: Props[];
}


export default function JobList ({ jobs }: IProps) {
  
  return (
    // MAIN CONTAINER: JOB LIST
    <div className="bg-background flex flex-col items-center justify-around">

      {/* For every job in a jobs array... */}
      {jobs.map((job) => {
        return (

            // render link...
            <Link className="w-[95%]" to={`${job.id}`}>

                {/* to JobCard component */}
                <JobCard key={job.id} job={job} />
            </Link>
        )
      })}
    </div>
  );
};
