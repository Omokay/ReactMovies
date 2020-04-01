import React, { Component } from 'react'
import './SearchBar.css'
import FontAwesome from 'react-fontawesome'


class SearchBar extends Component {

    state = {
        value: ''
    }

    timeout = null;

    doSearch = (event) => {
        // ES6 Destructuring prop
        const { callback } = this.props;

        this.setState({ value: event.target.value })
        clearTimeout(this.timeout);
        // Set a timeout to wait for the user to stop writing
        // So we don´t have to make unnessesary calls
        this.timeout = setTimeout(() => {
            callback(this.state.value);
        }, 500);
    }

    render() {
        return (
            <div>
                <div className="rmdb-searchbar">
                    <div className="rmdb-searchbar-content">
                        <FontAwesome className="rmdb-fa-search" name="search" size="2px" />
                        <input type="text"
                            className="rmdb-searchbar-input"
                            placeholder="Search"
                            onChange={this.doSearch}
                            value={this.state.value} />

                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar;