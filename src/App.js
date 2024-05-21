import './App.css';
import { useEffect, useState } from 'react';

function App() {

	let x = GetAllData();

	return (
		<>
			<h1>Spring boot!</h1>
			<GetAllData />
		</>
	);
}

function GetAllData() {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch('http://localhost:8080');
			const jsonData = await response.json();
			setPosts(jsonData);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	console.log(posts);

	return <>{posts.id}</>
}

export default App;
