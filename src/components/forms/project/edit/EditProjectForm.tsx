import styles from "./EditProjectForm.module.scss";
import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useUpdateProjectMutation } from "../../../../app/services/project/projectApiSlice";
import { ProjectForm, User, Project } from "../../../../types";
import ErrorList from "../../../toast/ErrorList";
import * as Yup from "yup";
import { DebugControl, TextError } from "../../../formik";

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
    // await new Promise((resolve) => setTimeout(resolve, 1s000));

    try {
      const result = await updateProject({
        id: String(project?.id),
        name: values.name,
        address: values.address,
        userId: values.userId,
      }).unwrap();
      console.log("🚀 ~ file: EditItemForm.tsx:49 ~ EditItemForm ~ result", result);

      toast.success("Project updated successfully");
      submitProps.resetForm();
      navigate("/dash/projects");
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
  };

  return (
    <div className={styles.editProjectForm}>
      <div className={styles.container}>
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
                <h1 className={styles.title}>Edit Project</h1>

                {/* INPUT PROJECT NAME */}
                <div className={styles.formGroup}>
                  <label htmlFor="name">
                    Project Name <small>(required)</small>
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Item name"
                    className={`${styles.input} ${
                      Boolean(formik.touched.name && formik.errors.name) ? styles.error : ""
                    }`}
                  />
                  <ErrorMessage
                    name="name"
                    component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                  />
                </div>

                {/* DESCRIPTION TEXT AREA */}
                <div className={styles.formGroup}>
                  <label htmlFor="address">
                    Address <small>(required)</small>
                  </label>
                  <Field
                    id="address"
                    name="address"
                    as="textarea"
                    rows="4"
                    placeholder="Address"
                    className={`${styles.input} ${
                      Boolean(formik.touched.address && formik.errors.address) ? styles.error : ""
                    }`}
                  />
                  <ErrorMessage
                    name="address"
                    component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                  />
                </div>

                {/* SELECT ASSIGN ENGINEER */}
                <div className={styles.formGroup}>
                  <label htmlFor="userId">
                    Assigned Engineer <small>(required)</small>
                  </label>
                  <Field
                    disabled
                    id="userId"
                    name="userId"
                    as="select"
                    className={`${styles.input} ${
                      Boolean(formik.touched.userId && formik.errors.userId) ? styles.error : ""
                    }`}
                  >
                    <option value="">Select Engineer</option>
                    {users?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.Profile.first_name + " " + user.Profile.last_name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="userId"
                    component={(props) => <TextError {...props} styles={styles["text-error"]} />}
                  />
                </div>

                <div className={styles.formGroup}>
                  <Button
                    type="submit"
                    size="small"
                    variant="outlined"
                    disabled={formik.isSubmitting}
                  >
                    {buttonText}
                  </Button>
                </div>

                {/* DEBUGER */}
                {import.meta.env.VITE_NODE_ENV === "development" && (
                  <DebugControl values={formik.values} />
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};
export default EditProjectForm;

export const initialValues: ProjectForm = {
  name: "",
  address: "",
  userId: "",
};

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  userId: Yup.string().required("Required").uuid("Must be a valid UUID"),
});
