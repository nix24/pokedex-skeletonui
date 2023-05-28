import type { PageLoad } from './$types';
import type { Pokemon, PokemonData } from '$lib/types';

export const load: PageLoad = async ({ fetch }) => {
	// Fetch data from the PokeAPI
	const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=251');
	// Parse the response as PokemonData
	const data: PokemonData = await response.json();
	// Map over the Pokemon array and fetch additional data for each Pokemon
	const pokemonWithImage = await Promise.all(
		data.results.map(async (pokemon: Pokemon) => {
			const pokemonResponse = await fetch(pokemon.url);
			const pokemonData: Pokemon = await pokemonResponse.json();
			// Return a new object with the Pokemon's name, url, and front_default sprite
			return {
				id: pokemonData.id,
				name: pokemonData.name,
				url: pokemonData.url,
				image: pokemonData.sprites.front_default,
				types: pokemonData.types.map((type) => type.type.name)
			};
		})
	);
	// Return props
	return {
		props: {
			pokemon: pokemonWithImage
		}
	};
};
