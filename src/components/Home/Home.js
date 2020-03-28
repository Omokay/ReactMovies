import React, { Component } from 'react' 
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config'
import HeroImage from '../elements/HeroImage/HeroImage'
import SearchBar from '../elements/SearchBar/SearchBar'
import FourColGrid from '../elements/FourColGrid/FourColGrid'
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn'
import Spinner from '../elements/Spinner/Spinner'

import './Home.css'

class Home extends Component {

    state = {
        movies: [],
        heroImage: null,
        loading: false,
        currentPage: 0,
        totalPages: 0, 
        searchTerm: ''
    }

    componentDidMount() {
        this.setState({
            loading: true
        });  
        const endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        this.fetchItems(endpoint);
    }

    searchItems = (searchTerm) => {
        let endpoint = ''
        this.setState({
            movies: [],
            loading: true,
            searchTerm
        });

        if (searchTerm === '') {
            endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        }
        else if (endpoint === searchTerm) {
            endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
        }

        this.fetchItems(endpoint); 
    }
// Load more button will handle populating more movies on the view taking into consideration the contents of the search box
    loadMoreItems = () => {
        let endpoint = '';
        this.setState({ loading: true });

        if (this.state.searchTerm === '') {
            endpoint = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${this.state.currentPage + 1}`;
        } else {
            endpoint = `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query${this.state.searchTerm}&page=${this.state.currentPage + 1}`;
        }

        this.fetchItems(endpoint); 

    }
// Method to Fetch Movies from API
    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            console.log(result);
            this.setState({
                movies: [...this.state.movies, ...result.results],
                heroImage: this.state.heroImage || result.results[0],
                loading: false,
                currentPage: result.page,
                totalPages: result.total_pages
            })
        })
    }

    render() {
        return (
            <div className="rmdb-home">
            {/* Ternary Operator checking if Hero Image is available */}
                {this.state.heroImage ?
                <div>
                <HeroImage
                image = {`${IMAGE_BASE_URL}${BACKDROP_SIZE}${this.state.heroImage.backdrop_path}`}
                title = {this.state.heroImage.original_title}
                text = {this.state.heroImage.overview}
                  />
                <SearchBar />
                </div> : null }

                <FourColGrid />
                <Spinner />
                <LoadMoreBtn />
            </div>
        )
    }
}

export default Home;