import React from "react"
import { StyleSheet, Text } from "react-native"
import { Card, Button, Icon } from "react-native-elements"
import * as Animatable from 'react-native-animatable'
import * as MailComposer from 'expo-mail-composer'

const Contact = (props) => {
  const sendMail = () => {
    MailComposer.composeAsync({
      recipients: [
        'confusion@food.net'
      ],
      subject: 'Enquiry',
      body: 'To whom it may concern:'
    })
  }

  return (  
    <Animatable.View
      animation='fadeInDown'
      duration={2000}
      delay={1000}
    > 
      <Card
        containerStyle={[
          styles.margin_height_10,
          styles.radius_10
        ]}
      >
        <Card.Title
          style={[styles.color_black]}
        >
          Contact Information
        </Card.Title>
        <Card.Divider />
        <Text
          style={[
            {
              paddingBottom: 10
            },
            styles.color_black,
            styles.bold,
            styles.padding_width_10
          ]}
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
            backgroundColor: '#512DA8'
          }}
          icon={
            <Icon
              name='envelope-o'
              type='font-awesome'
              color='white'
              style={[styles.margin_width_10]}
            />
          }
          onPress={sendMail}
        />
      </Card>
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  padding_width_10: {
    paddingLeft: 10,
    paddingRight: 10
  },
  margin_height_10: {
    marginTop: 10,
    marginBottom: 10
  },
  margin_width_10: {
    marginLeft: 10,
    marginRight: 10
  },
  radius_10: {
    borderRadius: 10
  },
  bold: {
    fontWeight: 'bold'
  },
  color_black: {
    color: 'black'
  }
})

export default Contact