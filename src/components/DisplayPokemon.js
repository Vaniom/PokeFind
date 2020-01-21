import React from 'react';
import PokemonCard from './PokemonCard';

class DisplayPokemon extends React.Component {

    render() {
        return(
            <div id="card-wrapper">
            <PokemonCard pokemon={this.props.pokemon}
                        frenchName={this.props.frenchName}
                        gameid={this.props.gameid}
                        height={this.props.height}
                        weight={this.props.weight}
                        type={this.props.type}
                        speed={this.props.speed}
                        defense={this.props.defense}
                        attack={this.props.attack}
                        specialAttack={this.props.specialAttack}
                        specialDefense={this.props.specialDefense}
                        hp={this.props.hp}
                        stats={this.props.stats}
                        statsTotal={this.props.statsTotal}
                        statsAverage={this.props.statsAverage}
                        speciesData={this.props.speciesData}
                        genus={this.props.genus}
                        pokemonDescriptions={this.props.pokemonDescriptions} />
            </div>
        );
    }
}

export default DisplayPokemon;