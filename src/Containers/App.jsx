import React, { Component } from 'react';
import CardList from '../Component/CardList';
import SearchBox from '../Component/SearchBox';
import Scroll from '../Component/Scroll';
import ErrorBoundry from '../Component/ErrorBoundry';
import './App.css';

class App extends Component {

	constructor() {
		super()
		this.state = {
			robots:[],
			searchfield: ''
		}
		//console.log('constructor')
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response=> response.json())
		.then(users => this.setState({robots: users}));
		//console.log('mount')
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value})
	}

	render() {
		const {robots, searchfield} = this.state;
		const filtredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		})
		return !robots.length ?
			<h2> Loading...</h2> :
		(
			<div className='tc'>
				<h1 className='f1'>Robo-NFTS</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<ErrorBoundry>
						<CardList robots={filtredRobots}/>
					</ErrorBoundry>	

				</Scroll>
			</div>	
			)

	}
}

export default App;