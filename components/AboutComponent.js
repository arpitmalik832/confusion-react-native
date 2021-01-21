import React from 'react'
import { StyleSheet, Text, ScrollView, FlatList } from 'react-native'
import { Avatar, Card, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import Loading from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'

const mapStateToProps = state => {
  return {
    leaders: state.leaders
  }
}

const History = (props) => {
  return (
    <Card
      containerStyle={[
        styles.margin_height_5,
        styles.radius_10
      ]}
    >
      <Card.Title
        style={[styles.color_black]}
      >
        Our History
      </Card.Title>
      <Card.Divider />
      <Text
        style={[
          styles.color_black,
          styles.padding_width_10,
          {
            paddingBottom: 10
          }
        ]}
      >
        Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.{"\n\n"}
        The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
      </Text>
    </Card>
  )
}

const RenderLeaders = (props) => {
  return (
    <Card
      containerStyle={[
        styles.margin_height_5,
        styles.radius_10
      ]}
    >
      <Card.Title
        style={[styles.color_black]}
      >
        Corporate Leadership
      </Card.Title>
      <Card.Divider />
      {(
        props.leaders.isLoading &&
        <Loading />
      ) || (
        props.leaders.errMess && 
        <Text>
          {props.leaders.errMess}
        </Text>
      ) || (
        props.leaders.leaders.map((item, index) => (
          <ListItem
            key={index}
          >
            <Avatar
              rounded
              size='medium'
              source={{ uri: baseUrl + item.image }}
            />
            <ListItem.Content>
              <ListItem.Title
                style={[
                  styles.bold,
                  styles.color_black
                ]}
              >
                {item.name}
              </ListItem.Title>
              <ListItem.Subtitle
                numberOfLines={15}
                style={[styles.color_black]}
              >
                {item.description}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      )}
    </Card>
  )
}

const About = (props) => {
  return (
    <ScrollView
      contentContainerStyle={[
        styles.padding_height_5
      ]}
    >
      <Animatable.View
        animation='fadeInDown'
        duration={2000}
        delay={1000}
      >
        <History />
        <RenderLeaders 
          leaders={props.leaders} 
        />
      </Animatable.View>
    </ScrollView>
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
  radius_10: {
    borderRadius: 10
  },
  color_black: {
    color: 'black'
  },
  bold: {
    fontWeight: 'bold'
  }
})

export default connect(mapStateToProps)(About)