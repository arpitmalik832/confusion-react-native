import React, { Component } from 'react'
import { StyleSheet, Platform, View, Text, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import Login from './LoginComponent'
import Home from './HomeComponent'
import About from './AboutComponent'
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent'
import Contact from './ContactComponent'
import Favorites from './FavoriteComponent'
import Reservation from './ReservationComponent'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { fetchComments, fetchDishes, fetchLeaders, fetchPromos } from'../redux/ActionCreators'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return {
    
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchPromos: () => dispatch(fetchPromos())
})

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const LoginNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Login'
      headerMode='screen'
      screenOptions={{
        headerStyle: [styles.navigatorHeader],
        headerTintColor: '#fff',
        headerTitleAlign: 'left',
        headerTitleStyle: [styles.navigatorHeaderTitle]
      }}
    >
      <Stack.Screen
        name='Login'
        component={Login}
        options={(props) => {
          return ({
            title: 'Login',
            headerLeft: () => {
              return (
                <Icon 
                  name="menu"
                  size={24}
                  color="#fff"
                  containerStyle={[styles.navigatorHeaderLeft]}
                  onPress={() => props.navigation.toggleDrawer()}
                />
              )
            }
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
                  size={24}
                  color="#fff"
                  containerStyle={[styles.navigatorHeaderLeft]}
                  onPress={() => props.navigation.toggleDrawer()}
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
                  size={24}
                  color="#fff"
                  containerStyle={[styles.navigatorHeaderLeft]}
                  onPress={() => props.navigation.toggleDrawer()}
                />
              )
            }
          })
        }}
      />
    </Stack.Navigator>
  )
}

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
                    size={24}
                    color="#fff"
                    containerStyle={[styles.navigatorHeaderLeft]}
                    onPress={() => props.navigation.toggleDrawer()}
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

const FavoritesNavigtor = () => {
  return (
    <Stack.Navigator
      initialRouteName='Favorites'
      headerMode='screen'
      screenOptions={{
        headerStyle: [styles.navigatorHeader],
        headerTintColor: '#fff',
        headerTitleAlign: 'left',
        headerTitleStyle: [styles.navigatorHeaderTitle]
      }}
    >
      <Stack.Screen
        name='Favorites'
        component={Favorites}
        options={(props) => {
          return ({
            title: 'My Favorites',
            headerLeft: () => {
              return (
                <Icon 
                  name="menu"
                  size={24}
                  color="#fff"
                  containerStyle={[styles.navigatorHeaderLeft]}
                  onPress={() => props.navigation.toggleDrawer()}
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
            title: 'Contact Us',
            headerLeft: () => {
              return (
                <Icon 
                  name="menu"
                  size={24}
                  color="#fff"
                  containerStyle={[styles.navigatorHeaderLeft]}
                  onPress={() => props.navigation.toggleDrawer()}
                />
              )
            }
          })
        }}
      />
    </Stack.Navigator>
  )
}

const ReservationNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Reservation'
      headerMode='screen'
      screenOptions={{
        headerStyle: [styles.navigatorHeader],
        headerTintColor: '#fff',
        headerTitleAlign: 'left',
        headerTitleStyle: [styles.navigatorHeaderTitle]
      }}
    >
      <Stack.Screen
        name='Reservation'
        component={Reservation}
        options={(props) => {
          return ({
            title: 'Reserve a Table',
            headerLeft: () => {
              return (
                <Icon 
                  name="menu"
                  size={24}
                  color="#fff"
                  containerStyle={[styles.navigatorHeaderLeft]}
                  onPress={() => props.navigation.toggleDrawer()}
                />
              )
            }
          })
        }}
      />
    </Stack.Navigator>
  )
}

const CustomDrawerContentComponent = (props) => {
  return (
    <DrawerContentScrollView 
      {...props}
      style={[styles.flex1]} 
    >
      <View 
        style={[styles.drawerHeader]}
      >
        <View 
          style={[styles.flex1]}
        >
          <Image
            source={require('./images/logo.png')}
            style={[styles.drawerLogo]}
          />
        </View>
        <View 
          style={[styles.flex2]}
        >
          <Text
            style={[styles.drawerHeaderText]}
          >
            Ristorante Con Fusion
          </Text>
        </View>
      </View>
      <DrawerItemList 
        {...props}
      />
    </DrawerContentScrollView>
  )
}

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName='HomeNavigator'
      drawerPosition='left'
      drawerStyle={[styles.drawer]}
      drawerContent={CustomDrawerContentComponent}
    >
      <Drawer.Screen
        name='LoginNavigator'
        component={LoginNavigator}
        options={{
          title: 'LoginNavigator',
          drawerLabel: 'Login',
          drawerIcon: ({ tintColor }) => {
            return (
              <Icon 
                name="sign-in"
                type="font-awesome"
                size={24}
                color={tintColor}
              />
            )
          }
        }}
      />
      <Drawer.Screen
        name='HomeNavigator'
        component={HomeNavigator}
        options={{
          title: 'HomeNavigator',
          drawerLabel: 'Home',
          drawerIcon: ({ tintColor }) => {
            return (
              <Icon 
                name="home"
                type="font-awesome"
                size={24}
                color={tintColor}
              />
            )
          }
        }}
      />
      <Drawer.Screen
        name='AboutNavigator'
        component={AboutNavigator}
        options={{
          title: 'AboutNavigator',
          drawerLabel: 'About Us',
          drawerIcon: ({ tintColor }) => {
            return (
              <Icon 
                name="info-circle"
                type="font-awesome"
                size={24}
                color={tintColor}
              />
            )
          }
        }}
      />
      <Drawer.Screen
        name='MenuNavigator'
        component={MenuNavigator}
        options={{
          title: 'MenuNavigator',
          drawerLabel: 'Menu',
          drawerIcon: ({ tintColor }) => {
            return (
              <Icon 
                name="list"
                type="font-awesome"
                size={24}
                color={tintColor}
              />
            )
          }
        }}
      />  
      <Drawer.Screen
        name='FavoritesNavigator'
        component={FavoritesNavigtor}
        options={{
          title: 'FavoritesNavigator',
          drawerLabel: 'My Favorites',
          drawerIcon: ({ tintColor }) => {
            return (
              <Icon 
                name="heart"
                type="font-awesome"
                size={24}
                color={tintColor}
              />
            )
          }
        }}
      />  
      <Drawer.Screen
        name='ContactNavigator'
        component={ContactNavigator}
        options={{
          title: 'ContactNavigator',
          drawerLabel: 'Contact Us',
          drawerIcon: ({ tintColor }) => {
            return (
              <Icon 
                name="address-card"
                type="font-awesome"
                size={22}
                color={tintColor}
              />
            )
          }
        }}
      />  
      <Drawer.Screen
        name='ReservationNavigator'
        component={ReservationNavigator}
        options={{
          title: 'ReservationNavigator',
          drawerLabel: 'Reserve a Table',
          drawerIcon: ({ tintColor }) => {
            return (
              <Icon 
                name="cutlery"
                type="font-awesome"
                size={22}
                color={tintColor}
              />
            )
          }
        }}
      /> 
    </Drawer.Navigator>
  )
}

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes()
    this.props.fetchComments()
    this.props.fetchLeaders()
    this.props.fetchPromos()
  }

  render() {
    return (
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  flex2: {
    flex: 2
  },
  drawer: {
    backgroundColor: '#D1C4E9'
  },
  drawerLogo: {
    margin: 10,
    width: 80,
    height: 60
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    minHeight: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  drawerHeaderText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
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

export default connect(mapStateToProps, mapDispatchToProps)(Main)