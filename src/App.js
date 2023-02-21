import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import axios from "axios";

import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpended] = useState(false);

  useEffect(() => {
    // fetch("https://63f49d7f55677ef68bbfe009.mockapi.io/items")
    //   .then((res) => res.json())
    //   .then((json) => setItems(json))
    //   .catch((error) => console.log(error));
    axios
      .get("https://63f49d7f55677ef68bbfe009.mockapi.io/items")
      .then((res) => setItems(res.data));
    axios
      .get("https://63f49d7f55677ef68bbfe009.mockapi.io/cart")
      .then((res) => setCartItems(res.data));
    axios
      // .get("https://63f49d7f55677ef68bbfe009.mockapi.io/favorites")
      .get("https://63f49d7f55677ef68bbfe009.mockapi.io/cart")
      .then((res) => setFavorites(res.data));
  }, []);

  const onAddToCart = (obj) => {
    axios.post("https://63f49d7f55677ef68bbfe009.mockapi.io/cart", obj);
    setCartItems((prev) => [...prev, obj]);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63f49d7f55677ef68bbfe009.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onFavoriteToCart = async (obj) => {
    try {
      if (favorites.find((obj1) => obj1.id === obj.id)) {
        axios.delete(
          `https://63f49d7f55677ef68bbfe009.mockapi.io/cart/${obj.id}`
        );
        // setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        const { data } = await axios.post(
          "https://63f49d7f55677ef68bbfe009.mockapi.io/cart",
          obj
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Error");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      <Router>
        <Drawer
          items={cartItems}
          onClose={() => setCartOpended(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />
        <Header onClickCart={() => setCartOpended(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                items={items}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                onFavoriteToCart={onFavoriteToCart}
              />
            }
          ></Route>
          <Route
            path="/favorites"
            element={
              <Favorites
                items={favorites}
                onFavoriteToCart={onFavoriteToCart}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
