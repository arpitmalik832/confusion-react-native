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
      modeDateTimePicker: 'date',
      showDateTimePicker: false,
      showReservation: false,
      guests: '1',
      smoking: false,
      datetime: new Date()
    }
  }

  changeShowReservation = () => {
    this.setState({
      showReservation: !this.state.showReservation
    })
  }

  resetReservationForm = () => {
    this.setState({ 
      guests: '1',
      smoking: false,
      datetime: new Date(),
      date: new Date(),
      time: new Date()
    })
  }

  submitReservation = () => {
    if(Platform.OS === 'web') {
      console.log(JSON.stringify(this.state))
      this.resetReservationForm()
    } else {
      Alert.alert(
        'Your Reservation OK?',
        'Number of Guests: ' + this.state.guests +
        '\nSmoking?: ' + this.state.smoking +
        '\nDate and Time: ' + this.getDateTime(),
        [{
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {
          text: 'Ok',
          onPress: async () => {
            console.log(JSON.stringify(this.state))
            this.changeShowReservation()
            await this.createCalenderEvent()
          },
          style: 'default'
        }],
        {
          cancelable: false
        }
      )
    }
  }

  getDefaultCalendarSource = async () => {
    const calendars = await Calendar.getCalendarsAsync();
    const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
    return defaultCalendars[0].source;
  }

  getCalendarSourceId = async () => {
    const defaultCalendarSource = (Platform.OS === 'ios') ? 
    await this.getDefaultCalendarSource()
    :{ 
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

  createCalenderEvent = async () => {
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

  showDatePicker = () => {
    this.setState({ 
      modeDateTimePicker: 'date',
      showDateTimePicker: true 
    })
  }

  onDateChange = (event, value) => {
    this.setState({
      showDateTimePicker: false
    })
    if(value !== undefined) {
      if(this.state.modeDateTimePicker === 'date') {
        this.setState({
          date: value,
          modeDateTimePicker: 'time',
          showDateTimePicker: true
        })
      } else {
        this.setState({
          time: value,
          modeDateTimePicker: 'date',
          showDateTimePicker: false
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
        <ScrollView
          contentContainerStyle={[styles.padding_height_5]}
        >
          <View 
            style={[
              {
                flexDirection: 'row'
              },
              styles.in_center,
              styles.padding_width_20,
              styles.padding_height_5
            ]}
          >
            <Text
              style={[{
                flex: 2,
                fontSize: 18,
                color: 'black'
              }]}  
            >
              Number of Guests
            </Text>
            <Picker
              style={[{
                flex: 1,
                height: '100%'
              }]}
              selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
            >
              <Picker.Item label='1' value='1' />
              <Picker.Item label='2' value='2' />
              <Picker.Item label='3' value='3' />
              <Picker.Item label='4' value='4' />
              <Picker.Item label='5' value='5' />
              <Picker.Item label='6' value='6' />
            </Picker>
          </View>
          <View 
            style={[
              {
                flexDirection: 'row'
              },
              styles.in_center,
              styles.padding_width_20,
              styles.padding_height_5
            ]}
          >
            <Text
              style={[{
                flex: 2,
                fontSize: 18,
                color: 'black'
              }]}  
            >
              Smoking/Non-smoking?
            </Text>
            <Switch
              value={this.state.smoking}
              onTintColor='#512DA8'
              onValueChange={(value) => this.setState({ smoking: value })}
            />
          </View>
          {(
            Platform.OS !== 'web' &&
            <View 
              style={[
                {
                  flexDirection: 'row'
                },
                styles.in_center,
                styles.padding_width_20,
                styles.padding_height_5
              ]}
            >
              <Text
                style={[{
                  flex: 2,
                  fontSize: 18,
                  color: 'black'
                }]}  
              >
                Date and Time
              </Text>
              <TouchableOpacity
                style={[{
                  flex: 1
                }]}
                onPress={this.showDatePicker}
              >
                <Text
                  style={[{
                    fontSize: 14
                  }]}
                >
                  {this.getDateTime()}
                </Text>
              </TouchableOpacity>
              {(
                this.state.showDateTimePicker &&
                <DateTimePicker
                  value={new Date()}
                  mode={this.state.modeDateTimePicker}
                  display='default'
                  onChange={(event, value) => this.onDateChange(event, value)}
                />
              )}
            </View>
          )}
          <View 
            style={[
              {},
              styles.padding_width_20,
              styles.padding_height_10
            ]}
          >
            <Button
              title='Reserve'
              color='#512DA8'
              onPress={() => this.submitReservation()}
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
              visible={this.state.showReservation}
              onDismiss={() => { 
                this.changeShowReservation()
                this.resetReservationForm()
              }}
              onRequestClose={() => { 
                this.changeShowReservation()
                this.resetReservationForm()
              }}
            >
              <View
                style={[styles.modalContainer]}
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
                  onPress={() => { this.changeShowReservation(); this.resetReservationForm(); }}
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
  in_center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalContainer: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
})

export default Reservation