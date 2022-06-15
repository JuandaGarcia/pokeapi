import Image from 'next/image'
import { Pokemon } from 'utils/types/Pokemon'
import s from './PokeCard.module.scss'

type Props = {
	pokemon: Pokemon
}
const PokeCard = ({ pokemon }: Props) => {
	const pokemonImageID = pokemon.url.split('/pokemon/')[1].split('/')[0]

	return (
		<li className={s.pokecard}>
			<Image
				width={96}
				height={96}
				alt={pokemon.name}
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonImageID}.png`}
			/>
			<span className={s.pokecard__name}>{pokemon.name}</span>
		</li>
	)
}

export default PokeCard
