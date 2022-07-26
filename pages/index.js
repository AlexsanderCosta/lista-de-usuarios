import { useState, useEffect } from 'react'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


const App = (props) => {
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
		<div className="App">
			<h1>Lista de usuários</h1>
			<div className="card">
        {loading ? <h2>Carregando...</h2> : null}
				<ul>
        <img src="https://wallpaperaccess.com/full/303189.jpg" alt="" height="200" width="200"/>
					<List>
            {users.map((user) => (
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={user.name} />
                </ListItemButton>
          </ListItem>
            ))}
            </List>
            <React.Fragment>
          <CssBaseline />
          <Container fixed>
            <Box sx={{ bgcolor: '#000000', height: '100vh' }} />
          </Container>
        </React.Fragment>
				</ul>
			</div>
		</div>
	);
};

export default App;