import React from 'react';

class DisplayPokemon extends React.Component {
    render() {
        return(
            <div>
            {
                this.props.pokemon.map(pokemonElement =>
                <div key={pokemonElement.id} className="pokemon-container">
                    <h2>Nom français: {this.props.frenchName}</h2>
                    <h2>Name: {pokemonElement.name}</h2>
                    <img src={pokemonElement.sprites.front_default} alt="" />
                </div>
                
                )
            }
            </div>
        );
    }
}

export default DisplayPokemon;