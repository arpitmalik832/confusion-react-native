import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Card } from 'react-native-elements'
import { DISHES } from '../shared/dishes'

function RenderDish(props) {
  const dish = props.dish
  if(dish != null) {
    return (
      <Card 
        containerStyle={[styles.card]}
      >
        <Card.Image 
          source={require('./images/uthappizza.png')} 
          style={[styles.cardImage]}
        >
          <Card.Title 
            style={[styles.cardTitle]}
          >
            {dish.name}
          </Card.Title>    
        </Card.Image>
        <Text 
          style={[styles.cardDescription]}
        >
          {dish.description}
        </Text>
      </Card>
    )
  } else {
    return (
      <View />
    )
  }
}

class DishDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dishes: DISHES
    }
  }

  render() {
    const dishId = this.props.route.params.dishId
    return (
      <RenderDish dish={this.state.dishes[+dishId]} />
    )
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 0, 
    borderRadius: 10 
  },
  cardTitle: {
    color: '#fff'
  },
  cardImage: {
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  cardDescription: {
    margin: 10
  } 
})

export default DishDetail