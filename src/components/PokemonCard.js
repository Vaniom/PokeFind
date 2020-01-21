import React from 'react';

class PokemonCard extends React.Component {

    showOnlyfrenchDescriptions = (entry, index) => {
        if((entry.language.name === "fr") && (entry.version.name === "alpha-sapphire")) {
            return(
                <p id="text-description" key={index}>{entry.flavor_text}</p>
            );
        }
    }

    render() {
        return (
            <div id="card-container">
            {
                this.props.pokemon.map(pokemonElement =>
                <div key={pokemonElement.id} className="pokemon-container">
                    <h2 id="pokemon-name">{this.props.frenchName} <span id="hp">pv {this.props.hp}</span> <br /><span id="english-name">(en: {pokemonElement.name})</span></h2>
                    <img src={"https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + this.props.gameid + ".png"} alt="" className="pokemonImg" />
                    <p id="pkmn-description">id={this.props.gameid} {this.props.genus} Taille: {this.props.height}m Poids: {this.props.weight}kg</p>
                    <h3 id="title-description">Description:</h3>
                </div>
                )
            }
            {
                this.props.pokemonDescriptions.map((entry, index) => this.showOnlyfrenchDescriptions(entry, index))
            }
            </div>
        )
    }
}

export default PokemonCard
