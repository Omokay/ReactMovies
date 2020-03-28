import React, { Component } from 'react'
import './SearchBar.css'
import FontAwesome from 'react-fontawesome'


class SearchBar extends Component {

    state = {
        value: ''
    }

    timeout = null;

    doSearch = (event) => {
        this.setState({
            value: event.target.value
        });
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.props.callback(this.state.value);
        }, 500);
    }

    render() {
        return (
            <div>
                <div className="rmdb-searchbar">
                    <div className="rmdb-searchbar-content">
                        <FontAwesome className="rmdb-fa-search" name="search" size="2px" />
                        <input type="text" className="rmdb-search-input" placeholder="Search" onChange={this.doSearch} value={this.state.value} />

                    </div>
                </div>
            </div>
        )
    }
}

export default SearchBar;