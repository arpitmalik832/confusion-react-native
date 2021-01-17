import React, { Component } from "react"
import { StyleSheet, Text } from "react-native"
import { Card, Button, Icon } from "react-native-elements"
import * as Animatable from 'react-native-animatable'
import * as MailComposer from 'expo-mail-composer'

class Contact extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  sendMail() {
    MailComposer.composeAsync({
      recipients: [
        'confusion@food.net'
      ],
      subject: 'Enquiry',
      body: 'To whom it may concern:'
    })
  }

  render() {
    return (  
      <Animatable.View
        animation='fadeInDown'
        duration={2000}
        delay={1000}
      > 
        <Card
          containerStyle={[styles.card]}
        >
          <Card.Title>
            Contact Information
          </Card.Title>
          <Card.Divider />
          <Text
            style={[styles.cardDescription]}
          >
            121, Clear Water Bay Road{"\n"}
            Clear Water Bay, Kowloon{"\n"}
            HONG KONG{"\n"}
            Tel: +852 1234 5678{"\n"}
            Fax: +852 8765 4321{"\n"}
            Email:confusion@food.net
          </Text>
          <Button
            title="Send Mail"
            buttonStyle={{
              backgroundColor: '#512DA8',
            }}
            icon={
              <Icon
                name='envelope-o'
                type='font-awesome'
                color='white'
                style={{
                  marginLeft: 10,
                  marginRight: 10
                }}
              />
            }
            onPress={this.sendMail}
          />
        </Card>
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10
  },
  cardDescription: {
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
})

export default Contact