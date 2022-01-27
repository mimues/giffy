import {apiKey, apiUrl} from './settings'

const fromApiResponseToGifs = (apiResponse) => {
  const {data = []} = apiResponse
  return data
}



//ponemos que el valor por defecto sea morty si no llega nada
export default function getTrendingTerms () {
    const apiURL = `${apiUrl}/trending/searches?api_key=${apiKey}`

    return fetch(apiURL)
      .then(res => res.json())
      .then(fromApiResponseToGifs)
}