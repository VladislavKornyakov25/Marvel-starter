import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import MarevelService from './services/MarvelService';

import './style/style.scss';

const marevelService = new MarevelService();
marevelService.getAllCharacters().then(res => {
	res.data.results.forEach(element => {
		console.log(element.name);
	});
});

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

