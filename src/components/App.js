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
    frenchName: '',
    height: 0,
    weight: 0,
    speciesName : '',
    speciesData: {},
    pokemonDescriptions: []
  };

  addPokemon = (pokemon) => {
    let oldPokemon = [];
    let newPokemon = [...oldPokemon, pokemon];
    this.setState({ pokemon: newPokemon });
  }
  
  addFromDefaultSearch = () => {
    //this.setState({height: this.state.pokemon.height, weight: this.state.pokemon.weight})
    this.state.pokemon.map((pokemonElt) => {
      return (this.setState({
        height: pokemonElt.height/10, 
        weight: pokemonElt.weight/10, 
        speciesName: pokemonElt.species.name,}))
    })
  }

  addSpeciesData = () => {
    const that = this;
    P.getPokemonSpeciesByName(this.state.speciesName)
    .then(function(response) {
      console.log(response);
      that.setState({speciesData: response});
      that.addFromSpeciesData(response);
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });
  }

  addFromSpeciesData = (response) => {
    this.setState({pokemonDescriptions: response.flavor_text_entries});
  }
  

  searchPokemon = (pokemon) => {
    const formattedInput = pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1).toLowerCase();
    this.setState({frenchName: formattedInput});
    const pokemonId = pokemonNameSearch.getId(formattedInput, 'fr');
    const englishPokemonName = pokemonNameSearch.getName(pokemonId, 'en');

    console.log('englishPokemonName', englishPokemonName);
    // definition de constantes pour recupération dans le callback
    const addPokemon = (pokemon) => {this.addPokemon(pokemon)};
    const addFromDefaultSearch = () => {this.addFromDefaultSearch()};
    const addSpeciesData = () => {this.addSpeciesData()};
    P.getPokemonByName(englishPokemonName.toLowerCase())
      .then(function(response) {
        console.log(response);
        addPokemon(response);
        addFromDefaultSearch();
        addSpeciesData();
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
        <h2>Trouve tes pokemons !</h2>
        <SearchForm formTitle="Renseigne le nom du pokemon en français" searchPokemon={this.searchPokemon} addPokemon={this.addPokemon}/>
        <DisplayPokemon pokemon={this.state.pokemon} 
                        frenchName={this.state.frenchName}
                        height={this.state.height}
                        weight={this.state.weight}
                        pokemonDescriptions={this.state.pokemonDescriptions} />
      </div>
    );
  }
}


export default App;
