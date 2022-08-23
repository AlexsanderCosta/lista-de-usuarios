import { useState, useEffect } from 'react'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Box, Container, ListItemIcon, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CommentIcon from '@mui/icons-material/Comment';




const App = (props : any) => {

	const [page,setPage] = useState(0);
	const [mainUser,setMainUser] = useState(0);
	const [mainPost, setMainPost] = useState(0);

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
								<IconButton color="primary" aria-label="upload picture" component="label" onClick={() => {setPage(1); setMainUser(user.id)}}>
        						<ListAltIcon />
      							</IconButton>
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
						</ListItem>
					))}
				</List>
			</Box>

		)
	}

	const PageUserPost = () => {
		const [posts, setPosts] = useState([
			{userId: 0, id: 0, title: "Carregando...", body: "Carregando..."}

		]);

		const [users, setUsers] = useState([
			{ id: 1, name: "Nome 1" },
		]);

		useEffect(() => {
			fetch("https://jsonplaceholder.typicode.com/users/")
				.then((response) => response.json())
				.then((json) => {setUsers(json); setLoading(false)});
		});

		const [loading, setLoading] = useState(true);

		var theUser = users.find(user => {return user.id === mainUser;})
		if (theUser === undefined) {theUser = {id: 1, name: "noname"}}


		useEffect(() => {
			fetch("https://jsonplaceholder.typicode.com/users/"+ (theUser!).id +"/posts")
				.then((response) => response.json())
				.then((json) => {setPosts(json); setLoading(false)});
		});
		 

		return (
			<Box >
				<List>
					{posts.map((post) => (
						<ListItem >
							<Box sx={{backgroundColor: "rgba(148, 42, 148, 0.815)", color: "white", mx: "200px", textAlign: "left", p: "10px", pt:"1px", borderRadius: "10px"}}>
								<h2>{(theUser!).name}</h2>
								<h3>{post.title}</h3>
								<Typography>{post.body}</Typography>
								<IconButton color="primary" aria-label="comment" component="label" onClick={() => {setPage(3); setMainPost(post.id)}}>
        						<CommentIcon />
      							</IconButton>
							</Box>
						</ListItem>
					))}
				</List>
			</Box>

		)
		

	}

	const PageUserComents = () => {
		const [comments, setComments] = useState ([
			{ postId: 1, id: 1, name: "nome", email: "email@gmail.com", body: "comment" },
		]);

		const [loading, setLoading] = useState(true);

		useEffect(() => {
			fetch("https://jsonplaceholder.typicode.com/users/"+ mainUser +"/comments")
				.then((response) => response.json())
				.then((json) => {setComments(json); setLoading(false)});
		});

		var commentsPost = comments.filter( comment => {return comment.postId === mainPost;})

		return (
			<Box>
				<List>
					{commentsPost.map((comment) => (
						<ListItem>
							<Box>
							<h2>{comment.name}</h2>
							<h3>{comment.email}</h3>
							<h3>{comment.body}</h3>
							</Box>
						</ListItem>
					))}
				</List>
				<h1>sgha</h1>
				<h2>{mainPost}</h2>
			</Box>
			
		)
	}


	//O que você decide ver
	const PageDisplay = (props : any) => {
		if 		(page == 0) {return <PageUsersList/>;}
		else if (page == 1) {return <PageUserTasks/>;}
		else if (page == 2) {return <PageUserPost/>;}
		else if (page == 3) {return <PageUserComents/>;}

		return <h1>ERRO 404</h1>;
	}

	//Oque você vê
	return (  
			<Box>
			<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
			<Toolbar>
				<IconButton
				size="large"
				edge="start"
				color="inherit"
				aria-label="menu"
				sx={{ mr: 2 }}
				>
				<MenuIcon />
				</IconButton>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
				Site
				</Typography>
				<Button color="inherit">Login</Button>
				<Button color="inherit">Log Out</Button>
			</Toolbar>
			</AppBar>
		</Box>
		<PageDisplay/>
		</Box>
	);
};

export default App
