import React from "react";

import Card from "./../components/Card/Card";

function Home({
  items,
  cartItems,
  favorites,
  isLoading,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToCart,
  onFavoriteToCart,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    const emptyArray = new Array(12).fill(1);
    return (isLoading ? emptyArray : filtredItems).map((item) => (
      <Card
        key={item.id}
        id={item.id}
        favorite={favorites.some((obj) => +obj.id === +item.id)}
        loading={isLoading}
        onPlus={(obj) => onAddToCart(obj)}
        onFavorites={(obj) => onFavoriteToCart(obj)}
        {...item}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="mb-40 d-flex align-center justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex align-center">
          <img width={15} height={15} src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear removeBtn"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;
