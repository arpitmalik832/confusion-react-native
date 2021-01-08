import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, FlatList } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavorite, deleteFavorite } from '../redux/ActionCreators'

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

function RenderDish(props) {
  const dish = props.dish
  if(dish != null) {
    return (
      <Card 
        containerStyle={[styles.card]}
      >
        <Card.Image 
          source={{ uri: baseUrl + dish.image }} 
          style={[styles.cardImage]}
        >
          <Card.FeaturedTitle>
            {dish.name}
          </Card.FeaturedTitle>    
          <Icon
            name={ props.favorite ? 'heart' : 'heart-o' }
            type='font-awesome'
            color='#0FF'
            onPress={() => props.favorite ? props.unMarkFavorite() : props.markFavorite()}
          />
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
  markFavorite(dishId) {
    this.props.postFavorite(dishId)
  }

  unMarkFavorite(dishId) {
    this.props.deleteFavorite(dishId)
  }

  render() {
    const dishId = this.props.route.params.dishId
    return (
      <ScrollView
        style={[styles.container]}
      >
        <RenderDish 
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          markFavorite={() => this.markFavorite(dishId)}
          unMarkFavorite={() => this.unMarkFavorite(dishId)}
        />
        <RenderComments 
          comments={this.props.comments.comments.filter(comment => comment.dishId === +dishId)} 
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

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail)