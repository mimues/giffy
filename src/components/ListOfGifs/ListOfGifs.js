import React from 'react'
import Gif from '../Gif/Gif'
import './styles.css'

function ListOfGifs ({gifs}) {
    //el return lo hacemos asi raro porque a react no le mola que devolvamos un array
    return <div className='ListOfGifs'>
        {
            gifs.map(({id, title, url, ...restOfGif}) => 
                <Gif
                id={id} 
                key={id}
                title={title} 
                url={url} 
                extraInfo={restOfGif}
                />
            )
        }
    </div>
}

export default ListOfGifs
