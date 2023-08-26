import { useEffect, useState } from "react";
import "./App.css";
import CategoryList from "./CategoryList/categoryList";
import Header from "./Header/header";
import axios from "./axios";
import Loader from "./Loader/loader";
import FastFoodList from "./FastFoodList/fastFoodList";
import notFound from "./assets/images/404.png";
function App() {
  const [loading, setLoading] = useState(false);
  const [fastFoodItems, setFastFoods] = useState([]);

  // const[categories,,loading]  = useAxios({
  //   method: "get",
  //   url: "/list",
  // });
  const fetchData = async (categoryId = null) => {
    setLoading(true);
    const response = await axios.get(
      `/fastFood/list?${categoryId ? "categoryId=" + categoryId : ""}`
    );
    setFastFoods(response.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const filterItems = (categoryId) => {
    fetchData(categoryId);
  };
  const renderContent = () => {
    if (loading) {
      return <Loader theme="dark" />;
    }
    if (fastFoodItems.length === 0) {
      return (
        <>
          <div className="alert alert-warning text-center">
            برای کلید واژه فوق هیچ آیتمی یافت نشد!
          </div>
          <img
            src={notFound}
            alt="notFound"
            className="mx-auto mt-5 d-block fade-in-horiz"
          />
        </>
      );
    }
    return <FastFoodList fastFoodItems={fastFoodItems} />;
  };
  const searchItems = async (term) => {
    setLoading(true);
    const response = await axios.get(
      `/fastFood/search/${term ? "?term=" + term : ""}`
    );
    setLoading(false);
    setFastFoods(response.data);
  };
  return (
    <div className="wrapper">
      <Header></Header>
      <CategoryList
        filterItems={filterItems}
        searchItems={searchItems}
      ></CategoryList>
      <div className="container mt-4">{renderContent()}</div>
    </div>
  );
}

export default App;
