import React from 'react'
import Gif from 'components/Gif/Gif'
import useSingleGif from 'hooks/useSingleGif'
import Spinner from 'components/Spinner'
import { Redirect } from 'wouter'
// import useSEO from 'hooks/useSEO' esto ya no lo usamos porque vamos a usar el Helmet
import { Helmet } from 'react-helmet'

function Detail({params}) {
    const {gif, isLoading, isError} = useSingleGif({id: params.id})
    // const gifs = useGlobalGifs() //esto es un hoook solo de lectura (buena practica)
    const title = gif ? gif.title : ''
    // useSEO({title, description: `Detail of ${title}`})

    if (isLoading)
        return (
            <>
                <Helmet>
                    <title>Cargando...</title>
                </Helmet>
                <Spinner />
            </>
        )
    if (isError) return <Redirect to='/404' />
    if (!gif) return null

    return (
        <>
            <Helmet>
                <title>{title} || Giffy</title>
            </Helmet>
            <h3 className='App-title'>{gif.title}</h3>
            <Gif {...gif}></Gif>
        </> 
    )
}

export default Detail
