import styles from "./CreateProjectForm.module.scss";
import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useAddNewProjectMutation } from "../../../../app/services/project/projectApiSlice";
import { ProjectForm, User } from "../../../../types";
import ErrorList from "../../../toast/ErrorList";
import { DebugControl, TextError } from "../../../formik";
import * as Yup from "yup";

type CreateProjectFormProps = {
  users: User[];
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
};

const CreateProjectForm = ({ users, setSelectedId }: CreateProjectFormProps) => {
  const navigate = useNavigate();

  const [addNewProject, { isLoading: isProjectUpdating }] = useAddNewProjectMutation();

  const onSubmit = async (values: ProjectForm, submitProps: FormikHelpers<ProjectForm>) => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

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
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
  };

  return (
    <div className={styles.createProjectForm}>
      <div className={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => {
            const buttonText =
              isProjectUpdating || formik.isSubmitting ? (
                <PulseLoader color={"#1976d2"} />
              ) : (
                <span>Create</span>
              );

            return (
              <Form>
                <h1 className={styles.title}>Create Project</h1>

                {/* INPUT PROJECT NAME */}
                <div className={styles.formGroup}>
                  <label htmlFor="name">
                    Project Name <small>(required)</small>
                  </label>
                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Project name"
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
                    id="userId"
                    name="userId"
                    as="select"
                    className={`${styles.input} ${
                      Boolean(formik.touched.userId && formik.errors.userId) ? styles.error : ""
                    }`}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      formik.setFieldValue("userId", e.target.value);

                      if (e.target.value !== "") {
                        setSelectedId(e.target.value);
                      } else {
                        setSelectedId("");
                      }
                    }}
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
export default CreateProjectForm;

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
