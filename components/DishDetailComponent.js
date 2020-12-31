import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { DISHES } from '../shared/dishes'
import { COMMENTS } from '../shared/comments'

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
        <Icon
          raised
          reverse
          name={ props.favorite ? 'heart' : 'heart-o' }
          type='font-awesome'
          color='#f50'
          onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
        />
      </Card>
    )
  } else {
    return (
      <View />
    )
  }
}

function RenderComments(props) {
  const renderComment = ({ item, index }) => {
    return (
      <View
        key={index}
        style={[styles.itemView]}
      >
        <Text
          style={[styles.itemComment]}
        >
          {item.comment}
        </Text>
        <Text
          style={[styles.itemDetails]}
        >
          {item.rating} Stars
        </Text>
        <Text
          style={[styles.itemDetails]}
        >
          {'-- ' + item.author + ', ' + item.date}  
        </Text>  
      </View>
    )
  }

  return (
    <Card
      containerStyle={[styles.commentCard]}  
    >
      <Card.Title>
        Comments
      </Card.Title>
      <Card.Divider />
      <FlatList
        data={props.comments}
        renderItem={renderComment}
        keyExtractor={item => item.id.toString()}
        style={[styles.commentCardDescription]}
      />
    </Card>
  )
}

class DishDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      favorites: []
    }
  }

  markFavorite(dishId) {
    this.setState({
      favorites: this.state.favorites.concat(dishId)
    })
  }

  render() {
    const dishId = this.props.route.params.dishId
    return (
      <ScrollView
        style={[styles.container]}
      >
        <RenderDish 
          dish={this.state.dishes[+dishId]} 
          favorite={this.state.favorites.some(el => el === dishId)}
          onPress={() => this.markFavorite(dishId)}
        />
        <RenderComments 
          comments={this.state.comments.filter(comment => comment.dishId === +dishId)} 
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
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
  },
  commentCard: {
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5
  },
  commentCardDescription: {
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  itemView: {
    margin: 10
  },
  itemComment: {
    fontSize: 14
  },
  itemDetails: {
    fontSize: 12
  }
})

export default DishDetail