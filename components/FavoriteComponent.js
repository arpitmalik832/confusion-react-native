import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import SwipeOut from 'react-native-swipeout'
import Loading from './LoadingComponent'
import { deleteFavorite } from '../redux/ActionCreators'
import { baseUrl } from '../shared/baseUrl'
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
    const renderMenuItem = ({ item, index }) => {
      const rightButton = [
        {
          text: 'Delete',
          type: 'delete',
          onPress: () => this.props.deleteFavorite(item.id)
        }
      ]

      return (
        <SwipeOut
          autoClose={true}
          right={rightButton}
        >
          <ListItem
            key={index}
            onPress={() => this.props.navigation.navigate( 'Dish', { dishId: item.id })}
          >
            <Avatar
              rounded
              size='large'
              source={{ uri: baseUrl + item.image }}
            />
            <ListItem.Content>
              <ListItem.Title
                style={[styles.listItemTitle]}
              >
                {item.name}
              </ListItem.Title>
              <ListItem.Subtitle
                style={[styles.listItemSubtitle]}
              >
                {item.description}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        </SwipeOut>
      )
    }

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
          renderItem={renderMenuItem}
          keyExtractor={item => item.id.toString()}
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  listItemTitle: {
    fontWeight: 'bold'
  },
  listItemSubtitle: {
    color: '#000' 
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)