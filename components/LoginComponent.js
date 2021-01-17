import React, { Component } from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { Card, Icon, Input, CheckBox } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store'
import { Platform } from 'react-native'

class Login extends Component {
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
      <View
        style={[styles.container]}
      >
        <Input
          placeholder='Username'
          leftIcon={{
            type: 'font-awesome',
            name: 'user-o'
          }}
          onChangeText={(username) => this.setState({ username })}
          value={this.state.username}
          containerStyle={[styles.formInput]}
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
          containerStyle={[styles.formCheckBox]}
        />
        <View
          style={[styles.formButton]}
        >
          <Button
            title='Login'
            color='#512DA8'
            onPress={() => this.handleLogin()}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    margin: 20
  },
  formInput: {
    marginTop: 40,
    marginBottom: 40,
    paddingStart: 40,
    paddingEnd: 40
  },
  formCheckBox: {
    marginTop: 40,
    marginBottom: 40,
    paddingStart: 40,
    paddingEnd: 40,
    backgroundColor: null
  },
  formButton: {
    margin: 60
  }
})

export default Login