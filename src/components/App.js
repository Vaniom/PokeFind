import React from 'react';
import SearchForm from './SearchForm';
import DisplayPokemon from './DisplayPokemon';

//deploy test

// init pokeAPI call
const pokedex = require('pokedex-promise-v2');
const P = new pokedex();

// Init  pokemon call for translation
const pokemonNameSearch = require('pokemon');


class App extends React.Component {
  state = {
    pokemon: [],
    frenchName: '',
    gameid: 0,
    height: 0,
    weight: 0,
    type: '',
    genus: '',
    stats: [],
    speed: 0,
    specialDefense: 0,
    specialAttack: 0,
    defense: 0,
    attack: 0,
    hp: 0,
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
        speciesName: pokemonElt.species.name,
        stats: pokemonElt.stats,
        type: pokemonElt.types[0].type.name
      }))
    })
  }

  addGameid = () => {
    const id = pokemonNameSearch.getId(this.state.frenchName, 'fr');
    let zero = "";
    let gameid = "";
    if ((id > 9) && (id < 100)) {
      zero = "0";
      gameid = zero + id;

    } else if ((id > 0) && (id < 10)){
      zero = "00";
      gameid = zero + id;
    } else {
      gameid = id;
    }
    return(
      this.setState({gameid: gameid})
    )
  }

  getStats = () => {
    this.state.stats.map(elt => {
      if(elt.stat.name === "hp") {
        this.setState({ hp: elt.base_stat })
      } else if(elt.stat.name === "speed") {
        this.setState( { speed: elt.base_stat })
      } else if(elt.stat.name === "special-defense") {
        this.setState( { specialDefense: elt.base_stat })
      } else if(elt.stat.name === "special-attack") {
        this.setState( { specialAttack: elt.base_stat })
      } else if(elt.stat.name === "defense") {
        this.setState( { defense: elt.base_stat })
      } else if(elt.stat.name === "attack") {
        this.setState( { attack: elt.base_stat })
      }
    })
  }
// Ajouter ici les methodes d'extraction de données de l'objet species

  addSpeciesData = () => {
    const that = this;
    P.getPokemonSpeciesByName(this.state.speciesName)
    .then(function(response) {
      console.log(response);
      that.setState({speciesData: response});
      that.addFromSpeciesData(response);
      that.extractType();
    })
    .catch(function(error) {
      console.log('There was an ERROR: ', error);
    });
  }

  addFromSpeciesData = (response) => {
    this.setState({pokemonDescriptions: response.flavor_text_entries});
  }

  extractType = () => {
    this.state.speciesData.genera.map((entry) => {
        if(entry.language.name === "fr") {
          return(
            this.setState({genus: entry.genus})
          )
        }
    })
  }

  displayCard = () => {
    const cardElt = document.getElementById("card-container");
    cardElt.style.display = "block";
  }

  hideCard = () => {
    const cardElt = document.getElementById("card-container");
    cardElt.style.display = "none";
  }

// Ajouter ici les methodes d'extraction de données de l'objet pokemon
  searchPokemon = (pokemon) => {
    const formattedInput = pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1).toLowerCase();
    this.setState({frenchName: formattedInput});
    const pokemonId = pokemonNameSearch.getId(formattedInput, 'fr');
    const englishPokemonName = pokemonNameSearch.getName(pokemonId, 'en');
    console.log('englishPokemonName', englishPokemonName);
    // definition de constantes pour recupération dans le callback
    const addPokemon = (pokemon) => {this.addPokemon(pokemon)};
    const addFromDefaultSearch = () => {this.addFromDefaultSearch()};
    const addGameid = () => {this.addGameid()};
    const addSpeciesData = () => {this.addSpeciesData()};
    const getStats = () => {this.getStats()};
    const displayCard = () => {this.displayCard()};
    const hideCard = () => {this.hideCard()};
    P.getPokemonByName(englishPokemonName.toLowerCase())
      .then(function(response) {
        console.log(response);
        addPokemon(response);
        addFromDefaultSearch();
        addGameid();
        addSpeciesData();
        getStats();
        displayCard();
      })
      .catch(function(error) {
        console.log('There was an error : ', error);
        hideCard();
        return (<p>Erreur</p>);
      });
  }

  render() {
    return (
      <div className="container">
        <h1>PokeFind</h1>
        <SearchForm formTitle="Trouve tes pokemons" searchPokemon={this.searchPokemon} addPokemon={this.addPokemon}/>
        <DisplayPokemon pokemon={this.state.pokemon} 
                        frenchName={this.state.frenchName}
                        gameid={this.state.gameid}
                        height={this.state.height}
                        weight={this.state.weight}
                        type={this.state.type}
                        stats={this.state.stats}
                        speed={this.state.speed}
                        defense={this.state.defense}
                        attack={this.state.attack}
                        specialAttack={this.state.specialAttack}
                        specialDefense={this.state.specialDefense}
                        hp={this.state.hp}
                        statsTotal={this.state.speed + this.state.defense + this.state.attack + this.state.hp + this.state.specialDefense + this.state.specialAttack}
                        statsAverage={(this.state.speed + this.state.defense + this.state.attack + this.state.hp + this.state.specialDefense + this.state.specialAttack) /6}
                        speciesData={this.state.speciesData}
                        genus={this.state.genus}
                        pokemonDescriptions={this.state.pokemonDescriptions} />
      </div>
    );
  }
}


export default App;
