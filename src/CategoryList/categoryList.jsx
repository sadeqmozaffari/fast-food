import { useEffect, useState } from "react";
import axios from "../axios";
import Loader from "../Loader/loader";
import SearchBar from "../SearchBar/searchBar";
const CategoryList = ({ filterItems, searchItems }) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("/foodCategory/categories");
      setCategories(response.data);
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }
    return (
      <div className="ps-3 w-100 d-flex align-items-center justify-content-between gap-5">
        <ul className="nav">
          <li className="nav-item " onClick={() => filterItems()}>
            <a className="nav-link" href="#">
              همه فست فودها
            </a>
          </li>
          {categories.map((item) => (
            <li
              className="nav-item"
              key={item.id}
              onClick={() => filterItems(item.id)}
            >
              <a className="nav-link" href="#">
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <SearchBar searchItems={searchItems} />
      </div>
    );
  };
  return (
    <nav className="container mt-n5">
      <div
        className="bg-white rounded-3 shadow-lg py-4  d-flex align-items-center m-auto"
        style={{ height: "80px" }}
      >
        {renderContent()}
      </div>
    </nav>
  );
};

export default CategoryList;
