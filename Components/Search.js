// Components/Search.js
import React from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator  } from 'react-native';
// import films from '../Helpers/filmsData';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'


class Search extends React.Component {

  constructor(props) {
    super(props)
    // Ici on va créer les propriétés de notre component custom Search
    this.searchedText= "",
    this.page = 0 //situe la page ou on se trouve
    this.totalPages = 0 // nombre totales de pages selon la recherche demandé
    this.state = { 
      films: [],
      isLoading: false // pas de chargement si page deja chargé
    }
  }

  // j'appelle mon API via la fonction loadFilms
  // le "_" (underscore) veut dire qu'on ne doit pas y avoir acces, elle est donc privé
  _loadFilms() {
    if (this.state.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
    this.setState({ isLoading: true }) // Lancement du chargement
    getFilmsFromApiWithSearchedText(this.state.searchedText, this.page+1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({ 
            films: [ ...this.state.films, ...data.results ],
            isLoading: false // arrêt du chargement
          })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.setState({ searchedText: text })
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _searchFilms() {
    this.page = 0
    this.totalPages = 0
    this.setState({
      films: [],
    }, () => { 
      // J'utilise la paramètre length sur mon tableau de films pour vérifier qu'il y a bien 0 film
        console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
        this._loadFilms() 
    })
  }

  _displayDetailForFilm = (idFilm) => {
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
  }

  render() {
      return (
    <View style={styles.main_container}>
        <TextInput 
          style={styles.textinput} 
          placeholder='Titre du film'
          onChangeText= {(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button title='Rechercher' onPress={() => this._searchFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
          onEndReachedThreshold = {0.5}
          onEndReached = {() => {
            if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
              this._loadFilms()
            }
          }}
        />
        {this._displayLoading()}
      </View>
      )
  }
}

// StyleSheet permet de créer une API interne à l'application
// Ainsi chaque style sera associé à une instance de l'API
// Nous pourrons alors chercher le style depuis n'importe ou
const styles = StyleSheet.create({
    //textinput est un peu le className de ReactNative
    textinput: {
      height: 50,
      borderColor: '#000000',
      borderWidth: 1,
      paddingLeft: 5
    },
    main_container: {
        flex: 1,
      },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'flex-start'
    }
  })

export default Search