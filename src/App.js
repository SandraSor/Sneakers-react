import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import axios from 'axios';

import Drawer from './components/Drawer/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';

function App() {
	const [items, setItems] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [cartOpened, setCartOpened] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// fetch("https://63f49d7f55677ef68bbfe009.mockapi.io/items")
		//   .then((res) => res.json())
		//   .then((json) => setItems(json))
		//   .catch((error) => console.log(error));

		async function fetchData() {
			try {
				const [cartResponse, favoriteResponse, itemsResponse] =
					await Promise.all([
						axios.get('http://localhost:3001/cart'),
						axios.get('http://localhost:3001/favorites'),
						axios.get('http://localhost:3001/items'),
					]);

				// const cartResponse = await axios.get('http://localhost:3001/cart');
				// const favoriteResponse = await axios.get(
				// 	'http://localhost:3001/favorites'
				// );
				// const itemsResponse = await axios.get('http://localhost:3001/items');

				setIsLoading(false);

				setItems(itemsResponse.data);
				setCartItems(cartResponse.data);
				setFavorites(favoriteResponse.data);
			} catch (error) {
				alert('Ошибка при загрузке данных');
			}
		}

		fetchData();
	}, []);

	const onAddToCart = async (obj) => {
		try {
			if (cartItems.find((item) => +item.id === +obj.id)) {
				setCartItems((prev) => prev.filter((item) => +item.id !== +obj.id));
				await axios.delete(`http://localhost:3001/cart/${obj.id}`);
			} else {
				await axios.post('http://localhost:3001/cart', obj);
				setCartItems((prev) => [...prev, obj]);
			}
		} catch (error) {
			alert('Ошибка при добавлении в корзину');
			console.error(error);
		}
	};

	const onRemoveItem = async (id) => {
		try {
			setCartItems((prev) => prev.filter((item) => item.id !== id));
			await axios.delete(`http://localhost:3001/cart/${id}`);
		} catch (error) {
			alert('Ошибка при удалении из корзины');
			console.error(error);
		}
	};

	const onFavoriteToCart = async (obj) => {
		try {
			if (favorites.find((obj1) => +obj1.id === +obj.id)) {
				setFavorites((prev) => prev.filter((item) => +item.id !== +obj.id));
				await axios.delete(`http://localhost:3001/favorites/${obj.id}`);
			} else {
				const { data } = await axios.post(
					'http://localhost:3001/favorites',
					obj
				);
				setFavorites((prev) => [...prev, data]);
			}
		} catch (error) {
			alert('Ошибка при добавлении в избранное');
			console.error(error);
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
				onAddToCart,
				onFavoriteToCart,
				isItemAdded,
				setCartOpened,
				setCartItems,
			}}
		>
			<div className='wrapper clear'>
				<Router>
					<Drawer
						items={cartItems}
						onClose={() => setCartOpened(false)}
						onRemove={onRemoveItem}
						opened={cartOpened}
					/>
					<Header onClickCart={() => setCartOpened(true)} />
					<Routes>
						<Route
							path='/'
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
							path='/favorites'
							element={
								<Favorites
									isLoading={isLoading}
									onFavoriteToCart={onFavoriteToCart}
								/>
							}
						></Route>
						<Route
							path='/orders'
							element={
								<Orders
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
