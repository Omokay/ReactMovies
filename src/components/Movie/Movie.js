import React, { Component } from 'react';
import {API_URL, API_KEY} from '../../config'
import Navigation from '../elements/Navigation/Navigation'
import MovieInfo from '../elements/MovieInfo/MovieInfo'
import MovieInfoBar from  '../elements/MovieInfoBar/MovieInfoBar'
import FourColGrid from '../elements/FourColGrid/FourColGrid'
import Spinner from '../elements/Spinner/Spinner'
import Actor from '../elements/Actor/Actor'
import './Movie.css'



class Movie extends Component {

    state = {
        movie: null,
        actor: null,
        director: [],
        loading: false
    }

    componentDidMount() {
        this.setState({
            loading: true
        });

    const endpoint = `${API_URL}movie/${this.props.match.params.movieId}?api_keys=${API_KEY}&language=en-US`;
    this.fetchItems(endpoint);
    }

    fetchItems = (endpoint) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
             
        })
    }
    
    render() {
        return (
            <div className="rmdb-movie">
                <Navigation />
                <MovieInfo />
                <MovieInfoBar />
                <FourColGrid />
                <Spinner />
            </div>
        )
    }
}

export default Movie;