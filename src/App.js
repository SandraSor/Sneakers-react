import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import axios from "axios";

import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import AppContext from "./context";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpended] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // fetch("https://63f49d7f55677ef68bbfe009.mockapi.io/items")
    //   .then((res) => res.json())
    //   .then((json) => setItems(json))
    //   .catch((error) => console.log(error));
    async function fetchData() {
      // const cartResponse = await axios.get(
      //   "https://63f49d7f55677ef68bbfe009.mockapi.io/cart"
      // );
      const cartResponse = await axios.get("http://localhost:3001/cart");
      const favoriteResponse = await axios
        // .get("https://63f49d7f55677ef68bbfe009.mockapi.io/favorites")
        // .get("https://63f49d7f55677ef68bbfe009.mockapi.io/cart");
        .get("http://localhost:3001/favorites");

      const itemsResponse = await axios.get("http://localhost:3001/items");
      // const itemsResponse = await axios.get(
      //   "https://63f49d7f55677ef68bbfe009.mockapi.io/items"
      // );

      setIsLoading(false);

      setItems(itemsResponse.data);
      setCartItems(cartResponse.data);
      setFavorites(favoriteResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    console.log(obj);
    try {
      if (cartItems.find((item) => +item.id === +obj.id)) {
        axios.delete(`http://localhost:3001/cart/${obj.id}`);
        // axios.delete(
        //   `https://63f49d7f55677ef68bbfe009.mockapi.io/cart/${obj.id}`
        // );
        setCartItems((prev) => prev.filter((item) => +item.id !== +obj.id));
      } else {
        axios.post("http://localhost:3001/cart", obj);
        // axios.post("https://63f49d7f55677ef68bbfe009.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Error");
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`);
    // axios.delete(`https://63f49d7f55677ef68bbfe009.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onFavoriteToCart = async (obj) => {
    try {
      if (favorites.find((obj1) => +obj1.id === +obj.id)) {
        axios.delete(`http://localhost:3001/favorites/${obj.id}`);
        // axios.delete(
        //   `https://63f49d7f55677ef68bbfe009.mockapi.io/cart/${obj.id}`
        // );
        setFavorites((prev) => prev.filter((item) => +item.id !== +obj.id));
      } else {
        const { data } = await axios.post(
          "http://localhost:3001/favorites",
          obj
        );
        // const { data } = await axios.post(
        //   "https://63f49d7f55677ef68bbfe009.mockapi.io/cart",
        //   obj
        // );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("Error");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => +obj.id === +id);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        isItemAdded,
        setCartOpended,
        setCartItems,
      }}
    >
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
                  cartItems={cartItems}
                  favorites={favorites}
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  isLoading={isLoading}
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
                  isLoading={isLoading}
                  onFavoriteToCart={onFavoriteToCart}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

export default App;
