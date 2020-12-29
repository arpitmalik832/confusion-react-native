import React from 'react'
import { StyleSheet } from 'react-native'
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator()

const MenuNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Menu'
      headerMode='screen'
      screenOptions={{ 
        headerStyle: styles.navigatorHeader,
        headerTintColor: '#fff',
        headerTitleAlign: 'left',
        headerTitleStyle: styles.navigatorHeaderTitle
      }}
    >
      <Stack.Screen 
          name='Menu' 
          component={Menu} 
          options={{
              title: 'Dish'
          }}
      />
      <Stack.Screen 
          name='Dish' 
          component={DishDetail} 
          options={{
              title: 'Dish Details'
          }}
      />
    </Stack.Navigator>
  )
}

const Main = (props) => {
  return (
    <NavigationContainer>
     <MenuNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  navigatorHeader: {
    backgroundColor: '#512DA8' 
  },
  navigatorHeaderTitle: {  
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default Main