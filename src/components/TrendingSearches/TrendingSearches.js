import React, { useState, useEffect, useRef } from 'react';
import getTrendingTerms from 'services/getTrendingTermsService';
import Category from 'components/Category/index';

const TrendingSearches = () => {
    const [trends, setTrends] = useState([])

    useEffect(() => {
      getTrendingTerms().then(setTrends)
    }, []);

    return <Category options={trends} name='Trends'/>;
};

export default TrendingSearches