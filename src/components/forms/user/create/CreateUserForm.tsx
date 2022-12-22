import { AddAPhoto, RemoveCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { useAddNewUserMutation } from "../../../../app/services/user/userApiSlice";
import { storage } from "../../../../config/firebase";
import { Capitalize } from "../../../../config/utils/functions";
import { ROLES, UserCreateForm } from "../../../../types";
import DebugControl from "../../../formik/DebugControl";
import InputControl from "../../../formik/InputControl";
import { SelectControl } from "../../../formik/SelectControl";
import TextAreaControl from "../../../formik/TextAreaControl";
import TextError from "../../../formik/TextError";
import ErrorList from "../../../toast/ErrorList";
import "./createUserForm.scss";
import { initialValues, validationSchema } from "./CreateUserSchema";

const CreateUserForm = () => {
  const navigate = useNavigate();

  const [addNewUser, { isLoading: isUserUpdating }] = useAddNewUserMutation();

  const onSubmit = async (values: UserCreateForm, submitProps: FormikHelpers<UserCreateForm>) => {
    //sleep for 1 seconds
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // alert(JSON.stringify(values, null, 2));

    try {
      let url = "";
      if (values.avatarUrl) {
        console.log(
          "🚀 ~ file: CreateUserForm.tsx:35 ~ onSubmit ~ values.avatarUrl",
          values.avatarUrl
        );
        const file = values.avatarUrl;
        const storageRef = ref(storage, `caps/image/${file.name + v4()}`);
        const snapshot = await uploadBytes(storageRef, file);
        url = await getDownloadURL(snapshot.ref);
      }

      const result = await addNewUser({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        position: values.position,
        role: values.role,
        status: values.status,
        contact: values.contact || null,
        address: values.address || null,
        avatarUrl: url || null,
      }).unwrap();
      console.log("🚀 ~ file: CreateItemForm.tsx:49 ~ CreateItemForm ~ result", result);

      toast.success("User created successfully");
      submitProps.resetForm();
      navigate("/dash/users");
    } catch (err: any) {
      if (err?.data?.message) toast.error(<ErrorList messages={err?.data?.message} />);
      else if (err.error) toast.error(err.error);
      else toast.error("Something went wrong, our team is working on it");
    }
    submitProps.setSubmitting(false);
  };

  let content: JSX.Element | null = null;

  //   if (false) {
  //     content = (
  //       <div className="loading">
  //         <PulseLoader color={"#000000"} />
  //       </div>
  //     );
  //   }

  if (true) {
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
              isUserUpdating || formik.isSubmitting ? (
                <PulseLoader color={"black"} />
              ) : (
                <span>Create</span>
              );

            return (
              <Form>
                <h1 className="title">Create User</h1>
                <DebugControl values={formik.values} />
                <div className="row">
                  <div className="left">
                    <InputControl
                      label="First Name"
                      name="first_name"
                      type="text"
                      isError={Boolean(formik.touched.first_name && formik.errors.first_name)}
                    />

                    <InputControl
                      label="Last Name"
                      name="last_name"
                      type="text"
                      isError={Boolean(formik.touched.last_name && formik.errors.last_name)}
                    />

                    <InputControl
                      label="Email"
                      name="email"
                      type="text"
                      isError={Boolean(formik.touched.email && formik.errors.email)}
                    />

                    <InputControl
                      label="Position"
                      name="position"
                      type="text"
                      isError={Boolean(formik.touched.position && formik.errors.position)}
                    />

                    <SelectControl
                      label="Role"
                      name="role"
                      isError={Boolean(formik.touched.role && formik.errors.role)}
                    >
                      <>
                        {Object.keys(ROLES)
                          .filter((key) => key !== ROLES.SUPER_ADMIN)
                          .map((key) => (
                            <option key={key} value={key}>
                              {Capitalize(key)}
                            </option>
                          ))}
                      </>
                    </SelectControl>

                    <InputControl
                      label="Contact"
                      name="contact"
                      type="text"
                      placeholder="+631234567890"
                      isError={Boolean(formik.touched.contact && formik.errors.contact)}
                    />
                  </div>

                  <div className="right">
                    <TextAreaControl
                      label="Address"
                      name="address"
                      type="text"
                      isError={Boolean(formik.touched.address && formik.errors.address)}
                    />

                    <div className="formGroup">
                      <p>Picture</p>
                      <div
                        className={
                          formik.touched.avatarUrl && formik.errors.avatarUrl
                            ? "add-photo error"
                            : "add-photo"
                        }
                      >
                        <div className="controls">
                          <label htmlFor="avatarUrl">
                            <AddAPhoto
                              className="icons"
                              fontSize="large"
                              onClick={(e) => formik.setFieldTouched("avatarUrl", true)}
                            />
                          </label>
                          <RemoveCircle
                            className="icons"
                            fontSize="large"
                            onClick={(e) => {
                              formik.setFieldValue("avatarUrl", null);
                            }}
                          />
                        </div>
                        {formik.values.avatarUrl && (
                          <div className="preview">
                            <img
                              style={{
                                display: formik.errors.avatarUrl ? "none" : "block",
                              }}
                              src={URL.createObjectURL(formik.values.avatarUrl)}
                              alt="preview"
                            />
                          </div>
                        )}
                      </div>
                      <Field
                        name="avatarUrl"
                        id="avatarUrl"
                        type="file"
                        accept="image/png, image/gif, image/jpeg"
                        className={
                          formik.touched.avatarUrl && formik.errors.avatarUrl
                            ? "input error"
                            : "input"
                        }
                        value={""}
                        onChange={(event: any) => {
                          formik.setFieldValue("avatarUrl", event.currentTarget.files[0]);
                        }}
                      />
                      <ErrorMessage
                        name="avatarUrl"
                        component={(props) => <TextError {...props} />}
                      />
                    </div>
                  </div>
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

  return <div className="createUserForm">{content}</div>;
};
export default CreateUserForm;
