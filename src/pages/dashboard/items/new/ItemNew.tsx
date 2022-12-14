import CreateItemForm from "../../../../components/forms/item/create/CreateItemForm";
import useTitle from "../../../../hooks/useTitle";
import "./itemNew.scss";

const ItemNew = () => {
  useTitle("Spedi: Item Create");
  return (
    <div className="itemNew">
      <CreateItemForm />
    </div>
  );
};
export default ItemNew;
