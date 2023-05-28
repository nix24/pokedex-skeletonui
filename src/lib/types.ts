// Define the Pokemon interface
export interface Pokemon {
	id: number;
	name: string;
	sprites: {
		front_default: string;
	};
	types: {
		toLowerCase: any;
		type: {
			name: string;
		};
	}[];
	abilities: {
		ability: {
			name: string;
		};
	}[];
	stats: {
		stat: {
			name: string;
		};
		base_stat: number;
	}[];
	url: string;
	image?: string;
	moves?: {
		move: {
			name: string;
		};
	}[];
}

// Define the PokemonData interface
export interface PokemonData {
	results: Pokemon[];
}

// Define the LoadResponse interface
export interface LoadResponse {
	props: {
		pokemon: Pokemon[];
	};
}

export interface typeColor {
    [key: string]: string;
}

export interface PaginationSettings {
	offset: number;
	limit: number;
	size?: number;
	amounts: number[];
}