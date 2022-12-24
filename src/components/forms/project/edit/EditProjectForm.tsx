import { Button } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useUpdateProjectMutation } from "../../../../app/services/project/projectApiSlice";
import { ProjectForm, User, Project } from "../../../../types";
import InputControl from "../../../formik/InputControl";
import { SelectControl } from "../../../formik/SelectControl";
import TextAreaControl from "../../../formik/TextAreaControl";
import ErrorList from "../../../toast/ErrorList";
import "./editProjectForm.scss";
import { initialValues, validationSchema } from "./EditProjectSchema";

type EditProjectFormProps = {
  project: Project;
  users: User[];
};

const EditProjectForm = ({ project, users }: EditProjectFormProps) => {
  const navigate = useNavigate();

  const [updateProject, { isLoading: isProjectUpdating }] = useUpdateProjectMutation();

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    if (project) {
      setFormValues((prev) => ({
        ...prev,
        name: project.name,
        address: project.address,
        userId: project.userId,
      }));
    }
  }, [project]);

  const onSubmit = async (values: ProjectForm, submitProps: FormikHelpers<ProjectForm>) => {
    //sleep for 1 seconds
    // await new Promise((resolve) => setTimeout(resolve, 1s000));
    // alert(JSON.stringify(values, null, 2));

    try {
      const result = await updateProject({
        id: String(project?.id),
        name: values.name,
        address: values.address,
        userId: values.userId,
      }).unwrap();
      console.log("🚀 ~ file: EditItemForm.tsx:49 ~ EditItemForm ~ result", result);

      toast.success("Project edited successfully");
      submitProps.resetForm();
      navigate("/dash/projects");
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else if (err.error) toast.error(err.error);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
  };

  let content: JSX.Element = <></>;

  content = (
    <div className="container">
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(formik) => {
          const buttonText =
            isProjectUpdating || formik.isSubmitting ? (
              <PulseLoader color={"#1976d2"} />
            ) : (
              <span>Edit</span>
            );

          return (
            <Form>
              <h1 className="title">Edit Project</h1>
              {/* <DebugControl values={formik.values} /> */}

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
                disabled
                label="Assigned Engineer"
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

  return <div className="editProjectForm">{content}</div>;
};
export default EditProjectForm;
