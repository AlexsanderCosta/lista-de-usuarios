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
import ListAltIcon from '@mui/icons-material/ListAlt';
import CommentIcon from '@mui/icons-material/Comment';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




const App = (props : any) => {

	const [page,setPage] = useState(4);
	const [mainUser,setMainUser] = useState(0);
	const [mainPost, setMainPost] = useState(0);
	const [logado, setLogado] = useState(false);

	const PagePrevious = () => {
		if 		(page == 0) {}
		else if (page == 1) {setPage(0);}
		else if (page == 2) {setPage(0);}
		else if (page == 3) {setPage(2);}
		else if (page == 4) {}
		else if (page == 5) {}	
	}

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
						<ListItem disablePadding style={{backgroundColor: "rgba(80, 3, 100, 1)"}} sx={{my: "15px", px: "20px", py: "10px", borderRadius: "10px"}}>
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
							<Box sx={{backgroundColor: "rgb(80, 3, 100);", color: "white", mx: "200px", textAlign: "left", p: "10px", pt:"1px", borderRadius: "10px"}}>
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
							<Box sx={{backgroundColor: "rgba(148, 42, 148, 0.815)", color: "white", mx: "200px", textAlign: "left", p: "10px", pt:"1px", borderRadius: "10px"}}>
							<h2>{comment.name}</h2>
							<h3>{comment.email}</h3>
							<h3>{comment.body}</h3>
							</Box>
						</ListItem>
					))}
				</List>
			</Box>
			
		)
	}

	const PageLogin = () => {
		return (
			<Box sx = {{color: "white", fontFamily: "Candara"} }>
				
				<Box sx = {{color: "white", display:"grid", px:"400px", mt:"200px"}} >
					<h1>Our.Site</h1>
					<TextField label="E-mail" id="outlined-size-small" size="small" 
					sx={{		
								input:{color:"white"},
								label:{color:"white"},
								'& label.Mui-focused' :{color:"white", borderColor:"white"},
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderColor: "white",
									},
									'&:hover fieldset': {
										borderColor: "white",
									},
									'&.Mui-focused fieldset': {
										borderColor: "white",
									},
								}
					}}/>
        			<TextField label="Senha" id="outlined-size-small" style={{}} size="small" sx={{
							pt:"20px",
                            input:{color:"white"},
                            label:{color:"white", pt:"20px"},
                            '& label.Mui-focused' :{color:"white", borderColor:"white"},
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: "white",
                                  },
                                  '&:hover fieldset': {
                                    borderColor: "white",
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: "white",
                                  },
                            }
                        }}/>
				<Button variant="contained" sx = {{backgroundColor: "rgba(148, 42, 148, 0.815)", color: "white", mt:"20px"}} onClick={() => {setPage(0); setLogado(true)}}>Login</Button>
				<Typography sx = {{color:"white", mt:"20px"}}>Não tem conta? </Typography><Link sx = {{color:"#00bcd4", mt:"20px"}} onClick={()=>{setPage(5)}}> Cadastre-se!</Link>
				</Box>
      		</Box>
		)
	}

	const PageCadastrar = () => {
		return (
			<Box sx = {{color: "white", fontFamily: "Candara"} }>
				
				<Box sx = {{color: "white", display:"grid", px:"400px", mt:"200px"}} >
					<h1>Our.Site</h1>
					<TextField label="E-mail" id="outlined-size-small" size="small" 
					sx={{		
								input:{color:"white"},
								label:{color:"white"},
								'& label.Mui-focused' :{color:"white", borderColor:"white"},
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										borderColor: "white",
									},
									'&:hover fieldset': {
										borderColor: "white",
									},
									'&.Mui-focused fieldset': {
										borderColor: "white",
									},
								}
					}}/>
        			<TextField label="Senha" id="outlined-size-small" style={{}} size="small" sx={{
							pt:"20px",
                            input:{color:"white"},
                            label:{color:"white", pt:"20px"},
                            '& label.Mui-focused' :{color:"white", borderColor:"white"},
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: "white",
                                  },
                                  '&:hover fieldset': {
                                    borderColor: "white",
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: "white",
                                  },
                            }
                        }}/>
				<Button variant="contained" sx = {{backgroundColor: "rgba(148, 42, 148, 0.815)", color: "white", mt:"20px"}} onClick={() => {setPage(0); setLogado(true)}}>Cadastrar</Button>
				<Typography sx = {{color:"white", mt:"20px"}}>Não tem conta? </Typography><Link sx = {{color:"#00bcd4", mt:"20px"}} onClick={()=>{setPage(4)}}> Faça login!</Link>
				</Box>
      		</Box>
		)
	}


	//O que você decide ver
	const PageDisplay = (props : any) => {
		if 		(page == 0) {return <PageUsersList/>;}
		else if (page == 1) {return <PageUserTasks/>;}
		else if (page == 2) {return <PageUserPost/>;}
		else if (page == 3) {return <PageUserComents/>;}
		else if (page == 4) {return <PageLogin/>;}
		else if (page == 5) {return <PageCadastrar/>;}		

		return <h1>ERRO 404</h1>;
	}

	const NavBar = () => {
		if (logado === true) {
			return (
				<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static"  sx={{backgroundColor: "rgba(148, 42, 148, 0.815)", color: "white"}}>
				<Toolbar>
					<a href="#" style={{color: "white"}}>
					<ArrowBackIcon onClick={() => {PagePrevious();}}></ArrowBackIcon>
					</a>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					Meu Web Site
					</Typography>
					<Button color="inherit" onClick={() => {setPage(4); setLogado(false)}}>Log Out</Button>
				</Toolbar>
				</AppBar>
			</Box>
			)
		}
		else {return <></>;}
	}


	//Oque você vê
	return (  
		<Box>
			<NavBar/>
			<PageDisplay/>
		</Box>
	);
};

export default App
