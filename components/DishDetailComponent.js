import React, { useState } from 'react'
import { Platform, StyleSheet, View, Text, ScrollView, Modal, Alert, PanResponder, Share, Button } from 'react-native'
import { Card, Icon, Rating, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { postFavorite, deleteFavorite, postComment } from '../redux/ActionCreators'
import { baseUrl } from '../shared/baseUrl'

const Gestures = {
  SHOW_COMMENT_MODAL: 'SHOW_COMMENT_MODAL',
  SHOW_FAVORITE_ALERT: 'SHOW_FAVORITE_ALERT'
}

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
  const [commentModal, showCommentModal] = useState(false)
  const [author, setAuthor] = useState('')
  const [rating, setRating] = useState(3)
  const [comment, setComment] = useState('')
  const [ref, setRef] = useState(null)

  const dish = props.dish

  const resetCommentForm = () => {
    setAuthor('')
    setRating(3)
    setComment('')
  }

  const postComment = () => {
    props.postComment(author, rating, comment)
    resetCommentForm()
    showCommentModal(false)
  }

  const shareDish = (title, message, url) => {
    Share.share(
      {
        title: title,
        message: title + ': ' + message + ' ' + url,
        url: url
      },
      {
        dialogTitle: 'Share ' + title
      }
    )
  }

  const recognizeDrag = ({ moveX, moveY, dx, dy}) => {
    if(dx < -200) //right to left
      return Gestures.SHOW_FAVORITE_ALERT
    else if(dx > 200) //left to right
      return Gestures.SHOW_COMMENT_MODAL
  }

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
      switch(recognizeDrag(gestureState)) {
        case Gestures.SHOW_FAVORITE_ALERT:
          if(Platform.OS === 'web') {
            props.favorite ? props.deleteFavorite() : props.postFavorite()
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
                  onPress: () => props.favorite ? props.deleteFavorite() : props.postFavorite(),
                  style: 'default'
                }
              ],
              {
                cancelable: false
              }
            )
          }
          break;
        case Gestures.SHOW_COMMENT_MODAL: 
          showCommentModal(true)
          break;
        default: 
          console.log('gesture is not defined')
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
          containerStyle={[
            {
              padding: 0
            },
            styles.radius_10,
            styles.margin_height_5
          ]}
        >
          <Card.Image 
            source={{ uri: baseUrl + dish.image }} 
            style={[
              {
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10
              },
              styles.items_in_center
            ]}
          >
            <Card.FeaturedTitle>
              {dish.name}
            </Card.FeaturedTitle>    
            <View
              style={[
                {
                  flexDirection: 'row'
                },
                styles.items_in_center
              ]}
            >
              <Icon
                containerStyle={[styles.margin_width_5]}
                name={ props.favorite ? 'heart' : 'heart-o' }
                type='font-awesome'
                color='#0FF'
                onPress={() => props.favorite ? props.deleteFavorite() : props.postFavorite()}
              />
              {(
                Platform.OS !== 'web' && 
                <>
                  <Icon
                    containerStyle={[styles.margin_width_5]}
                    name='pencil'
                    type='font-awesome'
                    color='#512AD8'
                    onPress={() => showCommentModal(true)}
                  />
                  <Icon
                    containerStyle={[styles.margin_width_5]}
                    name='share'
                    type='font-awesome'
                    color='#512DA8'
                    onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                  />
                </>
              )}
            </View>
          </Card.Image>
          <Text 
            style={[
              styles.padding_height_10,
              styles.padding_width_20,
              styles.color_black
            ]}
          >
            {dish.description}
          </Text>
          {(
            Platform.OS !== 'web' &&
            <Modal
              animationType='slide'
              transparent={false}
              visible={commentModal}
              onDismiss={() => showCommentModal(false)}
              onRequestClose={() => showCommentModal(false)}
            >
              <View
                style={[{
                  justifyContent: 'center',
                  padding: 20
                }]}
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
                  onPress={() => postComment()}
                />
                <View
                  style={[{
                      marginTop: 20
                  }]}
                >
                  <Button
                    title='Cancel'
                    color='#512DA8'
                    onPress={() => showCommentModal(false)}
                  />
                </View>
              </View>
            </Modal>
          )}
        </Card>
      </Animatable.View>
    )
  } else {
    return (
      <View />
    )
  }
}

const RenderComments = (props) => {
  const getDateTime = (datetime) => {
    const dd = String(datetime.getDate()).padStart(2, '0')
    const mm = String(datetime.getMonth() + 1).padStart(2, '0')
    const yyyy = datetime.getFullYear()
    const hh = String(datetime.getHours()).padStart(2, '0')
    const MM = String(datetime.getMinutes()).padStart(2, '0')
    const ss = String(datetime.getSeconds()).padStart(2, '0')
    return dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + MM + ':' + ss
  }

  return (
    <Animatable.View
      animation='fadeInUp'
      duration={2000}
      delay={1000}
    >
      <Card
        containerStyle={[
          styles.margin_height_5,
          styles.radius_10
        ]}  
      >
        <Card.Title
          style={[styles.color_black]}
        >
          Comments
        </Card.Title>
        <Card.Divider />
        {(
          props.comments.map((item, index) => {
            return (
              <View
                key={index}
                style={[{
                  margin: 10
                }]}
              >
                <Text
                  style={[
                    {
                      fontSize: 14
                    },
                    styles.color_black
                  ]}
                >
                  {item.comment}
                </Text>
                <View
                  style={[
                    {
                      alignItems: 'flex-start'
                    },
                    styles.margin_height_5
                  ]}
                >
                  <Rating
                    readonly
                    imageSize={12}
                    startingValue={item.rating}
                  />
                </View>
                <Text
                  style={[
                    {
                      fontSize: 12
                    },
                    styles.color_black
                  ]}
                >
                  {'-- ' + item.author + ', ' + getDateTime(new Date(Date.parse(item.date)))}  
                </Text>  
              </View>
            )
          })
        )}
      </Card>
    </Animatable.View>
  )
}

const DishDetail = (props) => {
  const dishId = props.route.params.dishId
  return (
    <ScrollView
      contentContainerStyle={[styles.padding_height_5]}
    >
      <RenderDish 
        dish={props.dishes.dishes[+dishId]}
        favorite={props.favorites.some(el => el === dishId)}
        postFavorite={() => props.postFavorite(dishId)}
        deleteFavorite={() => props.deleteFavorite(dishId)}
        postComment={(author, rating, comment) => props.postComment(dishId, author, rating, comment)}
      />
      <RenderComments 
        comments={props.comments.comments.filter(comment => comment.dishId === +dishId)} 
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  padding_height_5: {
    paddingTop: 5,
    paddingBottom: 5
  },
  padding_width_5: {
    paddingLeft: 5,
    paddingRight: 5
  },
  padding_height_10: {
    paddingTop: 10,
    paddingBottom: 10
  },
  padding_width_10: {
    paddingLeft: 10,
    paddingRight: 10
  },
  padding_height_20: {
    paddingTop: 20,
    paddingBottom: 20
  },
  padding_width_20: {
    paddingLeft: 20,
    paddingRight: 20
  },
  margin_height_5: {
    marginTop: 5,
    marginBottom: 5
  },
  margin_width_5: {
    marginLeft: 5,
    marginRight: 5
  },
  margin_height_10: {
    marginTop: 10,
    marginBottom: 10
  },
  margin_width_10: {
    marginLeft: 10,
    marginRight: 10
  },
  radius_10: {
    borderRadius: 10
  },
  color_black: {
    color: 'black'
  },
  bold: {
    fontWeight: 'bold'
  },
  items_in_center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail)