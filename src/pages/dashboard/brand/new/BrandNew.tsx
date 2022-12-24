import CreateBrandForm from "../../../../components/forms/brand/create/CreateBrandForm";
import useTitle from "../../../../hooks/useTitle";
import "./brandNew.scss";

const BrandNew = () => {
  useTitle("Spedi: Brand Create");

  return (
    <div className="brandNew">
      <div className="section-1">
        <CreateBrandForm />
      </div>
    </div>
  );
};
export default BrandNew;
