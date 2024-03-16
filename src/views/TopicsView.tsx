import { Course } from "../types/Course";
import { Topic } from "../types/Topic";

type Props = {
  courses: Course[];
  topics: Topic[];
};

const TopicsView: React.FC<Props> = ({ courses, topics }) => {
  console.log(courses);
  console.log(topics);
  return (
    <div>
      <h1>Topics View</h1>
    </div>
  );
};

export default TopicsView;
