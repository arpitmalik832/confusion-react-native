import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { Card } from 'react-native-elements'
import { DISHES } from '../shared/dishes'
import { LEADERS } from '../shared/leaders'
import { PROMOTIONS } from '../shared/promotions'

function RenderItem(props) {
  const item = props.item;

  if(item != null) {
    return (
      <Card 
        containerStyle={[styles.card]}
      >
        <Card.Image
          source={require('./images/uthappizza.png')}
          style={[styles.cardImage]}
        >
          <Card.FeaturedTitle>
            {item.name}
          </Card.FeaturedTitle>
          <Card.FeaturedSubtitle>
            {item.designation}
          </Card.FeaturedSubtitle>
        </Card.Image>
        <Text
          style={[styles.cardDescription]}
        >
          {item.description}
        </Text>
      </Card>
    )
  } else {
    return (
      <View />
    )
  }
}

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dishes: DISHES,
      leaders: LEADERS,
      promotions: PROMOTIONS
    }
  }

  render() {
    return (
      <ScrollView style={[styles.scrollView]}>
        <RenderItem item={this.state.dishes.filter(dish => dish.featured)[0]} />
        <RenderItem item={this.state.leaders.filter(leader => leader.featured)[0]} />
        <RenderItem item={this.state.promotions.filter(promotion => promotion.featured)[0]} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  scrollView: {
    paddingTop: 5,
    paddingBottom: 5
  },
  card: {
    padding: 0, 
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5
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

export default Home