import React from 'react'
import { Platform, View, Text, FlatList, Alert } from 'react-native'
import { connect } from 'react-redux'
import Loading from './LoadingComponent'
import CustomListItem from '../customElements/CustomListItem'
import { deleteFavorite } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    favorites: state.favorites
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
  }
}

const Favorites = (props) => {
  if(props.dishes.isLoading) {
    return (
      <Loading />
    )
  } else if (props.dishes.errMess) {
    return (
      <View>
        <Text>
          {props.dishes.errMess}
        </Text>
      </View>
    )
  } else {
    return (
      <FlatList
        data={props.dishes.dishes.filter(dish => props.favorites.some(el => el === dish.id))}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item, index }) => (
          <CustomListItem
            item={item}
            index={index}
            navigate={props.navigation.navigate}
            rightOnPress={() => {
              if(Platform.OS === 'web') {
                props.deleteFavorite(item.id)
              } else {
                Alert.alert(
                  "Delete Favorite",
                  "Are you sure to delete " + item.name + "?",
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log(item.name + ' Not deleted'),
                      style: 'cancel'
                    },
                    {
                      text: 'Ok',
                      onPress: () => props.deleteFavorite(item.id),
                      style: 'default'
                    }
                  ],
                  {
                    cancelable: false
                  }
                )
              }
            }}
          />
        )}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)