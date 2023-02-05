import styles from "./CreateProjectForm.module.scss";
import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useAddNewProjectMutation } from "../../../../app/services/project/projectApiSlice";
import { ProjectForm, User } from "../../../../types";
import ErrorList from "../../../toast/ErrorList";
import * as Yup from "yup";
import { DebugControl, TextError } from "../../../formik";

type CreateProjectFormProps = {
  users: User[];
  isLoading: boolean;
  isSuccess: boolean;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
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

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <PulseLoader color={"#1976d2"} />
      </div>
    );
  }

  if (isSuccess && Boolean(users.length)) {
    content = (
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
                  <label htmlFor="name">Project Name</label>
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
                  <label htmlFor="address">Address</label>
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
                  <label htmlFor="userId">Assigned Engineer</label>
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
                    disabled={!formik.isValid || formik.isSubmitting}
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
    );
  }

  return <div className={styles.createProjectForm}>{content}</div>;
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
