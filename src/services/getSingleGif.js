import {apiKey, apiUrl} from './settings'

const fromApiResponseToGifs = (apiResponse) => {
    const {data} = apiResponse
    const {images, title, id} = data
    const {url} = images.downsized_medium
    return {title, id, url}
  }

export default function getSingleGif ({id}) {
    return fetch(`${apiUrl}/gifs/${id}?api_key=${apiKey}`)
        .then(res => res.json())
        .then(fromApiResponseToGifs)
}