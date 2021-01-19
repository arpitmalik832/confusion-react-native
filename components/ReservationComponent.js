import React, { Component } from 'react'
import { Platform, StyleSheet, View, ScrollView, Text, Switch, Button, Modal, Alert, ToastAndroid } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as Animatable from 'react-native-animatable'
import * as Calendar from 'expo-calendar'

class Reservation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
      time: new Date(),
      mode: 'date',
      show: false,
      showModal: false,
      guests: '1',
      smoking: false,
      datetime: new Date()
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
      datetime: new Date(),
      date: new Date(),
      time: new Date()
    })
  }

  handleReservation = () => {
    Platform.OS === 'web' ?
    () => {
      console.log(JSON.stringify(this.state))
      this.resetForm()
    }
    :
    Alert.alert(
      'Your Reservation OK?',
      'Number of Guests: ' + this.state.guests +
      '\nSmoking?: ' + this.state.smoking +
      '\nDate and Time: ' + this.getDateTime(),
      [
        {
          text: 'Cancel',
          onPress: () => {
          },
          style: 'cancel'
        },
        {
            text: 'Ok',
            onPress: async () => {
              console.log(JSON.stringify(this.state))
              this.toggleModal()
              await this.createEvent()
            },
            style: 'default'
        }
      ],
      {
        cancelable: false
      }
    )
  }

  getDefaultCalendarSource = async () => {
    const calendars = await Calendar.getCalendarsAsync();
    const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
    return defaultCalendars[0].source;
  }

  getCalendarSourceId = async () => {
    const defaultCalendarSource = (Platform.OS === 'ios') ? 
    await this.getDefaultCalendarSource()
    :
    { 
      isLocalAccount: true, 
      name: 'Con Fusion Calendar' 
    }

    const calendarSourceId = await Calendar.createCalendarAsync({
      title: 'Con Fusion Reservation Calendar',
      color: '#512DA8',
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: defaultCalendarSource.id,
      source: defaultCalendarSource,
      name: 'Con Fusion Reservation Calendar',
      ownerAccount: 'personal',
      accessLevel: Calendar.CalendarAccessLevel.OWNER
    })
    return calendarSourceId
  }

  createEvent = async () => {
    const calendarPermission = await Calendar.requestCalendarPermissionsAsync()
    if(calendarPermission.status === 'granted') {
      const calendarSourceId = await this.getCalendarSourceId()

      Calendar.createEventAsync(
        calendarSourceId,
        {
          title: 'Con Fusion Table Reservation',
          notes: 'Please read our guidelines from the website before coming to the resturant',
          startDate: this.state.datetime,
          endDate: this.state.datetime,
          location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, HONG KONG'
        }
      )
      .then(() => {
        ToastAndroid.show(
          'Event is created in your calendar',
          ToastAndroid.LONG
        )
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  showDateTimePicker = () => {
    this.setState({ 
      mode: 'date',
      show: true 
    })
  }

  onDateChange = (event, value) => {
    this.setState({
      show: false
    })
    if(value !== undefined) {
      if(this.state.mode === 'date') {
        this.setState({
          date: value,
          mode: 'time',
          show: true
        })
      } else {
        this.setState({
          time: value,
          mode: 'date',
          show: false
        })
      }
      this.setState({
        datetime: this.combineDateTime()
      })
    }
  }

  combineDateTime = () => {
    return new Date(
      this.state.date.getFullYear(),
      this.state.date.getMonth(),
      this.state.date.getDate(),
      this.state.time.getHours(),
      this.state.time.getMinutes(),
      this.state.time.getSeconds(),
      this.state.time.getMilliseconds()
    )
  }

  getDateTime = () => {
    const dd = String(this.state.datetime.getDate()).padStart(2, '0')
    const mm = String(this.state.datetime.getMonth() + 1).padStart(2, '0')
    const yyyy = this.state.datetime.getFullYear()
    const hh = String(this.state.datetime.getHours()).padStart(2, '0')
    const MM = String(this.state.datetime.getMinutes()).padStart(2, '0')
    const ss = String(this.state.datetime.getSeconds()).padStart(2, '0')
    return dd + '/' + mm + '/' + yyyy + ' ' + hh + ':' + MM + ':' + ss
  }

  render() {
    return (
      <Animatable.View
        animation='zoomIn'
        duration={2000}
      >
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
                  Date and Time
                </Text>
                <TouchableOpacity
                  style={[styles.formItem]}
                  onPress={this.showDateTimePicker}
                >
                  <Text>
                    {this.getDateTime()}
                  </Text>
                </TouchableOpacity>
              </View>
              {
                this.state.show &&
                <DateTimePicker
                  value={new Date()}
                  mode={this.state.mode}
                  display='default'
                  onChange={(event, value) => this.onDateChange(event, value)}
                />
              }
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
                  Date and Time: {this.getDateTime()}
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
      </Animatable.View>
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