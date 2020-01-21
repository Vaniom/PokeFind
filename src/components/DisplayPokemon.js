import React from 'react';
import PokemonCard from './PokemonCard';

class DisplayPokemon extends React.Component {

    render() {
        return(
            <div id="card-containerzzz">
            <PokemonCard pokemon={this.props.pokemon}
                        frenchName={this.props.frenchName}
                        gameid={this.props.gameid}
                        height={this.props.height}
                        weight={this.props.weight}
                        hp={this.props.hp}
                        stats={this.props.stats}
                        speciesData={this.props.speciesData}
                        genus={this.props.genus}
                        pokemonDescriptions={this.props.pokemonDescriptions} />
            </div>
        );
    }
}

export default DisplayPokemon;