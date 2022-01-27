import React, { useCallback } from 'react'
import { useLocation } from 'wouter'
import ListOfGifs from 'components/ListOfGifs/ListOfGifs'
import TrendingSearches from 'components/TrendingSearches'
import { useGifs } from 'hooks/useGifs'
import SearchForm from 'components/SearchForm'
import { Helmet } from 'react-helmet'

function Home() {
    const [path, pushLocation] = useLocation()
    const {loading, gifs} = useGifs()

    //el useCallback lo hacemos para evitar que la prop "onSubmit" cambie, esto combinado con React.memo
    const handleSubmit = useCallback(({keyword}) => {
        //preventdefault ya lo hace el componente SearchForm
        //navegar a otra ruta
        pushLocation(`/search/${keyword}`)
    }, [pushLocation])

    return (
        <>
            <Helmet>
                <title>Home | Giffy</title>
            </Helmet>
            <SearchForm onSubmit={handleSubmit}/>
            <div className='App-main'>
                <div className='App-results'>
                    <h3>Última búsqueda</h3>
                    <ListOfGifs gifs={gifs}/>
                </div>
                <div className='App-category'>
                    <TrendingSearches />
                </div>
            </div>
        </>
    )
}

export default Home
