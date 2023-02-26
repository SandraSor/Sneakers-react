import React, { useState } from 'react';
import { useContext } from 'react';
import AppContext from './../../context';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';

const Card = ({
	id,
	title,
	price,
	imgUrl,
	onPlus,
	onFavorites,
	favorite = false,
	loading = false,
}) => {
	const { isItemAdded } = useContext(AppContext);
	const [isFavorite, setIsFavorite] = useState(favorite);

	const onClickPlus = () => {
		onPlus({ id, title, price, imgUrl });
	};

	const onClickFavorite = () => {
		onFavorites({ id, title, price, imgUrl });
		setIsFavorite(!isFavorite);
	};

	return (
		<div className={styles.card}>
			{loading ? (
				<ContentLoader
					speed={2}
					width={150}
					height={187}
					viewBox='0 0 150 187'
					backgroundColor='#f3f3f3'
					foregroundColor='#ecebeb'
				>
					<rect x='0' y='0' rx='10' ry='10' width='150' height='91' />
					<rect x='0' y='126' rx='3' ry='3' width='93' height='15' />
					<rect x='118' y='155' rx='8' ry='8' width='32' height='32' />
					<rect x='0' y='107' rx='3' ry='3' width='150' height='15' />
					<rect x='0' y='163' rx='8' ry='8' width='80' height='24' />
				</ContentLoader>
			) : (
				<>
					{onFavorites && (
						<img
							className={styles.favorite}
							onClick={onClickFavorite}
							src={isFavorite ? '/img/heart_like.svg' : '/img/heart_un.svg'}
							alt='Unliked'
						/>
					)}

					<img width='100%' height={135} src={imgUrl} alt='imgUrl' />
					<h5>{title}</h5>
					<div className='d-flex justify-between align-center'>
						<div className='d-flex flex-column'>
							<span>Цена:</span>
							<b>{price} руб.</b>
						</div>
						{onPlus && (
							<img
								className={styles.plus}
								onClick={onClickPlus}
								src={
									isItemAdded(id) ? '/img/btn-added.svg' : '/img/btn-plus.svg'
								}
								alt='Plus'
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Card;
