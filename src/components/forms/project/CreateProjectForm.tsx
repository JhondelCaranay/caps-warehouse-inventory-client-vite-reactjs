import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useAddNewProjectMutation } from "../../../app/services/project/projectApiSlice";
import { useGetUsersQuery } from "../../../app/services/user/userApiSlice";
import { ProjectCreateForm, User, ROLES } from "../../../types";
import DebugControl from "../../formik/DebugControl";
import InputControl from "../../formik/InputControl";
import { SelectControl } from "../../formik/SelectControl";
import TestAreaControl from "../../formik/TestAreaControl";
import ErrorList from "../../toast/ErrorList";
import "./createProjectForm.scss";
import { initialValues, validationSchema } from "./CreateProjectSchema";

const CreateProjectForm = () => {
    const navigate = useNavigate();

    const [addNewProject, { isLoading: isProjectUpdating }] =
        useAddNewProjectMutation();

    const {
        data: users,
        isLoading: isLoadingUser,
        isSuccess: isSuccessUser,
    } = useGetUsersQuery("userList", {
        refetchOnMountOrArgChange: true,
        selectFromResult: (result) => {
            return {
                ...result,
                // get only Engineer
                data: result.data?.ids.filter((id) => result.data?.entities[id]?.role === ROLES.ENGINEER).map((id) => result.data?.entities[id] as User),
                // data: result.data?.ids.map((id) => result.data?.entities[id] as User),
            };
        },
    });

    const onSubmit = async (
        values: ProjectCreateForm,
        submitProps: FormikHelpers<ProjectCreateForm>
    ) => {
        //sleep for 1 seconds
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert(JSON.stringify(values, null, 2));

        try {

            const result = await addNewProject({
                name: values.name,
                address: values.address,
                userId: values.userId,
            }).unwrap();
            console.log("🚀 ~ file: CreateItemForm.tsx:49 ~ CreateItemForm ~ result", result)

            toast.success("Project created successfully");
            submitProps.resetForm();
            navigate("/dash/projects");
        } catch (err: any) {
            if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
            else if (err.error) toast.error(err.error);
            else toast.error("Something went wrong, our team is working on it");
        }
        submitProps.setSubmitting(false);
    };


    let content: JSX.Element | null = null;

    if (isLoadingUser) {
        content = (
            <div className="loading">
                <PulseLoader color={"#000000"} />
            </div>
        );
    }

    if (isSuccessUser) {
        content = (
            <div className="container">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    enableReinitialize
                >
                    {(formik) => {
                        const buttonText = (isProjectUpdating || formik.isSubmitting) ? (
                            <PulseLoader color={"black"} />
                        ) : (
                            <span>Create</span>
                        );


                        return (
                            <Form>
                                <h1 className="title">Create Project</h1>

                                <DebugControl values={formik.values} />
                                <div className="row">
                                    <div className="left">
                                        <InputControl
                                            label="Project Name"
                                            name="name"
                                            placeholder="Project Name"
                                            isError={Boolean(formik.touched.name && formik.errors.name)}
                                        />

                                        <TestAreaControl
                                            label="Address"
                                            name="address"
                                            placeholder="Address"
                                            isError={Boolean(formik.touched.address && formik.errors.address)}
                                        />

                                        <SelectControl
                                            label="Assign Engineer"
                                            name="userId"
                                            isError={Boolean(formik.touched.userId && formik.errors.userId)}
                                        >
                                            <>
                                                {users?.map((user) => (
                                                    <option key={user.id} value={user.id}>
                                                        {user.Profile.first_name + " " + user.Profile.last_name}
                                                    </option>
                                                ))}
                                            </>
                                        </SelectControl>
                                    </div>

                                    <div className="right"></div>
                                </div>

                                <div className="formGroup">
                                    <Button
                                        type="submit"
                                        size="small"
                                        variant="outlined"
                                        disabled={!formik.isValid || formik.isSubmitting}
                                    >
                                        {buttonText}
                                    </Button>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div >
        )
    }



    return <div className="createProjectForm">{content}</div>;
}
export default CreateProjectForm