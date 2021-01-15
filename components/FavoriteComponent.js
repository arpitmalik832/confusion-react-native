import React, { Component } from 'react'
import { View, Text, FlatList, Alert } from 'react-native'
import CustomListItem from '../customElements/CustomListItem'
import Loading from './LoadingComponent'
import { deleteFavorite } from '../redux/ActionCreators'
import { connect } from 'react-redux'
import { Platform } from 'react-native'

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

class Favorites extends Component {
  render() {
    if(this.props.dishes.isLoading) {
      return (
        <Loading />
      )
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>
            {this.props.dishes.errMess}
          </Text>
        </View>
      )
    } else {
      return (
        <FlatList
          data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => (
            <CustomListItem
              item={item}
              index={index}
              navigate={this.props.navigation.navigate}
              rightOnPress={() => {
                if(Platform.OS === 'web') {
                  this.props.deleteFavorite(item.id)
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
                        onPress: () => this.props.deleteFavorite(item.id),
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)