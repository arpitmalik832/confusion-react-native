import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    leaders: state.leaders,
    promotions: state.promotions
  }
}

function RenderItem(props) {
  const item = props.item;

  if(item != null) {
    return (
      <Card 
        containerStyle={[styles.card]}
      >
        <Card.Image
          source={{ uri: baseUrl + item.image }}
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
  render() {
    return (
      <ScrollView style={[styles.scrollView]}>
        <RenderItem item={this.props.dishes.dishes.filter(dish => dish.featured)[0]} />
        <RenderItem item={this.props.leaders.leaders.filter(leader => leader.featured)[0]} />
        <RenderItem item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]} />
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

export default connect(mapStateToProps)(Home)