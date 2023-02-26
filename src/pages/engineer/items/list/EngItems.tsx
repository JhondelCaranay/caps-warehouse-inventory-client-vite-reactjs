import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EngItems.module.scss";

const EngItems = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string[]>(["all"]);

  return (
    <div className={styles.engItems}>
      <div className={styles.wrapper}>
        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.group}>
            <div className={styles.title}>Name</div>
            <input type="text" />
          </div>

          {/* filter category checkbox */}
          <div className={styles.group}>
            <div className={styles.title}>Category</div>
            <div className={styles.cbgroup}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id="categoryall"
                name="categoryall"
                value="all"
              />
              <label className={styles.label} htmlFor="categoryall">
                All
              </label>
            </div>
            <div className={styles.cbgroup}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id="category1"
                name="category1"
                value="category1"
              />
              <label className={styles.label} htmlFor="category1">
                category1
              </label>
            </div>

            <div className={styles.cbgroup}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id="category2"
                name="category2"
                value="category2"
              />
              <label className={styles.label} htmlFor="category2">
                category2
              </label>
            </div>
          </div>

          <div className={styles.group}>
            <button className={styles.search}>Search</button>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          {/* ITEMS */}

          <h1 className={styles.title}>Items</h1>
          {/* ITEM */}
          <div className={styles.items}>
            {[...Array(8)].map((_, i) => (
              <div className={styles.item}>
                <div className={styles.itemImg}>
                  <img src="https://picsum.photos/200/300" alt="" className={styles.image} />

                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>Item Name</div>

                    <div className={styles.itemBtns}>
                      <button
                        className={styles.itemBtn}
                        onClick={() => navigate("/me/items/7d3ae941-af93-4755-8f69-bbcbc5df1a3f")}
                      >
                        View
                      </button>
                      {i % 2 == 0 ? <button className={styles.itemBtn}>Request</button> : null}
                    </div>
                  </div>
                </div>
                {i % 2 != 0 ? <div className={styles.outofstock}>Out of Stock</div> : null}
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            <div className={styles.button}>
              <NavigateBefore />
            </div>
            <div className={styles.button}>2</div>
            <div className={styles.button}>
              <NavigateNext />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EngItems;
