import React from 'react';
import { Link } from 'wouter';

const Category = ({name, options = []}) => {
  return (
    <div className='Category'>
        <h3 className='Category-title'>
            {name}
        </h3>
        <ul className='Category-list'>
            {options.map((sigleOption) => (
                <li key={sigleOption}>
                    <Link className='Category-link' to={`/search/${sigleOption}`}>
                        {sigleOption}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
  )
};

export default Category;
