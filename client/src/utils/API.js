import axios from "axios";
import $ from "jquery";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const APIKEY = "29ce8207a7f5458aa41cd82e383630a5";
let APIURL = "";


export default {
// Call NYTimes API to GET data
	getNews: function(topic,startDate,endDate) {
		APIURL =  BASEURL + '?' + $.param({
			'api-key': APIKEY,
			'q': topic,
			'begin_date': startDate,
			'end_date': endDate,
			'fl': "pub_date,headline,web_url"
		});
    return axios.get(APIURL);
  },
	// Gets all books
	getBooks: function() {
		return axios.get("/api/books");
	},
	// Gets the book with the given id
	getBook: function(id) {
		return axios.get("/api/books/" + id);
	},
	// Deletes the book with the given id
	deleteBook: function(id) {
		return axios.delete("/api/books/" + id);
	},
	// Saves a book to the database
	saveBook: function(bookData) {
		return axios.post("/api/books", bookData);
	}
};
