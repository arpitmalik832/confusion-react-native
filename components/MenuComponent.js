import React, { Component } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import { DISHES } from '../shared/dishes'

class Menu extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      dishes: DISHES
    }
  }

  render() {
    const navigation = this.props.navigation
    const renderMenuItem = ({ item, index }) => {
      return (
        <ListItem 
          key={index} 
          bottomDivider 
          onPress={() => navigation.navigate( 'Dish', { dishId: item.id })}
        >
          <Avatar 
            rounded 
            title={item.name} 
            source={require('./images/uthappizza.png')} 
          />
          <ListItem.Content>
            <ListItem.Title>
              {item.name}
            </ListItem.Title>
            <ListItem.Subtitle>
              {item.description}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>    
      )
    }

    return (
      <FlatList 
        data={this.state.dishes} 
        renderItem={renderMenuItem} 
        keyExtractor={item => item.id.toString()} 
      />
    )
  }
}

const styles = StyleSheet.create({
    
})

export default Menu