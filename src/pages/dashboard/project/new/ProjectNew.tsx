import CreateProjectForm from "../../../../components/forms/project/create/CreateProjectForm";
import useTitle from "../../../../hooks/useTitle";
import "./projectNew.scss";

const ProjectNew = () => {
  useTitle("Spedi: Project Create");
  return (
    <div className="projectNew">
      <CreateProjectForm />
    </div>
  );
};
export default ProjectNew;
