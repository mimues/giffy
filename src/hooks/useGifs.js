import {useEffect, useState, useContext} from 'react'
import getGifs from '../services/getGifs'
import GifsContext from '../context/GifsContext'

const INITIAL_PAGE = 0

export function useGifs ({ keyword } = { keyword: null }) {
    const {gifs, setGifs} = useContext(GifsContext)
    //para la paginacion
    const [page, setPage] = useState(INITIAL_PAGE)
    const [loadingNextPage, setLoadingNextPage] = useState(false)
    //hasta aquí
    const [loading, setLoading] = useState(false)

    //recuperamos la keyword del localStorage
    const keywordToUse = keyword || localStorage.getItem('lastkeyword') || 'random' //si nunca se ha buscado nada se busca un random

    useEffect(function () {
        setLoading(true)

        getGifs({keyword: keywordToUse})
        .then(gifs => {
            setGifs(gifs)
            setLoading(false)
            // guardamos la keyword en el localStorage
            localStorage.getItem('lastkeyword', keyword)
        })
    }, [keyword, keywordToUse, setGifs])

    useEffect(() => {
      if (page === INITIAL_PAGE) return
        
      setLoadingNextPage(true)
      getGifs({keyword: keywordToUse, page})
        .then(nextGifs => {
            //prevGifs devuelve el estado anterior
            setGifs(prevGifs => prevGifs.concat(nextGifs))
            setLoadingNextPage(false)
        })

    }, [keywordToUse, page]);
    

    return {loading,loadingNextPage, gifs, setPage}
}
