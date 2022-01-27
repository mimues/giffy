import React, {Suspense} from 'react';
import useNearScreen from 'hooks/useNearScreen';
import Spinner from 'components/Spinner';
//en vez de importar esto, hacemos un lazy
// import TrendingSearches from './TerndingSearches';

const TrendingSearches = React.lazy(
    //import dinamico (asincrono)
    () => import('./TrendingSearches')
)

export default function LazyTrending () {
    const {isNearScreen, fromRef} = useNearScreen({distance: '200px'})

    return <div ref={fromRef}>
    {/* el suspense renderiza el fallback mientras no se cumple la promesa de TrendingSearches*/}
        <Suspense fallback={<Spinner />}>
            {isNearScreen ? <TrendingSearches/> : null}
        </Suspense>
    </div>
}
