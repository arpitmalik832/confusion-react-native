import React, { Component } from 'react'
import { FlatList } from 'react-native'
import CustomListItem from '../customElements/CustomListItem'
import Loading from './LoadingComponent'
import { deleteFavorite } from '../redux/ActionCreators'
import { connect } from 'react-redux'

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
              rightOnPress={() => this.props.deleteFavorite(item.id)}
            />
          )}
        />
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)