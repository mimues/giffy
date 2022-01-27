import { useEffect, useRef } from "react";

//todo esto es para el SEO
export default function useSEO ({title, description}) {
    const prevTitle = useRef(document.title)
    const prevDescription = useRef(document.querySelector('meta[name="description"]').getAttribute('content'))

    useEffect(() => {
        //las referencias, para poder acceder a su valor, hay que usar el .current
        const previousTitle = prevTitle.current
        if (title) {
            document.title = `${title} | Giffy`
        }
        //cuando se desmonte el componente, ejecuta esta función que actualiza el título con el previo
        //no solo cuando se desmonta, sino cada vez que vuelve a ejecutarse el efecto hace esto lo primero (la primera vez no)
        return () => document.title = previousTitle
    }, [title]);

    useEffect(() => {
      const metaDescription = document.querySelector('meta[name="description"]')
      const previousDescription = prevDescription.current

      if (description) {
          metaDescription.setAttribute('content', description)
      }
    
      return () => {
        metaDescription.setAttribute('content', previousDescription)
      };
    }, [description]);
}