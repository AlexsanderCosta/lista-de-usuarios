import { useState, useEffect } from 'react'
import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box, Container } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const App = (props:any) => {

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

	const PageUserTasks = () => {

		const [loading, setLoading] = useState(true);

		const [users, setUsers] = useState([
			{ id: 1, name: "Nome 1" },
			{ id: 2, name: "Nome 2" },
			{ id: 3, name: "Nome 3" },
			{ id: 4, name: "Nome 4" },
		]);

		const [tasks, setTasks] = useState([
			{userId: 0, id: 0, title: "Carregando", completed: false},
		]);

		var theUser = users.find(user => {return user.id === mainUser;})
		if (theUser === undefined) {theUser = {id: 0, name: "noname"}}

		useEffect(() => {
			fetch("https://jsonplaceholder.typicode.com/users/")
				.then((response) => response.json())
				.then((json) => {setUsers(json); setLoading(false)});
		});

		useEffect(() => {
			fetch("https://jsonplaceholder.typicode.com/users/"+ (theUser!).id + "/todos")
				.then((response) => response.json())
				.then((json) => {setTasks(json); setLoading(false)});
		});

		return (
			<Box>
				<h1>{theUser.name}</h1>
				<List>
					{tasks.map((task) => (
						<ListItem disablePadding>
							<ListItemText primary={task.title} />
							<CheckIcon />
					</ListItem>))}
				</List>
			</Box>

		)
	}

	//O que você decide ver
	const PageDisplay = (props : any) => {
		if 			(page == 0) {return <PageUsersList/>;}
		else if (page == 1) {return <PageUserTasks/>;}

		return <h1>ERRO 404</h1>;
	}

	//Oque você vê
	return (  
		<PageDisplay/>
	);
};

export default App
