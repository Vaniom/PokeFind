import React from 'react';
import SearchForm from './SearchForm';

const pokedex = require('pokedex-promise-v2');
const P = new pokedex();


class App extends React.Component {
  state = {
    pokemon: []
  };

  addPokemon = (pokemon) => {
    let oldPokemon = [];
    let newPokemon = [...oldPokemon, pokemon];
    this.setState({ pokemon: newPokemon });
  }

  searchPokemon = (pokemon) => {
    const addPokemon = (pokemon) => {this.addPokemon(pokemon)};
    P.getPokemonByName(pokemon.name)
      .then(function(response) {
        console.log(response);
        addPokemon(response);
      })
      .catch(function(error) {
        console.log('There was an error : ', error);
        return error;
      });
  }

  render() {
    return (
      <div className="container">
        <h1>PokeFind</h1>
        <h2>Find your Pokemons</h2>
        <SearchForm formTitle="Enter Pokemon's name" searchPokemon={this.searchPokemon} addPokemon={this.addPokemon}/>
      </div>
    );
  }
}


export default App;
