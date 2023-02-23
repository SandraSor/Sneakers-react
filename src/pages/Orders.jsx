import Card from "./../components/Card/Card";

const Orders = () => {
  return (
    <div className="content p-40">
      <div className="mb-40 d-flex align-center justify-between">
        <h1>Мои покупки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {items.map((item) => (
          <Card
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            imgUrl={item.imgUrl}
            favorite={true}
            // onPlus={onAddToCart}
            onFavorites={onFavoriteToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
