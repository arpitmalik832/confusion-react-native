import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Image, Platform, Alert, Text } from 'react-native'
import { Icon, Input, CheckBox, Button } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import * as ImageManipulator from 'expo-image-manipulator'
import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'
import { baseUrl } from '../shared/baseUrl'

const Tab = createBottomTabNavigator()

class LoginTab extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      remember: false
    }
  }

  componentDidMount() {
    if(Platform.OS !== 'web') {
      SecureStore.getItemAsync('userinfo')
        .then((userdata) => {
          let userinfo = JSON.parse(userdata)
          if (userinfo) {
            this.setState({
              username: userinfo.username,
              password: userinfo.password,
              remember: true
            })
          }
        })
    }
  }

  handleLogin = () => {
    console.log(JSON.stringify(this.state))
    if(Platform.OS === 'web') {
      if(!this.state.remember) {
        this.setState({
          username: '',
          password: ''
        })
      }
    } else {
      if (this.state.remember) {
        SecureStore.setItemAsync(
          'userinfo',
          JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
        )
          .catch((error) => {
            console.log('could not save user info', error)
          })    
      } else {
        SecureStore.deleteItemAsync('userinfo')
          .then(() => {
            this.setState({
              username: '',
              password: ''
            })
          })
          .catch((error) => {
            console.log('could not delete user info', error)
          })
      }
    }
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={[
          styles.padding_height_5
        ]}
      >
        <Input
          placeholder='Username'
          leftIcon={{
            type: 'font-awesome',
            name: 'user-o'
          }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={[
            {
              marginTop: 5
            },
            styles.padding_width_20
          ]}
        />
        <Input
          placeholder='Password'
          leftIcon={{
            type: 'font-awesome',
            name: 'key'
          }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={[styles.padding_width_20]}
        />
        <CheckBox
          title='Remember Me'
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={[ 
            {
              marginBottom: 5
            },
            styles.background_color_null 
          ]}
        />
        <View
          style={[
            styles.margin_height_5,
            styles.margin_width_20
          ]}
        >
          <Button
            title='Login'
            buttonStyle={[styles.background_color_primary]}
            icon={
              <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                color='white'
                style={[styles.margin_width_10]}
              />
            }
            onPress={() => this.handleLogin()}
          />
        </View>
        <View
          style={[
            styles.margin_height_5,
            styles.margin_width_20
          ]}
        >
          <Button
            title='Register'
            buttonStyle={[styles.background_color_null]}
            titleStyle={[styles.color_primary]}
            icon={
              <Icon
                name='user-plus'
                type='font-awesome'
                size={24}
                color='#512DA8'
                style={[styles.margin_width_10]}
              />
            }
            onPress={() => this.props.navigation.navigate('Register')}
          />
        </View>
      </ScrollView>
    )
  }
}

class RegisterTab extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      remember: false,
      imageUrl: baseUrl + 'images/logo.png'
    }
  }

  processImage = async (imageUri) => {
    let processedImage = await ImageManipulator.manipulateAsync(
      imageUri,
      [
        {
          resize: { width: 400 }
        }
      ],
      {
        format: 'png'
      }
    )
    this.setState({ imageUrl: processedImage.uri })
  } 

  getImageFromCamera = async () => {
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync()
    if(cameraPermission.status === 'granted') {
      let capturedImage = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      })

      if(!capturedImage.cancelled) {
        this.processImage(capturedImage.uri)
      }
    } else {
      Alert.alert(
        'Permission is Required',
        'Camera permission is required to continue',
        [
          {
            text: 'Ok',
            style: 'default'
          }
        ],
        {
          cancelable: false
        }
      )
    }
  }

  getImageFromGallery = async () => {
    const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if(galleryPermission.status === 'granted') {
      let selectedImage = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      })

      if(!selectedImage.cancelled) {
        this.processImage(selectedImage.uri)
      }
    } else {
      Alert.alert(
        'Permission is Required',
        'Gallery permission is required to continue',
        [
          {
            text: 'Ok',
            style: 'default'
          }
        ],
        {
          cancelable: false
        }
      )
    }
  }

  handleRegister = () => {
    console.log(JSON.stringify(this.state))
    if(Platform.OS === 'web') {
      if(!this.state.remember) {
        this.setState({
          username: '',
          password: '',
          firstname: '',
          lastname: '',
          email: '',
          imageUrl: baseUrl + 'images/logo.png'
        })
      }
    } else {
      if (this.state.remember) {
        SecureStore.setItemAsync(
          'userinfo',
          JSON.stringify({
            username: this.state.username,
            password: this.state.password
          })
        )
          .catch((error) => {
            console.log('could not save user info', error)
          })    
      } else {
        SecureStore.deleteItemAsync('userinfo')
          .then(() => {
            this.setState({
              username: '',
              password: '',
              firstname: '',
              lastname: '',
              email: '',
              imageUrl: baseUrl + 'images/logo.png'
            })
          })
          .catch((error) => {
            console.log('could not delete user info', error)
          })
      }
    }
  }

  render() {
    return (
      <ScrollView
        contentContainerStyle={[styles.margin_height_5]}
      >
        <View
          style={[
            styles.image_container,
            styles.margin_height_5,
            styles.margin_width_20
          ]}
        >
          <Image
            source={{ uri: this.state.imageUrl }}
            loadingIndicatorSource={require("./images/logo.png")}
            style={[styles.image]}
          />
          <Button
            title='Camera'
            buttonStyle={[styles.background_color_primary]}
            onPress={this.getImageFromCamera}
          />
          <Button
            title='Gallery'
            buttonStyle={[styles.background_color_primary]}
            onPress={this.getImageFromGallery}
          />
        </View>
        <Input
          placeholder='Username'
          leftIcon={{
            type: 'font-awesome',
            name: 'user-o'
          }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={[
            {
              marginTop: 5
            },
            styles.padding_width_20
          ]}
        />
        <Input
          placeholder='Password'
          leftIcon={{
            type: 'font-awesome',
            name: 'key'
          }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={[styles.padding_width_20]}
        />
        <Input
          placeholder='First Name'
          leftIcon={{
            type: 'font-awesome',
            name: 'user-o'
          }}
          onChangeText={(firstname) => this.setState({ firstname })}
          value={this.state.firstname}
          containerStyle={[styles.padding_width_20]}
        />
        <Input
          placeholder='Last Name'
          leftIcon={{
            type: 'font-awesome',
            name: 'user-o'
          }}
          onChangeText={(lastname) => this.setState({ lastname })}
          value={this.state.lastname}
          containerStyle={[styles.padding_width_20]}
        />
        <Input
          placeholder='Email'
          leftIcon={{
            type: 'font-awesome',
            name: 'envelope-o'
          }}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          containerStyle={[styles.padding_width_20]}
        />
        <CheckBox
          title='Remember Me'
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={[
            {
              marginBottom: 5
            },
            styles.background_color_null
          ]}
        />
        <View
          style={[
            styles.margin_height_5,
            styles.margin_width_20
          ]}
        >
          <Button
            title='Register'
            buttonStyle={[styles.background_color_primary]}
            icon={
              <Icon
                name='user-plus'
                type='font-awesome'
                size={24}
                color='white'
                style={[styles.margin_width_10]}
              />
            }
            onPress={() => this.handleRegister()}
          />
        </View>
      </ScrollView>
    )
  }
}

const Login = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 12  
        },
        tabStyle: {
          height: '100%',
          paddingTop: 5,
          paddingBottom: 5
        },
        style: {
          height: '8%'
        }
      }}
    >
      <Tab.Screen
        name='Login'
        component={LoginTab}
        options={(props) => {
          return ({
            title: 'Login',
            tabBarIcon: ({ color }) => {
              return (
                <Icon 
                  name="sign-in"
                  type='font-awesome'
                  size={24}
                  color={color}
                />
              )
            }
          })
        }}
      />
      <Tab.Screen
        name='Register'
        component={RegisterTab}
        options={(props) => {
          return ({
            title: 'Register',
            tabBarIcon: ({ color }) => {
              return (
                <Icon 
                  name="user-plus"
                  type='font-awesome'
                  size={24}
                  color={color}
                />
              )
            }
          })
        }}
      /> 
    </Tab.Navigator>
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
  color_black: {
    color: 'black'
  },
  color_primary: {
    color: '#512DA8'
  },
  background_color_null: {
    backgroundColor: null
  },
  background_color_primary: {
    backgroundColor: '#512DA8'
  },
  margin_width_20: {
    marginLeft: 20,
    marginRight: 20
  },
  image_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 60
  }
})

export default Login