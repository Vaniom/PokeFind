import React from 'react';

class SearchForm extends React.Component {
    state = {
        name: ''
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.searchPokemon(this.state);
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <h3>{this.props.formTitle}</h3>
                <input type="text" 
                        placeholder="Nom du pokemon en français" 
                        value={this.state.value} onChange={(event) => {this.setState({name: event.target.value})}}/>
                <button type="submit">GO!</button>
            </form>
        );
    }
}

export default SearchForm;