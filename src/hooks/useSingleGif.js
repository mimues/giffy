import { useState, useEffect } from "react";
import getSingleGif from "services/getSingleGif";
import { useGifs } from "./useGifs";

//este hook lo hacemos para solucionar que si entras a una URL de detalle directamente no hay ningun gif guardado, por lo que hay que hacer una llamada
export default function useSingleGif ({id}) {
    const {gifs} = useGifs()
    const gifFromCache = gifs.find(singleGif => singleGif.id = id)

    const [gif, setGif] = useState(gifFromCache)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)


    useEffect(() => {
      if (!gif) {
          setIsLoading(true)
          //llamar al servicio si no tenemos gif
          getSingleGif({id})
            .then(gif => {
                setGif(gif)
                setIsLoading(false)
                setIsError(false)
            })
            .catch(err => {
                setIsLoading(false)
                setIsError(true)
            })
      }
    }, [gif, id]);
    

    return {gif, isLoading, isError}
}