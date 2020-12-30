import React, { Component } from "react"
import { StyleSheet, Text } from "react-native"
import { Card } from "react-native-elements"

class Contact extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (    
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
      </Card>
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