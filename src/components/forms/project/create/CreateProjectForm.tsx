import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useAddNewProjectMutation } from "../../../../app/services/project/projectApiSlice";
import { ProjectForm, User } from "../../../../types";
import InputControl from "../../../formik/InputControl";
import { SelectControl } from "../../../formik/SelectControl";
import TextAreaControl from "../../../formik/TextAreaControl";
import ErrorList from "../../../toast/ErrorList";
import "./createProjectForm.scss";
import { initialValues, validationSchema } from "./CreateProjectSchema";

type CreateProjectFormProps = {
  users: User[];
  isLoading: boolean;
  isSuccess: boolean;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
};

const CreateProjectForm = ({
  users,
  isLoading,
  isSuccess,
  setSelectedId,
}: CreateProjectFormProps) => {
  const navigate = useNavigate();

  const [addNewProject, { isLoading: isProjectUpdating }] = useAddNewProjectMutation();

  const onSubmit = async (values: ProjectForm, submitProps: FormikHelpers<ProjectForm>) => {
    //sleep for 1 seconds
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // alert(JSON.stringify(values, null, 2));

    try {
      const result = await addNewProject({
        name: values.name,
        address: values.address,
        userId: values.userId,
      }).unwrap();
      console.log("🚀 ~ file: CreateProjectForm.tsx:48 ~ onSubmit ~ result", result);

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

  if (isLoading) {
    content = (
      <div className="loading">
        <PulseLoader color={"#1976d2"} />
      </div>
    );
  }

  if (isSuccess && Boolean(users.length)) {
    content = (
      <div className="container">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => {
            const buttonText =
              isProjectUpdating || formik.isSubmitting ? (
                <PulseLoader color={"black"} />
              ) : (
                <span>Create</span>
              );

            return (
              <Form>
                <h1 className="title">Create Project</h1>
                {/* <DebugControl values={formik.values} /> */}
                <div className="row">
                  <div className="left">
                    <InputControl
                      label="Project Name"
                      name="name"
                      type="text"
                      placeholder="Project Name"
                      isError={Boolean(formik.touched.name && formik.errors.name)}
                    />

                    <TextAreaControl
                      label="Address"
                      name="address"
                      type="text"
                      placeholder="Address"
                      isError={Boolean(formik.touched.address && formik.errors.address)}
                    />

                    <SelectControl
                      label="Assign Engineer"
                      name="userId"
                      isError={Boolean(formik.touched.userId && formik.errors.userId)}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        formik.setFieldValue("userId", e.target.value);

                        if (e.target.value !== "") {
                          setSelectedId(e.target.value);
                        } else {
                          setSelectedId(null);
                        }
                      }}
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

                  {/* <div className="right"></div> */}
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
      </div>
    );
  }

  return <div className="createProjectForm">{content}</div>;
};
export default CreateProjectForm;
