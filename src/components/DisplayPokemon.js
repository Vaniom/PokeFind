import React from 'react';
import PokemonCard from './PokemonCard';

class DisplayPokemon extends React.Component {

    render() {
        return(
            <div>
            <PokemonCard pokemon={this.props.pokemon}
                        frenchName={this.props.frenchName}
                        height={this.props.height}
                        weight={this.props.weight}
                        pokemonDescriptions={this.props.pokemonDescriptions} />
            </div>
        );
    }
}

export default DisplayPokemon;