import { useState, useEffect } from 'react'
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CssBaseline from '@mui/material/CssBaseline';

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
        <div className="App" style={{backgroundColor: 'purple'}}>
			  <h1 style={{color: 'white', paddingTop: '100px', paddingLeft: '800px'}}>Lista de usuários</h1>
			  <div className="card" style={{color: 'white', backgroundColor: 'purple', padding: '50px'}}>
        {loading ? <h2>Carregando...</h2> : null}
				<ul bstyle={{backgroundColor: 'purple'}}>
					<List>
            {users.map((user) => (
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary={user.name} />
                </ListItemButton>
          </ListItem>))}
            </List>
            <React.Fragment>
          <CssBaseline />
        </React.Fragment>
				</ul>
			</div>
		</div>
	);
};

export default App;