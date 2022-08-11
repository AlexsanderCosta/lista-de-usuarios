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
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';

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
			<Container className="App" style={{fontFamily: "Candara"}}>
				<h2>Lista de usuários</h2>
				<div className="card">
				{loading ? <h2>Carregando...</h2> : null}
				<ul>
					<List>
						{users.map((user) => (
							<ListItem disablePadding>
								<ListItemButton onClick={() => {setPage(2); setMainUser(user.id)}}>
									<ListItemAvatar>
										<Avatar  alt = {user.name} src="/static/images/avatar/1.jpg" style={{backgroundColor: "rgba(148, 42, 148, 0.815)"}}/>
									</ListItemAvatar>
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
			<Box style={{color: "white", fontFamily: "Candara",}}>
				<h1 style={{textAlign: "left"}}>{theUser.name}</h1>
				<List>
					{tasks.map((task) => (
						<ListItem disablePadding style={{backgroundColor: "rgba(148, 42, 148, 0.815)"}} sx={{my: "15px", px: "20px", py: "10px", borderRadius: "10px"}}>
							<ListItemText primary={task.title} />
							{task.completed ? <CheckIcon /> : <ClearIcon />}
					</ListItem>))}
				</List>
			</Box>

		)
	}

	const PageUserPost = () => {
		const [post, setPost] = useState(0);

		return (
			<h1>AaA</h1>
		)

	}

	//O que você decide ver
	const PageDisplay = (props : any) => {
		if 		(page == 0) {return <PageUsersList/>;}
		else if (page == 1) {return <PageUserTasks/>;}
		else if (page == 2) {return <PageUserPost/>;}

		return <h1>ERRO 404</h1>;
	}

	//Oque você vê
	return (  
		<PageDisplay/>
	);
};

export default App
