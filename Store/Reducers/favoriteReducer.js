// Reducer pour l'ajout ou la suppression de film favori

const initialState = { favoritesFilm: [] } // J'initialise de base mon state avec un tableau vide

function toggleFavorite(state = initialState, action) {
    let nextState
        switch (action.type){
        
            case 'TOGGLE_FAVORITE' : //action d'appuyer sur le bouton favori dans la vue
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id) // je vérifie via findindex si l'id de mon film est deja ou non dans les favoris
            if (favoriteFilmIndex !== -1) {// si le film est présent suppression
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter( (item,index) => index !== favoriteFilmIndex)
                }
            }
            else { // si film absent = Ajout
                nextState = {
                    ...state,
                    favoritesFilm: [...state.favoritesFilm, action.value]
                  }
            }
                return nextState || state // si nextState est undefined on renvoi le state de base

            default :
                return state
        }
}

export default toggleFavorite;