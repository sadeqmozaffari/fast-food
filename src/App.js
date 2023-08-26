import { useEffect, useState } from "react";
import "./App.css";
import CategoryList from "./CategoryList/categoryList";
import Header from "./Header/header";
import axios from "./axios";
import Loader from "./Loader/loader";
import FastFoodList from "./FastFoodList/fastFoodList";
function App() {
  const [loading, setLoading] = useState(false);
  const [fastFoodItems, setFastFoods] = useState([]);

  const fetchData = async (categoryId = null) => {
    setLoading(true);
    const response = await axios.get(
      `/fastFood/list/${categoryId ? "categoryId=" + categoryId : ""}`
    );
    setFastFoods(response.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Loader theme="dark" />;
    }
    return <FastFoodList fastFoodItems={fastFoodItems} />;
  };
  return (
    <div className="wrapper">
      <Header></Header>
      <CategoryList></CategoryList>
      <div className="container mt-4">{renderContent()}</div>
    </div>
  );
}

export default App;
