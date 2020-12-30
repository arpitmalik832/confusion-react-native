import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import { Icon } from 'react-native-elements'
import Home from './HomeComponent'
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Contact from './ContactComponent'
import About from './AboutComponent'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const MenuNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Menu'
      headerMode='screen'
      screenOptions={{ 
        headerStyle: [styles.navigatorHeader],
        headerTintColor: '#fff',
        headerTitleAlign: 'left',
        headerTitleStyle: [styles.navigatorHeaderTitle]
      }}
    >
      <Stack.Screen 
          name='Menu' 
          component={Menu} 
          options={(props) => {
            return ({
              title: 'Menu',
              headerLeft: () => {
                return (
                  <Icon
                    name="menu"
                    color="#fff"
                    containerStyle={[styles.navigatorHeaderLeft]}
                    onPress={() => props.navigation.openDrawer()}
                  />
                )
              }
            })
          }}
      />
      <Stack.Screen 
          name='Dish' 
          component={DishDetail} 
          options={(props) => {
            return ({
              title: 'Dish Details'
            })
          }}
      />
    </Stack.Navigator>
  )
}

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      headerMode='screen'
      screenOptions={{
        headerStyle: [styles.navigatorHeader],
        headerTintColor: '#fff',
        headerTitleAlign: 'left',
        headerTitleStyle: [styles.navigatorHeaderTitle]
      }}
    >
      <Stack.Screen
        name='Home'
        component={Home}
        options={(props) => {
          return ({
            title: 'Home',
            headerLeft: () => {
              return (
                <Icon 
                  name="menu"
                  color="#fff"
                  containerStyle={[styles.navigatorHeaderLeft]}
                  onPress={() => props.navigation.openDrawer()} 
                />
              )
            }
          })
        }}
      />
    </Stack.Navigator>
  )
}

const ContactNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Contact'
      headerMode='screen'
      screenOptions={{
        headerStyle: [styles.navigatorHeader],
        headerTintColor: '#fff',
        headerTitleAlign: 'left',
        headerTitleStyle: [styles.navigatorHeaderTitle]
      }}
    >
      <Stack.Screen
        name='Contact'
        component={Contact}
        options={(props) => {
          return ({
            title: '',
            headerLeft: () => {
              return (
                <Icon 
                  name="menu"
                  color="#fff"
                  containerStyle={[styles.navigatorHeaderLeft]}
                  onPress={() => props.navigation.openDrawer()} 
                />
              )
            }
          })
        }}
      />
    </Stack.Navigator>
  )
}

const AboutNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='About'
      headerMode='screen'
      screenOptions={{
        headerStyle: [styles.navigatorHeader],
        headerTintColor: '#fff',
        headerTitleAlign: 'left',
        headerTitleStyle: [styles.navigatorHeaderTitle]
      }}
    >
      <Stack.Screen
        name='About'
        component={About}
        options={(props) => {
          return ({
            title: 'About Us',
            headerLeft: () => {
              return (
                <Icon 
                  name="menu"
                  color="#fff"
                  containerStyle={[styles.navigatorHeaderLeft]}
                  onPress={() => props.navigation.openDrawer()} 
                />
              )
            }
          })
        }}
      />
    </Stack.Navigator>
  )
}

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName='HomeNavigator'
      drawerPosition='left'
      drawerStyle={[styles.drawer]}
    >
      <Drawer.Screen
        name='HomeNavigator'
        component={HomeNavigator}
        options={{
          title: 'HomeNavigator',
          drawerLabel: 'Home'
        }}
      />
      <Drawer.Screen
        name='AboutNavigator'
        component={AboutNavigator}
        options={{
          title: 'AboutNavigator',
          drawerLabel: 'About Us'
        }}
      />
      <Drawer.Screen
        name='MenuNavigator'
        component={MenuNavigator}
        options={{
          title: 'MenuNavigator',
          drawerLabel: 'Menu'
        }}
      />  
      <Drawer.Screen
        name='ContactNavigator'
        component={ContactNavigator}
        options={{
          title: 'ContactNavigator',
          drawerLabel: 'Contact Us'
        }}
      />  
    </Drawer.Navigator>
  )
}

const Main = (props) => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#D1C4E9'
  },
  navigatorHeader: {
    height: Platform.OS === 'ios' ? 0 : 60,
    backgroundColor: '#512DA8'
  },
  navigatorHeaderTitle: {  
    color: '#fff',
    fontWeight: 'bold'
  },
  navigatorHeaderLeft: {
    paddingLeft: 15
  }
})

export default Main