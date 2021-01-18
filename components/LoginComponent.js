import React, { Component } from 'react'
import { StyleSheet, View, Text, ScrollView, Image, Platform, Alert } from 'react-native'
import { Icon, Input, CheckBox, Button } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'
import * as ImagePicker from 'expo-image-picker'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { baseUrl } from '../shared/baseUrl'
import * as ImageManipulator from 'expo-image-manipulator'
import { Asset } from 'expo-asset'

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
      <ScrollView>
        <Input
          placeholder='Username'
          leftIcon={{
            type: 'font-awesome',
            name: 'user-o'
          }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={[styles.firstFormInput]}
        />
        <Input
          placeholder='Password'
          leftIcon={{
            type: 'font-awesome',
            name: 'key'
          }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={[styles.formInput]}
        />
        <CheckBox
          title='Remember Me'
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={[ styles.lastFormInput, styles.nullBackgroundColor ]}
        />
        <View
          style={[styles.formButton]}
        >
          <Button
            title='Login'
            buttonStyle={[styles.backgroundColorPrimary]}
            icon={
              <Icon
                name='sign-in'
                type='font-awesome'
                size={24}
                color='white'
                style={[styles.buttonIcon]}
              />
            }
            onPress={() => this.handleLogin()}
          />
        </View>
        <View
          style={[styles.formButton]}
        >
          <Button
            title='Register'
            buttonStyle={[styles.nullBackgroundColor]}
            titleStyle={[styles.colorPrimary]}
            icon={
              <Icon
                name='user-plus'
                type='font-awesome'
                size={24}
                color='#512DA8'
                style={[styles.buttonIcon]}
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

  handleRegister = () => {
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
      <ScrollView>
        <View
          style={[styles.imageContainer]}
        >
          <Image
            source={{ uri: this.state.imageUrl }}
            loadingIndicatorSource={require("./images/logo.png")}
            style={[styles.image]}
          />
          <Button
            title='Camera'
            buttonStyle={[styles.backgroundColorPrimary]}
            onPress={this.getImageFromCamera}
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
          containerStyle={[styles.firstFormInput]}
        />
        <Input
          placeholder='Password'
          leftIcon={{
            type: 'font-awesome',
            name: 'key'
          }}
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          containerStyle={[styles.formInput]}
        />
        <Input
          placeholder='First Name'
          leftIcon={{
            type: 'font-awesome',
            name: 'user-o'
          }}
          onChangeText={(firstname) => this.setState({ firstname })}
          value={this.state.firstname}
          containerStyle={[styles.formInput]}
        />
        <Input
          placeholder='Last Name'
          leftIcon={{
            type: 'font-awesome',
            name: 'user-o'
          }}
          onChangeText={(lastname) => this.setState({ lastname })}
          value={this.state.lastname}
          containerStyle={[styles.formInput]}
        />
        <Input
          placeholder='Email'
          leftIcon={{
            type: 'font-awesome',
            name: 'envelope-o'
          }}
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
          containerStyle={[styles.formInput]}
        />
        <CheckBox
          title='Remember Me'
          center
          checked={this.state.remember}
          onPress={() => this.setState({ remember: !this.state.remember })}
          containerStyle={[styles.lastFormInput, styles.nullBackgroundColor]}
        />
        <View
          style={[styles.formButton]}
        >
          <Button
            title='Register'
            buttonStyle={[styles.backgroundColorPrimary]}
            icon={
              <Icon
                name='user-plus'
                type='font-awesome'
                size={24}
                color='white'
                style={[styles.buttonIcon]}
              />
            }
            onPress={() => this.handleRegister()}
          />
        </View>
      </ScrollView>
    )
  }
}

const Login = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeBackgroundColor: '#9575CD',
        inactiveBackgroundColor: '#D1C4E9',
        activeTintColor: 'white',
        inactiveTintColor: 'gray'
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
  colorPrimary: {
    color: '#512DA8'
  },
  backgroundColorPrimary: {
    backgroundColor: '#512DA8'
  },
  nullBackgroundColor: {
    backgroundColor: null
  },
  firstFormInput: {
    marginTop: 20,
    marginBottom: 5,
    paddingStart: 20,
    paddingEnd: 20
  },
  formInput: {
    marginTop: 5,
    marginBottom: 5,
    paddingStart: 20,
    paddingEnd: 20
  },
  lastFormInput: {
    marginTop: 5,
    marginBottom: 10,
    paddingStart: 20,
    paddingEnd: 20
  },
  formButton: {
    marginTop: 10,
    marginBottom: 20,
    marginStart: 20,
    marginEnd: 20
  },
  buttonIcon: {
    marginLeft: 10,
    marginRight: 10
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  image: {
    margin: 10,
    width: 80,
    height: 60
  }
})

export default Login