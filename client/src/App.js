import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Books from "./pages/Books";
// import Detail from "./pages/Detail";
// import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import Search from "./components/Search";

const App = () => (
	<Router>
		<div>
			<Nav />
			<Jumbotron> 
				<h1> New York Times Article Scrubber </h1>
				<h2> Search for and annotate articles of interest!</h2>
			</Jumbotron>
			<Search/>
			{/* <Switch>
				<Route exact path="/" component={Books} />
				<Route exact path="/books" component={Books} />
				<Route exact path="/books/:id" component={Detail} />
				<Route component={NoMatch} />
			</Switch> */}
		</div>
	</Router>
);

export default App;
