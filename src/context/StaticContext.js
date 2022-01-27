import React from "react";

const Context = React.createContext({
    name: 'esto es sin provider', //si no hubiese provider en la app e intentamos acceder saldrían estos valores
    suscribetAlCanal: true
})

export default Context