import React, { Component, useState } from 'react'
import { Platform, StyleSheet, View, ScrollView, Text, Switch, Button, Modal } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { Card } from'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker'

class Reservation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: 'date',
      show: false,
      showModal: false,
      guests: '1',
      smoking: false,
      date: '',
      time: ''
    }
  }

  toggleModal = () => {
    this.setState({ 
      showModal: !this.state.showModal
    })
  }

  resetForm = () => {
    this.setState({ 
      guests: '1',
      smoking: false,
      date: '',
      time: ''
    })
  }

  handleReservation = () => {
    console.log(JSON.stringify(this.state))
    this.toggleModal()
  }

  showDatePicker = () => {
    this.setState({ mode: 'date' })
    this.setState({ show: true })
  }

  showTimePicker = () => {
    this.setState({ mode: 'time' })
    this.setState({ show: true })
  }

  onDateChange = (event, value) => {
    this.setState({ 
      [this.state.mode]: value,
      mode: 'date',
      show: false
    })
  }

  render() {
    return (
      <ScrollView>
        <View 
          style={[styles.formRow]}
        >
          <Text
            style={[styles.formLabel]}  
          >
            Number of Guests
          </Text>
          <Picker
            style={[styles.formItem]}
            selectedValue={this.state.guests}
            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
          >
            <Picker.Item
              label='1'
              value='1'
            />
            <Picker.Item
              label='2'
              value='2'
            />
            <Picker.Item
              label='3'
              value='3'
            />
            <Picker.Item
              label='4'
              value='4'
            />
            <Picker.Item
              label='5'
              value='5'
            />
            <Picker.Item
              label='6'
              value='6'
            />
          </Picker>
        </View>
        <View 
          style={[styles.formRow]}
        >
          <Text
            style={[styles.formLabel]}  
          >
            Smoking/Non-smoking?
          </Text>
          <Switch
            style={[styles.formSwitch]}
            value={this.state.smoking}
            onTintColor='#512DA8'
            onValueChange={(value) => this.setState({ smoking: value })}
          />
        </View>
        {
          Platform.OS === 'web' ?
          <>
          </>
          :
          <>
            <View 
              style={[styles.formRow]}
            >
              <Text
                style={[styles.formLabel]}  
              >
                Date
              </Text>
              <Button
                title="Pick Date"
                style={[styles.formItem]}
                color="#512DA8"
                onPress={() => this.showDatePicker()}
              />
            </View>
            <View 
              style={[styles.formRow]}
            > 
              <Text
                style={[styles.formLabel]}  
              >
                Time
              </Text>
              <Button
                title="Pick Time"
                style={[styles.formItem]}
                color="#512DA8"
                onPress={() => this.showTimePicker()}
              />
              {
                this.state.show &&
                <DateTimePicker
                  value={new Date(2021, 0, 1)}
                  mode={this.state.mode}
                  display='default'
                  onChange={(event, value) => this.onDateChange(event, value)}
                />
              }
            </View>
          </>
        }
        <View 
          style={[styles.formRow]}
        >
          <Button
            title='Reserve'
            color='#512DA8'
            onPress={() => this.handleReservation()}
            accessibilityLabel= 'Learn more about this purple button'
          />
        </View>
        {
          Platform.OS === 'web' ?
          <>
          </>
          :
          <Modal
            animationType='slide'
            transparent={false}
            visible={this.state.showModal}
            onDismiss={() => { 
              this.toggleModal()
              this.resetForm()
            }}
            onRequestClose={() => { 
              this.toggleModal()
              this.resetForm()
            }}
          >
            <View
              style={[styles.modal]}
            >
              <Text 
                style={[styles.modalTitle]}
              >
                Your Reservation
              </Text>
              <Text
                style={[styles.modalText]}
              >
                Number of Guests: {this.state.guests}
              </Text>
              <Text
                style={[styles.modalText]}
              >
                Smoking?: {this.state.smoking? 'Yes' : 'No'}
              </Text>
              <Text
                style={[styles.modalText]}
              >
                Date: {this.state.date}
              </Text>
              <Text
                style={[styles.modalText]}
              >
                Time: {this.state.time}
              </Text>
              <Button
                title="close"
                color="#512DA8"
                onPress={() => { this.toggleModal(); this.resetForm(); }}
              />
            </View>
          </Modal>
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  formSwitch: {

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
  }
})

export default Reservation