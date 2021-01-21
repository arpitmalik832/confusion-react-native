import React from 'react'
import { View, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import { ListItem, Avatar } from'react-native-elements'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import * as Animatable from 'react-native-animatable'
import { baseUrl } from '../shared/baseUrl'

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  })
  return (
    <View 
      style={styles.leftAction}
    >
      <Animated.Text 
        style={[
          styles.actionText, 
          { 
            transform: [{ scale }] 
          }
        ]}
      >
        Add to Cart
      </Animated.Text>
    </View>
  )
}

const RightActions = ({ progress, dragX, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  })
  return (
    <TouchableOpacity  
      style={[styles.rightAction]}
      onPress={onPress}
    >
      <View>
        <Animated.Text 
          style={[
            styles.actionText, 
            { 
              transform: [{ scale }] 
            }
          ]}
        >
          Delete
        </Animated.Text>
      </View>
    </TouchableOpacity>
  )
}

const CustomListItem = ({ item, index, navigate, rightOnPress }) => (
  <Swipeable
    renderRightActions={(progress, dragX) => (
      <RightActions 
        progress={progress} 
        dragX={dragX} 
        onPress={rightOnPress} 
      />
    )}
  >
    <Animatable.View
      animation='fadeInRightBig'
      duration={2000}
    >
      <ListItem
        key={index}
        onPress={() => navigate( 'Dish', { dishId: item.id })}
      >
        <Avatar
          rounded
          size='large'
          source={{ uri: baseUrl + item.image }}
        />
        <ListItem.Content>
          <ListItem.Title
            style={[styles.bold]}
          >
            {item.name}
          </ListItem.Title>
          <ListItem.Subtitle
            style={[styles.color_black]}
          >
            {item.description}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </Animatable.View>
  </Swipeable>
)

const styles = StyleSheet.create({
  leftAction: {
    backgroundColor: '#388e3c',
    justifyContent: 'center'
  },
  rightAction: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center'
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20
  },
  bold: {
    fontWeight: 'bold'
  },
  color_black: {
    color: 'black'
  }
});

export default CustomListItem