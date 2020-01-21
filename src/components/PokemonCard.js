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
                    <h2 id="pokemon-name">{this.props.frenchName}<br /><span id="type">{this.props.type}</span><span id="english-name">(en: {pokemonElement.name})</span></h2>
                    <p id="pkmn-id">id: {this.props.gameid}</p>
                    <img src={"https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + this.props.gameid + ".png"} alt="" className="pokemonImg" />
                    <p id="pkmn-description">{this.props.genus} Taille: {this.props.height}m Poids: {this.props.weight}kg</p>
                    <h3 id="title-description">Description:</h3>
                </div>
                )
            }
            {
                this.props.pokemonDescriptions.map((entry, index) => this.showOnlyfrenchDescriptions(entry, index))
            }
            <h3 id="base-stats-title">Stats Base</h3>
                <div id="stats-container">
                    <div>PdV: {this.props.hp}</div>
                    <div>Vitesse: {this.props.speed}</div>
                    <div>Attaque: {this.props.attack}</div>
                    <div>Défense: {this.props.defense}</div>
                    <div>Attaque spéciale: {this.props.specialAttack}</div>
                    <div>Défense spéciale: {this.props.specialDefense}</div>
                </div>
                <div id="stats-resume">
                    <div id="average">Moyenne: {this.props.statsAverage.toFixed(2)}</div>
                    <div id="total">Total: {this.props.statsTotal}</div>
                </div>
            </div>
        )
    }
}

export default PokemonCard
