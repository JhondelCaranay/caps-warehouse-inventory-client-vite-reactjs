import ItemDataTable from "../../../../components/dashboard/datatable/item/ItemDataTable";
import useTitle from "../../../../hooks/useTitle";
import "./itemList.scss";

const ItemList = () => {
  useTitle("Spedi: Item List");

  return (
    <div className="itemList">
      <ItemDataTable />
    </div>
  );
};
export default ItemList;
