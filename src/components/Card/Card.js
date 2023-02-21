import React, { useState } from "react";
import styles from "./Card.module.scss";

const Card = ({ id, title, price, imgUrl, onPlus, onFavorites, favorite }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(favorite);

  const onClickPlus = () => {
    onPlus({ title, price, imgUrl });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorites({ id, title, price, imgUrl });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {/* <div className={styles.favorite} onClick={props.onClickFavorite}>
        <img src="/img/heart_un.svg" alt="Unliked" />
      </div> */}

      <img
        className={styles.favorite}
        onClick={onClickFavorite}
        src={isFavorite ? "/img/heart_like.svg" : "/img/heart_un.svg"}
        alt="Unliked"
      />

      <img width={133} height={112} src={imgUrl} />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isAdded ? "/img/btn-added.svg" : "/img/btn-plus.svg"}
          alt="Plus"
        />
        {/* <button className="button" onClick={() => props.onPlus(props.price)}>
          <img width={11} height={11} src="/img/plus.svg" alt="Plus" />
        </button> */}
      </div>
    </div>
  );
};

export default Card;
