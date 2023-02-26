import { useState, useEffect, useContext } from 'react';
import Card from './../components/Card/Card';
// import AppContext from './../context';
import axios from 'axios';
import AppContext from '../context';

const Orders = () => {
	// const { orders } = useContext(AppContext);
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const { favorites, onAddToCart, onFavoriteToCart } = useContext(AppContext);

	useEffect(() => {
		async function fetchOrders() {
			try {
				const { data } = await axios.get('http://localhost:3001/orders');
				// console.log(data.map((obj) => obj.items).flat());
				console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []));
				setIsLoading(false);
				setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
			} catch (error) {
				alert('Не загружен список заказов');
			}
		}
		fetchOrders();
	}, []);

	const renderItems = () => {
		const emptyArray = new Array(12).fill(1);

		return (isLoading ? emptyArray : orders).map((item) => (
			<Card
				key={item.id}
				id={item.id}
				// favorite={favorites.some((obj) => +obj.id === +item.id)}
				loading={isLoading}
				// onPlus={(obj) => onAddToCart(obj)}
				// onFavorites={(obj) => onFavoriteToCart(obj)}
				{...item}
			/>
		));
	};

	return (
		<div className='content p-40'>
			<div className='mb-40 d-flex align-center justify-between'>
				<h1>Мои покупки</h1>
			</div>

			<div className='d-flex flex-wrap'>{renderItems()}</div>
		</div>
	);
};

export default Orders;
