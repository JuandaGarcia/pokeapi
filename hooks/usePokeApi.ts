import { ChangeEvent, useEffect, useState } from 'react'
import { Pokemon } from 'utils/types/Pokemon'

const usePokeApi = () => {
	const [data, setData] = useState<Pokemon[]>([])
	const [totalPokemos, setTotalPokemos] = useState(0)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<any>(null)

	const [searchText, setSearchText] = useState('')
	const [searchResult, setSearchResult] = useState<Pokemon[]>([])
	const [totalPokemosSearch, setTotalPokemosSearch] = useState(0)

	const [currentPage, setCurrentPage] = useState(1)

	const pokemonsArray =
		searchResult.length && searchText
			? [...searchResult].slice(0, 10 * currentPage)
			: !searchResult.length && searchText
			? []
			: [...data].slice(0, 10 * currentPage)

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await fetch(
					'https://pokeapi.co/api/v2/pokemon/?limit=10000&offset=0'
				)
				const data = await response.json()
				setData(data.results)
				setTotalPokemos(data.count)
				setLoading(false)
			} catch (error) {
				setError(error)
				setLoading(false)
			}
		}

		getData()
	}, [])

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentPage(1)
		setSearchText(e.target.value)
		const search = e.target.value.toLowerCase()
		const result = data.filter(pokemon =>
			pokemon.name.toLowerCase().includes(search)
		)
		setSearchResult(result)
		setTotalPokemosSearch(result.length)
	}

	const nextPage = () => setCurrentPage(currentPage + 1)

	return {
		data: pokemonsArray,
		canLoadMore:
			searchResult.length && searchText
				? totalPokemosSearch !== pokemonsArray.length
				: totalPokemos !== pokemonsArray.length,
		loading,
		error,
		searchResult,
		handleSearch,
		searchText,
		currentPage,
		nextPage,
	}
}

export default usePokeApi
