import React, { Component } from 'react'
import { StyleSheet, View, Text, Animated, Easing } from 'react-native'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import Loading from './LoadingComponent'

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    leaders: state.leaders,
    promotions: state.promotions
  }
}

function RenderItem(props) {
  const item = props.item;

  if(props.isLoading) {
    return (
      <Loading />
    )
  } else if(props.errMess) {
    return (
      <View>
        <Text>
          {props.errMess}
        </Text>
      </View>
    )
  } else if(item != null) {
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
  constructor(props) {
    super(props)

    this.animatedValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.animate()
  }

  animate() {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 8,
        duration: 8000,
        easing: Easing.linear
      }
    ).start(() => this.animate())
  }

  render() {
    const xPos1 = this.animatedValue.interpolate({
      inputRange: [0, 1, 3, 5, 8],
      outputRange: [1200, 600, 0, -600, -1200]
    })

    const xPos2 = this.animatedValue.interpolate({
      inputRange: [0, 2, 4, 6, 8],
      outputRange: [1200, 600, 0, -600, -1200]
    })

    const xPos3 = this.animatedValue.interpolate({
      inputRange: [0, 3, 5, 7, 8],
      outputRange: [1200, 600, 0, -600, -1200]
    })

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Animated.View
          style={{
            width: '100%',
            transform: [{
              translateX: xPos1
            }]
          }}
        >
          <RenderItem 
            item={this.props.dishes.dishes.filter(dish => dish.featured)[0]} 
            isLoading={this.props.dishes.isLoading}
            errMess={this.props.dishes.errMess}
          />
        </Animated.View>
        <Animated.View
          style={{
            width: '100%',
            transform: [{
              translateX: xPos2
            }]
          }}
        >
          <RenderItem 
            item={this.props.leaders.leaders.filter(leader => leader.featured)[0]} 
            isLoading={this.props.leaders.isLoading}
            errMess={this.props.leaders.errMess}
          />
        </Animated.View>
        <Animated.View
          style={{
            width: '100%',
            transform: [{
              translateX: xPos3
            }]
          }}
        >
          <RenderItem 
            item={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]} 
            isLoading={this.props.promotions.isLoading}
            errMess={this.props.promotions.errMess}  
          />
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 0, 
    borderRadius: 10,
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