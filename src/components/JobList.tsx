import { Job as Props} from "../App";
import { Link } from 'react-router-dom'
import { JobCard } from "./JobCard";


interface IProps {
  jobs: Props[];
}

export const JobList: React.FC<IProps> = ({ jobs }) => {
  
  return (
    <div className="bg-background flex flex-col items-center justify-around">
      {/* Render Job component for every job in a list */}
      {jobs.map((job) => {
        return (
            <Link className="w-[95%]" to={`${job.id}`}>
                <JobCard key={job.id} job={job} />
            </Link>
        )
      })}
    </div>
  );
};
