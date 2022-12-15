import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>404</h1>
      <p>Page not found</p>
      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};
export default Page404;
