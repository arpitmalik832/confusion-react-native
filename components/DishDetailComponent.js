import React, { Component, useState } from 'react'
import { Platform, StyleSheet, View, Text, ScrollView, FlatList, Modal, Alert, PanResponder } from 'react-native'
import { Card, Icon, Rating, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavorite, deleteFavorite, postComment } from '../redux/ActionCreators'
import { Button } from 'react-native'
import * as Animatable from 'react-native-animatable'

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}

const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
  postComment: (dishId, author, rating, comment) => dispatch(postComment(dishId, author, rating, comment))
})

function RenderDish(props) {
  const [modalVisible, setModalVisible] = useState(false)
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(3)
  const [comment, setComment] = useState('')
  const [ref, setRef] = useState(null)

  const resetForm = () => {
    setAuthor('')
    setRating(3)
    setComment('')
  }

  const handleComment = () => {
    props.postComment(author, rating, comment)
    resetForm()
    setModalVisible(false)
  }

  const recognizeDrag = ({ moveX, moveY, dx, dy}) => {
    if(dx < -200) //right to left
      return true
    else 
      return false
  }

  const dish = props.dish

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, gestureState) => {
      return true
    },
    onPanResponderGrant: () => {
      ref
        .rubberBand(1000)
        .then(endState => console.log( endState.finished ? 'finished' : 'cancelled' ))
    },
    onPanResponderEnd: (e, gestureState) => {
      if (recognizeDrag(gestureState)) {
        if(Platform.OS === 'web') {
          props.favorite ? props.unMarkFavorite() : props.markFavorite()
        } else { 
          Alert.alert(
            (props.favorite ? 'Delete from ': 'Add to ') + 'Favorites?',
            'Are you sure to ' + (props.favorite ? 'delete ' : 'add ') + dish.name + '?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              {
                text: 'Ok',
                onPress: () => props.favorite ? props.unMarkFavorite() : props.markFavorite(),
                style: 'default'
              }
            ],
            {
              cancelable: false
            }
          )
        }
      }
      return true
    }
  })

  if(dish != null) {
    return (
      <Animatable.View
        animation='fadeInDown'
        duration={2000}
        delay={1000}
        ref={ref => setRef(ref)}
        {...panResponder.panHandlers}
      >
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
            <View
              style={[styles.iconsContainer]}
            >
              <Icon
                containerStyle={[styles.icon]}
                name={ props.favorite ? 'heart' : 'heart-o' }
                type='font-awesome'
                color='#0FF'
                onPress={() => props.favorite ? props.unMarkFavorite() : props.markFavorite()}
              />
              {
                Platform.OS === 'web' ?
                <>
                </>
                :
                <Icon
                  containerStyle={[styles.icon]}
                  name='pencil'
                  type='font-awesome'
                  color='#512AD8'
                  onPress={() => setModalVisible(true)}
                />
              }
            </View>
          </Card.Image>
          <Text 
            style={[styles.cardDescription]}
          >
            {dish.description}
          </Text>
          {
            Platform.OS === 'web' ?
            <>
            </>
            :
            <Modal
              animationType='slide'
              transparent={false}
              visible={modalVisible}
              onDismiss={() => setModalVisible(false)}
              onRequestClose={() => setModalVisible(false)}
            >
              <View
                style={[styles.modal]}
              >
                <Rating
                  showRating
                  type='star'
                  ratingCount={5}
                  onFinishRating={(rating) => setRating(rating)}
                />
                <Input
                  placeholder='Author'
                  leftIcon={{
                    name: 'user-o',
                    type: 'font-awesome'
                  }}
                  onChangeText={(text) => setAuthor(text)}
                />
                <Input
                  placeholder='Comment'
                  leftIcon={{
                    name: 'comment-o',
                    type: 'font-awesome'
                  }}
                  onChangeText={(text) => setComment(text)}
                />
                <Button
                  title='Submit'
                  color='#512DA8'
                  onPress={() => handleComment()}
                />
                <View
                  style={[styles.mt_20]}
                >
                  <Button
                    title='Cancel'
                    color='#512DA8'
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </View>
            </Modal>
          }
        </Card>
      </Animatable.View>
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
        <View
          style={[styles.itemRatingContainer]}
        >
          <Rating
            readonly
            imageSize={12}
            startingValue={item.rating}
          />
        </View>
        <Text
          style={[styles.itemDetails]}
        >
          {'-- ' + item.author + ', ' + item.date}  
        </Text>  
      </View>
    )
  }

  return (
    <Animatable.View
      animation='fadeInUp'
      duration={2000}
      delay={1000}
    >
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
    </Animatable.View>
  )
}

class DishDetail extends Component {
  render() {
    const dishId = this.props.route.params.dishId
    return (
      <ScrollView
        style={[styles.container]}
      >
        <RenderDish 
          dish={this.props.dishes.dishes[+dishId]}
          favorite={this.props.favorites.some(el => el === dishId)}
          markFavorite={() => this.props.postFavorite(dishId)}
          unMarkFavorite={() => this.props.deleteFavorite(dishId)}
          postComment={(author, rating, comment) => this.props.postComment(dishId, author, rating, comment)}
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
  },
  itemRatingContainer: {
    alignItems : 'flex-start',
    marginTop: 5,
    marginBottom: 5
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginLeft: 5,
    marginRight: 5
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  },
  mt_20: {
    marginTop: 20
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail)