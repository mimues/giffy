import React, { useRef, useEffect, useCallback } from 'react'
import Spinner from 'components/Spinner'
import ListOfGifs from 'components/ListOfGifs/ListOfGifs'
import {useGifs} from 'hooks/useGifs'
import useNearScreen from 'hooks/useNearScreen'
import debounce from 'just-debounce-it'
// import useSEO from 'hooks/useSEO'
import { Helmet } from 'react-helmet'

function SearchResults ({params}) {
    const {keyword} = params
    const {loading, gifs, setPage} = useGifs({keyword})
    const externalRef = useRef()
    const {isNearScreen} = useNearScreen({
        externalRef: loading ? null : externalRef,
        once: false
    })
    const title = gifs ? `${gifs.length} resultados de ${keyword}` : ''
    // useSEO({title})
    
    /* el custom hook de arriba hace todo esto
    const [gifs, setGifs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(function () {
        setLoading(true)
        getGifs({keyword})
        .then(gifs => {
            setGifs(gifs)
            setLoading(false)
        })
    }, [keyword])
    */

    //npm i just-debounce-it
    //aunque llamemos 8 veces, el debounce hace que la respuesta se renderice solo una vez
    //lo que le pasamos como parametro al useCallback es la función que queremos que se guarde (en memoria) para no perder la referencia
    const debounceHandleNextPage = useCallback(debounce(
        () => setPage(prevPage => prevPage +1), 500
    ), [setPage])

    useEffect(() => {
      if (isNearScreen) debounceHandleNextPage()
    }, [debounceHandleNextPage, isNearScreen]);

    return <>
        {loading
            ? <Spinner />
            : <>
                <Helmet>
                    <title>{title}</title>
                    <meta name='description' content={title} />
                </Helmet>
                <h3 className='App-title'>
                    {/* para que no aparezca el %20 */}
                    {decodeURI(keyword)}
                </h3>
                <ListOfGifs gifs={gifs} />
                {/* para el infinity scroll */}
                <div id='visor' ref={externalRef}></div>
            </>
        }
        {/* <br />
        <button onClick={handleNextPage} >Get next page</button> */}
    </>
}

export default SearchResults
