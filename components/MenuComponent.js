import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { Tile } from 'react-native-elements'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import Loading from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'

const mapStateToProps = state => {
  return {
    dishes: state.dishes
  }
}

const Menu = (props) => {
  const MenuItem = ({ item, index }) => {
    return (
      <Animatable.View
        animation='fadeInRightBig'
        duration={2000}
      >
        <Tile 
          featured
          key={index} 
          title={item.name}
          caption={item.description}
          onPress={() => props.navigation.navigate( 'Dish', { dishId: item.id })}
          imageSrc={{ uri: baseUrl + item.image }}
        />
      </Animatable.View>   
    )
  }

  if(props.dishes.isLoading) {
    return (
      <Loading />
    )
  } else if(props.dishes.errMess) {
    return (
      <View>
        <Text>
          {props.dishes.errMess}
        </Text>
      </View>
    )
  } else {
    return (
      <FlatList 
        data={props.dishes.dishes} 
        renderItem={MenuItem} 
        keyExtractor={item => item.id.toString()} 
      />
    )
  }
}

export default connect(mapStateToProps)(Menu)