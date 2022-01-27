import React, {useState} from "react";

const SearchForm = ({onSubmit}) => {
    const [keyword, setKeyword] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        onSubmit({keyword})
    }

    const handleChange = e => {
        setKeyword(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                onChange={handleChange}
                type='text' value={keyword}
                placeholder='Search for a gif...'
            />
        </form>
    );
};

//usamos React.memo, que es un componente de orden superior (función que le pasas un componente y te devuelve otro componente)
//searchform evitará el re-renderizado si sus props no cambian
export default React.memo(SearchForm);
