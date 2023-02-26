import { useContext } from 'react';
import Card from './../components/Card/Card';
import AppContext from './../context';

const Favorites = ({ isLoading, onFavoriteToCart }) => {
	const { favorites } = useContext(AppContext);

	return (
		<div className='content p-40'>
			<div className='mb-40 d-flex align-center justify-between'>
				<h1>Мои закладки</h1>
			</div>

			<div className='d-flex flex-wrap'>
				{favorites.map((item) => (
					<Card
						key={item.id}
						id={item.id}
						title={item.title}
						price={item.price}
						imgUrl={item.imgUrl}
						favorite={true}
						loading={isLoading}
						// onPlus={onAddToCart}
						onFavorites={onFavoriteToCart}
					/>
				))}
			</div>
		</div>
	);
};

export default Favorites;
