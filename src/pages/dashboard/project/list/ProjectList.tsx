import ProjectDataTable from "../../../../components/dashboard/datatable/project/ProjectDataTable";
import useTitle from "../../../../hooks/useTitle";
import "./projectList.scss";

const ProjectList = () => {
	useTitle("Spedi: Project List");

	return (
		<div className="categoryList">
			<ProjectDataTable />
		</div>
	);
};
export default ProjectList;
