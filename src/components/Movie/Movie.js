import React, { Component } from 'react';
import { API_URL, API_KEY } from '../../config'
import Navigation from '../elements/Navigation/Navigation'
import MovieInfo from '../elements/MovieInfo/MovieInfo'
import MovieInfoBar from '../elements/MovieInfoBar/MovieInfoBar'
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
        // ES6 destructuring the props
        const { movieId } = this.props.match.params;

        if (localStorage.getItem(`${movieId}`)) {
            let state = JSON.parse(localStorage.getItem(`${movieId}`))
            this.setState({ ...state })
        } else {
            this.setState({ loading: true })
            // First fetch the movie ...
            let endpoint = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
            this.fetchItems(endpoint);
        }
    }

    fetchItems = async endpoint => {
        const { movieId } = this.props.match.params;
        try {
            const result = await (await fetch(endpoint)).json();
            if (result.status_code) {
                this.setState({ loading: false });
            }
            else {
                this.setState({ movie: result })
                const creditEndpoint = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
                const creditResult = await (await fetch(creditEndpoint)).json();
                const directors = creditResult.crew.filter((member) => member.job === 'Director');

                this.setState({
                    actor: creditResult.cast,
                    directors,
                    loading: false
                }, () => {
                    // sets state to the local storage
                    localStorage.setItem(`${movieId}`, JSON.stringify(this.state));
                })
            }
        }
        catch (e) {
            console.log('Error: ', e);
        }
    }

    // fetchItems = (endpoint) => {
    //     const { movieId } = this.props.match.params;

    //     fetch(endpoint)
    //         .then(result => result.json())
    //         .then(result => {
    //             console.log(result);
    //             if (result.status_code) {
    //                 this.setState({ loading: false });
    //             }
    //             else {
    //                 this.setState({ movie: result }, () => {

    //                     let endpoint = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`

    //                     fetch(endpoint)
    //                         .then(result => result.json())
    //                         .then(result => {

    //                             const directors = result.crew.filter((member) => member.job === 'Director');

    //                             this.setState({
    //                                 actor: result.cast,
    //                                 directors,
    //                                 loading: false
    //                             }, () => {
    //                                 // sets state to the local storage
    //                                 localStorage.setItem(`${movieId}`, JSON.stringify(this.state));
    //                             })
    //                         })
    //                 })
    //             }
    //         }).catch(error => console.log('Error:', error))
    // }

    render() {
        return (
            <div className="rmdb-movie">
                {this.state.movie ?
                    <div>
                        <Navigation movie={this.props.location.movieName} />
                        <MovieInfo movie={this.state.movie} director={this.state.director} />
                        <MovieInfoBar time={this.state.movie.runtime} budget={this.state.movie.budget} revenue={this.state.movie.revenue} />
                    </div>
                    : null}

                {this.state.actor ?

                    <div className="rmdb-movie-grid">
                        <FourColGrid header={'Actors'}>
                            {this.state.actor.map((element, i) => {
                                return <Actor key={i} actor={element} />
                            })}
                        </FourColGrid>
                    </div>
                    : null}

                {!this.state.movie && !this.state.loading ? <h1>No Movie Found</h1> : null}
                {this.state.loading ? <Spinner /> : null}

            </div>
        )
    }
}

export default Movie;