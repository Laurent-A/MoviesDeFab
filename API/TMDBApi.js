// Token depuis moviesDb
const API_TOKEN = "d51e7f14559510465d6e0af351351119";


// Utilisation de requete fetch (copain de axios)
export function getFilmsFromApiWithSearchedText (text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + "&page=" + page
    return fetch(url)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  }
// J'exporte l'image des film avec une largeur de 300
export function getImageFromApi (name) {
  return 'https://image.tmdb.org/t/p/w300' + name
}

// Récupération du détail d'un film
export function getFilmDetailFromApi(id) {
  const url= ('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}