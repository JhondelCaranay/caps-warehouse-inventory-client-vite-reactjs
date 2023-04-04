import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetItemsByFiltersQuery } from "../../../../app/services/item/itemApiSlice";
import { useTitle } from "../../../../hooks";
import { Item } from "../../../../types";
import styles from "./EngItems.module.scss";
import noImage from "../../../../assets/img/noimage.png";
import ReactPaginate from "react-paginate";
import { useGetCategoriesQuery } from "../../../../app/services/category/categoryApiSlice";
import { debounce } from "lodash";
import { ErrorMessage, Loading } from "../../../../components";

const EngItems = () => {
  useTitle("Spedi: Item List");
  const navigate = useNavigate();
  // const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  const {
    data: items,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useGetItemsByFiltersQuery(`name=${searchInput}&category=${selectedCategory}`, {
    refetchOnMountOrArgChange: true,
  });

  const { data: categories } = useGetCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchInputChange = debounce((value) => {
    setSearchInput(value);
  }, 2000);

  const changePage = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const PER_PAGE = 8;
  const pagesVisited = currentPage * PER_PAGE;
  const display = items?.slice(pagesVisited, pagesVisited + PER_PAGE) as Item[];
  const pageCount = items ? Math.ceil(items.length / PER_PAGE) : 0;

  let content: JSX.Element = <></>;

  if (isLoading) {
    content = <Loading />;
  }
  if (isError) {
    console.log("Error: ", error);
    content = <ErrorMessage message={"Failed to load data"} />;
  }

  if (isSuccess && items && categories) {
    content = (
      <>
        {/* ITEMS */}

        <h1 className={styles.title}>Items</h1>
        {/* ITEM */}
        <div className={styles.items}>
          {display && display.length > 0 ? (
            display.map((item) => (
              <div className={styles.item} key={item.id}>
                <div className={styles.itemImg}>
                  <img src={item.pictureUrl || noImage} alt="" className={styles.image} />
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.name}</div>
                  </div>
                </div>
                {item.quantity === 0 ? <div className={styles.outofstock}>Out of Stock</div> : null}
                <div className={styles.backButton} onClick={() => navigate(`/me/items/${item.id}`)}>
                  view
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noItems}>No Items</div>
          )}
        </div>
        <div className={styles.paginator}>
          <ReactPaginate
            previousLabel={<NavigateBefore />}
            nextLabel={<NavigateNext />}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={styles.pagination}
            previousLinkClassName={styles.previous_page}
            nextLinkClassName={styles.next_page}
            disabledClassName={styles.pagination__link__disabled}
            activeClassName={styles.pagination__link__active}
          />
        </div>
      </>
    );
  }

  return (
    <div className={styles.engItems}>
      <div className={styles.wrapper}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.group}>
            <div className={styles.title}>Name</div>
            <input
              className={styles.searchInput}
              type="text"
              // value={searchInput}
              placeholder="Search"
              onChange={(e) => handleSearchInputChange(e.target.value)}
            />
          </div>

          {/* filter category checkbox */}
          <div className={styles.group}>
            <div className={styles.title}>Category</div>
            <div className={styles.cbgroup}>
              <input
                className={styles.checkbox}
                type="radio"
                id="all"
                value=""
                checked={selectedCategory === ""}
                onChange={handleChange}
              />
              <label className={styles.label} htmlFor="all">
                All
              </label>
            </div>
            {categories?.map((category) => (
              <div className={styles.cbgroup} key={category.id}>
                <input
                  className={styles.checkbox}
                  type="radio"
                  id={category.name}
                  value={category.name}
                  checked={selectedCategory === category.name}
                  onChange={handleChange}
                />
                <label className={styles.label} htmlFor={category.name}>
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* RIGHT */}
        <div className={styles.right}>{content}</div>
      </div>
    </div>
  );
};
export default EngItems;

// {[...Array(1)].map((_, i) => (
//   <div className={styles.item} key={i}>
//     <div className={styles.itemImg}>
//       <img src="https://picsum.photos/200/300" alt="" className={styles.image} />

//       <div className={styles.itemInfo}>
//         <div className={styles.itemName}>Item Name</div>

//         <div className={styles.itemBtns}>
//           {/* {i % 2 == 0 ? <button className={styles.itemBtn}>Request</button> : null} */}
//           <button
//             className={styles.itemBtn}
//             onClick={() => navigate("/me/items/7d3ae941-af93-4755-8f69-bbcbc5df1a3f")}
//           >
//             View
//           </button>
//         </div>
//       </div>
//     </div>
//     {i % 2 != 0 ? <div className={styles.outofstock}>Out of Stock</div> : null}
//   </div>
// ))}
