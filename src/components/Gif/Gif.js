import React from 'react'
import { Link } from 'wouter'
import './Gif.css'

function Gif ({ title, id, url }) {
    return (
        <div className='Gif'>
            <Link to={`/gif/${id}`} className='Gif-Link'>
                <img src={url} alt={title} />
            </Link>
        </div>
    )
}

//para mejorar el rendimiento en el profiler de las developer tools de react
export default React.memo(Gif, (prevProps, nextProps) => {
    //cuidado con esta solución porque no funciona siempre, pero React.memo admite un callback como segundo parámetro para afinar mejor
    //con esto solucionamos el ...restOfGif, ya que el useMemo no hace una comparación profunda (para objetos y arrays, etc)
    //al crear un objeto al vuelo, si son referencias distintas, react.Memo no puede ver si ese objeto tiene los mismos valores
    return prevProps.id === nextProps.id
})
