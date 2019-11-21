import React from 'react';

class PokemonCard extends React.Component {

    showOnlyfrenchDescriptions = (entry, index) => {
        if(entry.language.name === "fr") {
            return(
                <p key={index}>{entry.flavor_text} <span className="caption">version: {entry.version.name}</span></p>
            );
        }
    }

    render() {
        return (
            <div>
            {
                this.props.pokemon.map(pokemonElement =>
                <div key={pokemonElement.id} className="pokemon-container">
                    <h2>Nom français: {this.props.frenchName}</h2>
                    <h3>Nom anglais: {pokemonElement.name}</h3>
                    <img src={pokemonElement.sprites.front_default} alt="" className="pokemonImg" />
                    <p>Taille: {this.props.height}m | Poids: {this.props.weight}kg</p>
                    <h3>La description de {this.props.frenchName} dans les différentes versions du jeu</h3>
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
