import { createStackNavigator, createAppContainer } from 'react-navigation';
import Search from '../Components/Search';
import FilmDetail from '../Components/FilmDetail';
// Gestion de la navigation de ma vue depuis la vue Search

const SearchtStackNavigator = createStackNavigator({
    Search: {
        screen: Search,
        navigationOptions: { // Cette commande me permet de rajouter les titres de ma navigation
            title: "Rechercher"
        }
    },

    FilmDetail: {
        screen: FilmDetail
    }
})

export default createAppContainer(SearchtStackNavigator);
