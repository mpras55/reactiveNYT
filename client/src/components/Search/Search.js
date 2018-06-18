import React, { Component } from "react";
import DeleteBtn from "./../DeleteBtn";
// import Jumbotron from "./../Jumbotron";
import Minitron from "./../Minitron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "./../Grid";
import { List, ListItem } from "./../List";
import { Input, FormBtn } from "./../Form";

class Search extends Component {
	state = {
		news: [],
		topic: "",
		startYear: "",
		endYear: ""
	};

	componentDidMount() {
		this.loadNews();
	}

	loadNews = () => {
		let startDate = this.state.startYear + "0101";
		let endDate = this.state.endYear + "1231";
		API.getNews(this.state.topic, startDate, endDate)
			.then(res =>
				console.log(res)
				// this.setState({ news: res.data, topic: "", startYear: "", endYear: "" })
			)
			.catch(err => console.log(err));
	};

	deleteBook = id => {
		API.deleteBook(id)
			.then(res => this.loadNews())
			.catch(err => console.log(err));
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.topic && this.state.startYear && this.state.endYear) {
			let startDate = this.state.startYear + "0101";
			let endDate = this.state.endYear + "1231";

			API.getNews(
				this.state.topic, startDate, endDate)
				.then(res =>
					// console.log(res.data.response.docs)
					this.setState({ news: res.data.response.docs, topic: "", startYear: "", endYear: "" })
				)
				.catch(err => console.log(err));
		}
	};

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="md-6 sm-12">
						<Minitron>
							<h1>Search</h1>
						</Minitron>
						<form>
							<Input
								value={this.state.topic}
								onChange={this.handleInputChange}
								name="topic"
								placeholder="Topic (required)"
							/>
							<Input
								value={this.state.startYear}
								onChange={this.handleInputChange}
								name="startYear"
								placeholder="Start Year - YYYY (required)"
							/>
							<Input
								value={this.state.endYear}
								onChange={this.handleInputChange}
								name="endYear"
								placeholder="End Year - YYYY (required)"
							/>
							<FormBtn
								disabled={!(this.state.topic && this.state.startYear && this.state.endYear)}
								onClick={this.handleFormSubmit}
							>
								Search
							</FormBtn>
						</form>
					</Col>
					<Col size="md-6 sm-12">
						<Minitron>
							<h1>Results</h1>
						</Minitron>
						{this.state.news.length ? (
							<List>
								{this.state.news.map(news1 => (
									<ListItem key={news1.web_url}>
											<strong>
												{news1.headline.main} 
												<br/> 
												Published: {news1.pub_date}
											</strong>
										<DeleteBtn onClick={() => this.deleteBook(news1._id)} />
									</ListItem>
								))}
							</List>
						) : (
								<h3>No Results to Display</h3>
							)}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Search;
