import { useState, useEffect } from 'react'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Container } from '@mui/material';

const App = (props) => {

	const [page,setPage] = useState(0);
	const [mainUser,setMainUser] = useState(0);

	const PageUsersList = () => {

		const [users, setUsers] = useState([
			{ id: 1, name: "Nome 1" },
			{ id: 2, name: "Nome 2" },
			{ id: 3, name: "Nome 3" },
			{ id: 4, name: "Nome 4" },
		]);
		const [loading, setLoading] = useState(true);

		useEffect(() => {
			fetch("https://jsonplaceholder.typicode.com/users/")
				.then((response) => response.json())
				.then((json) => {setUsers(json); setLoading(false)});
		});
	
		return (
			<Container className="App">
				<h2>Lista de usuários</h2>
				<div className="card">
				{loading ? <h2>Carregando...</h2> : null}
				<ul>
					<List>
						{users.map((user) => (
							<ListItem disablePadding>
								<ListItemButton onClick={() => {setPage(1); setMainUser(user.id)}}>
									<ListItemText primary={user.name} />
								</ListItemButton>
					</ListItem>))}
						</List>
						<React.Fragment>
				</React.Fragment>
				</ul>
			</div>
		</Container>
		)
	}

	const PageUser = () => {

		const [loading, setLoading] = useState(true);

		const [users, setUsers] = useState([
			{ id: 1, name: "Nome 1" },
			{ id: 2, name: "Nome 2" },
			{ id: 3, name: "Nome 3" },
			{ id: 4, name: "Nome 4" },
		]);

		var theUser = users.find(user => {return user.id === mainUser;})
		if (theUser === undefined) {theUser = {id: 0, name: "noname"}}

		useEffect(() => {
			fetch("https://jsonplaceholder.typicode.com/users/")
				.then((response) => response.json())
				.then((json) => {setUsers(json); setLoading(false)});
		});

		return (
			<h1>{theUser.name}</h1>
		)
	}

	//O que você decide ver
	const PageDisplay = (props : any) => {
		if 			(page == 0) {return <PageUsersList/>;}
		else if (page == 1) {return <PageUser/>;}

		return <h1>ERRO 404</h1>;
	}

	//Oque você vê
	return (  
		<PageDisplay/>
	);
};

export default App
