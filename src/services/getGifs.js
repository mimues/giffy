import {apiKey, apiUrl} from './settings'

const fromApiResponseToGifs = (apiResponse) => {
  const {data = []} = apiResponse
  if (Array.isArray(data)) {
    const gifs = data.map(image => {
        const { images, title, id } = image
        const { url } = images.downsized_medium
        return { title, id, url }
      })
    return gifs
  }
  return []
}



//ponemos que el valor por defecto sea morty si no llega nada
//añadimos page para la paginacion
export default function getGifs ({limit = 5, keyword = 'morty', page = 0} = {}) {
    const apiURL = `${apiUrl}/gifs/search?api_key=${apiKey}&q=${keyword}&limit=${limit}&offset=${page*limit}&rating=g&lang=en`

    return fetch(apiURL)
      .then(res => res.json())
      .then(fromApiResponseToGifs)
}