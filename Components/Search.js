// Components/Search.js
import React from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text } from 'react-native';
// import films from '../Helpers/filmsData';
import FilmItem from './FilmItem';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'


class Search extends React.Component {

  constructor(props) {
    super(props)
    // Ici on va créer les propriétés de notre component custom Search
    this.searchedText= "",
    this.state = { 
      films: [],
      isLoading: false // pas de chargement si page deja chargé
    }
  }

  // j'appelle mon API via la fonction loadFilms
  // le "_" veut dire qu'on ne doit pas y avoir acces
  _loadFilms() {
    console.log(this.state.searchedText)
    if (this.state.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
      getFilmsFromApiWithSearchedText(this.state.searchedText).then(data => {
          this.setState({ 
            films: data.results,
            isLoading: false
          })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.setState({ searchedText: text })
}

  render() {
    console.log(this.state.isLoading)
      return (
    <View style={styles.main_container}>
        <TextInput 
          style={styles.textinput} 
          placeholder='Titre du film'
          onChangeText= {(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._loadFilms()}
        />
        <Button title='Rechercher' onPress={() => this._loadFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item}/>}
        />
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
        marginTop: 20
      },
  })

export default Search