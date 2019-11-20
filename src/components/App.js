import React from 'react';
import SearchForm from './SearchForm';
import DisplayPokemon from './DisplayPokemon';

// init pokeAPI call
const pokedex = require('pokedex-promise-v2');
const P = new pokedex();

// Init  pokemon call for translation
const pokemonNameSearch = require('pokemon');


class App extends React.Component {
  state = {
    pokemon: [],
    frenchName: ''
  };

  addPokemon = (pokemon) => {
    let oldPokemon = [];
    let newPokemon = [...oldPokemon, pokemon];
    this.setState({ pokemon: newPokemon });
  }

  searchPokemon = (pokemon) => {
    const formattedInput = pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1).toLowerCase();
    this.setState({frenchName: formattedInput});
    const pokemonId = pokemonNameSearch.getId(formattedInput, 'fr');
    const englishPokemonName = pokemonNameSearch.getName(pokemonId, 'en');

    console.log('englishPokemonName', englishPokemonName);
    const addPokemon = (pokemon) => {this.addPokemon(pokemon)};
    P.getPokemonByName(englishPokemonName.toLowerCase())
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
        <DisplayPokemon pokemon={this.state.pokemon} frenchName={this.state.frenchName} />
      </div>
    );
  }
}


export default App;
