import React, { Component } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Tile } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'

const mapStateToProps = state => {
  return {
    dishes: state.dishes
  }
}

class Menu extends Component {
  render() {
    const navigation = this.props.navigation
    const renderMenuItem = ({ item, index }) => {
      return (
        <Tile 
          key={index} 
          title={item.name}
          caption={item.description}
          featured
          onPress={() => navigation.navigate( 'Dish', { dishId: item.id })}
          imageSrc={{ uri: baseUrl + item.image }}
        />    
      )
    }

    return (
      <FlatList 
        data={this.props.dishes.dishes} 
        renderItem={renderMenuItem} 
        keyExtractor={item => item.id.toString()} 
      />
    )
  }
}

const styles = StyleSheet.create({
  listItemTitle: {
    fontWeight: 'bold'
  },
  listItemSubtitle: {
    color: '#000' 
  }
})

export default connect(mapStateToProps)(Menu)