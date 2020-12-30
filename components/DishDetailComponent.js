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
          <Card.FeaturedTitle>
            {dish.name}
          </Card.FeaturedTitle>    
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
  cardImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  cardDescription: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20
  } 
})

export default DishDetail