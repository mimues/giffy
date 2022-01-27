import {useState, useEffect, useRef} from 'react'

export default function useNearScreen ({distance = '100px', externalRef, once = true} = {}) {
    const [isNearScreen, setShow] = useState(false)
    //useRef nos permite guardar valores que permanecen inalterados entre renderizados
    const fromRef = useRef()

    useEffect(() => {
        let observer
        const element = externalRef ? externalRef.current : fromRef.current

        const onChange = (entries, observer) => {
            const el = entries[0]
            if(el.isIntersecting) {
                setShow(true)
                once && observer.disconnect()
                //para evitar que lanze continuamente
            } else {
                !once && setShow(false)
            }
        }

        //toda esta mierda es un polyfill para el explorer, importamos de forma dinamica solo si estamos en explorer
        Promise.resolve(
            typeof IntersectionObserver !== 'undefined'
            ? IntersectionObserver
            : import('intersection-observer')
        ).then(() => {
            observer = new IntersectionObserver(onChange, {
                //distacia al elemento para hacer el lazy load
                rootMargin: distance
            })
            //aquí accedemos al valor que tiene elementRef
            element && observer.observe(element)
            
        })
        

        return () => observer && observer.disconnect() //para limpiar el evento cuando acabe el useEffect
    });

    return {isNearScreen, fromRef}
}