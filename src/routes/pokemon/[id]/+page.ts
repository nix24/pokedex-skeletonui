import type { PageLoad } from '../../$types';
import type { Pokemon } from '$lib/types';
export const load: PageLoad = async ({
	fetch,
	params
}: {
	fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
	params: Record<string, string>;
}) => {
	if (!params.id) {
		throw new Error('Missing required params');
	}
	//fetching data of specific pokemon
	const pokeID = params.id;

	const url = `https://pokeapi.co/api/v2/pokemon/${pokeID}`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Could not load pokemon: ${response.status}`);
	}
	//parsing res as Pokemon
	const pokemon: Pokemon = await response.json();
	//returning pokemon as props
	return {
		props: {
			pokemon: {
				id: pokemon.id,
				name: pokemon.name,
				image: pokemon.sprites.front_default,
				types: pokemon.types.map((type) => type.type.name),
				abilities: pokemon.abilities.map((ability) => ability.ability.name),
				stats: pokemon.stats.map(({ stat: { name }, base_stat }) => ({ name, base_stat })),
				moves: pokemon.moves?.map((move) => move.move.name) ?? []
			}
		}
	};
};
