import React, {
	useState,
	useEffect,
} from "react";
import "./App.css";
import { GiShoppingBag } from "react-icons/gi";
import RatingStars from "./Components/ratingStars";
import ShoppingCart from "./Components/shoppingCart";


const products = [
	{
		id: 1,
		name: "Akimbo Storage Cabinet",
		rating: 4.3,
		description:"Stylish storage solution with a unique akimbo-inspired design.",
    price: 6299,
		image: require("./Assets/product-1.jpg"),
	},
	{
		id: 2,
		name: "Purr-fect Tea Time",
		rating: 4.2,
		description:"Embrace whimsical charm, featuring an adorable cat holding aloft a sleek surface for your teapot and treats.",
		price: 2099,
		image: require("./Assets/product-2.jpg"),
	},
	{
		id: 3,
		name: "SnuggleBears Cozy Teddy Bed",
		rating: 3.2,
		description:"Ideal for furry naps, our SnuggleBears bed features plush teddy fabric for ultimate comfort.",
		price: 2399,
		image: require("./Assets/product-3.jpg"),
	},
	{
		id: 4,
		name: "QuackQuack Duck Cupboard",
		rating: 4.2,
		description:"Charming duck-shaped handles adorn this practical storage solution.",
		price: 4699,
		image: require("./Assets/product-4.jpg"),
	},
	{
		id: 5,
		name: "TeddyBear Reflective Charm Mirror",
		rating: 4.5,
		description:"Whimsically designed mirror featuring a charming teddy motif.",
		price: 1499,
		image: require("./Assets/product-5.jpg"),
	},
	{
		id: 6,
		name: "TeddyTrove Bedside Buddy",
		rating: 3.8,
		description:" Adorable bedside table with a cuddly teddy bear design.",
		price: 2899,
		image: require("./Assets/product-6.jpg"),
	},
  {
		id: 7,
		name: "CocoComfort Coconut Chair",
		rating: 3.2,
		description:" Tropical-inspired seating for ultimate relaxation.",
		price: 3499,
		image: require("./Assets/product-7.jpg"),
	},
  {
		id: 8,
		name: "Poppin' Popcorn Sofa",
		rating: 4.2,
		description:" A fun and cozy seating option perfect for movie nights and lounging.",
		price: 15699,
		image: require("./Assets/product-8.jpg"),
	},
];

function App() {
	const [cartsVisibilty, setCartVisible] = useState(false);
	const [productsInCart, setProducts] =useState(JSON.parse(localStorage.getItem("shopping-cart")) || []);
  const [searchQuery, setSearchQuery] = useState("");
	useEffect(() => {localStorage.setItem("shopping-cart",JSON.stringify(productsInCart));}, [productsInCart]);
	const addProductToCart = (product) => {
		const newProduct = {
			...product,
			count: 1,
		};
		setProducts([
			...productsInCart,
			newProduct,
		]);
	};

	const onQuantityChange = (
		productId,
		count
	) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === productId
				);
			if (productsIndex !== -1) {
				oldState[productsIndex].count =
					count;
			}
			return [...oldState];
		});
	};

	const onProductRemove = (product) => {
		setProducts((oldState) => {
			const productsIndex =
				oldState.findIndex(
					(item) =>
						item.id === product.id
				);
			if (productsIndex !== -1) {
				oldState.splice(productsIndex, 1);
			}
			return [...oldState];
		});
	};

	return (
		<div className="App">
			<ShoppingCart
				visibilty={cartsVisibilty}
				products={productsInCart}
				onClose={() =>
					setCartVisible(false)
				}
				onQuantityChange={
					onQuantityChange
				}
				onProductRemove={onProductRemove}
			/>
			<div className="navbar">
				<h3 className="logo">Dream Décor</h3>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p"
        />
				<button
					className="btn shopping-cart-btn"
					onClick={() =>
						setCartVisible(true)
					}>
				  <GiShoppingBag size={24} />
					{productsInCart.length >0 && (
						<span className="product-count">
							{
								productsInCart.length
							}
						</span>
					)}
				</button>
			</div>
			<main>
				<h2 className="title">
					Products
				</h2>
				<div className="products">
					{products.map((product) => (
						<div
							className="product"
							key={product.id}>
							<img
								className="product-image"
								src={
                  product.image
								}
								alt={
									product.image
								}
							/>
							<h4 className="product-name">
								{product.name}
							</h4>
							<RatingStars
								rating={
									product.rating
								}
							/>
							<p>
								{
									product.description
								}
							</p>
							<span className="product-price">
                ₹{product.price}
							</span>
							<div className="buttons">
								<button className="btn">Detail</button>
								<button className="btn" onClick={() => addProductToCart(product)}>Add to cart</button>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
}

export default App;