import React, { Component } from 'react'
import { StyleSheet, Text, ScrollView, FlatList } from 'react-native'
import { Avatar, Card, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import Loading from './LoadingComponent'
import * as Animatable from 'react-native-animatable'
import { SafeAreaView } from 'react-native'

const mapStateToProps = state => {
  return {
    leaders: state.leaders
  }
}

function History(props) {
  return (
    <Card
      containerStyle={[styles.card]}
    >
      <Card.Title>
        Our History
      </Card.Title>
      <Card.Divider />
      <Text
        style={[styles.cardDescription]}
      >
        Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.{"\n\n"}
        The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
      </Text>
    </Card>
  )
}

function RenderLeaders(props) {
  const renderLeader = ({ item, index }) => {
    return (
      <ListItem
        key={index}
      >
        <Avatar
          rounded
          size='large'
          source={{ uri: baseUrl + item.image }}
        />
        <ListItem.Content>
          <ListItem.Title
            style={[styles.listItemTitle]}
          >
            {item.name}
          </ListItem.Title>
          <ListItem.Subtitle
            numberOfLines={15}
            style={[styles.listItemSubtitle]}
          >
            {item.description}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    )
  }

  return (
    <Card
      containerStyle={[styles.card]}
    >
      <Card.Title>
        Corporate Leadership
      </Card.Title>
      <Card.Divider />
      <FlatList 
        data={props.leaders}
        renderItem={renderLeader}
        keyExtractor={item => item.id.toString()}
      />
    </Card>
  )
}

class About extends Component {
  render() {
    if(this.props.leaders.isLoading) {
      return (
        <ScrollView
          style={[styles.view]}
        >
          <History />
          <Card
            containerStyle={[styles.card]}
          >
            <Card.Title>
              Corporate Leadership
            </Card.Title>
            <Card.Divider />
            <Loading />
          </Card>
        </ScrollView>
      )
    } else if (this.props.leaders.errMess) {
      return (
        <ScrollView
          style={[styles.view]}
        >
          <Animatable.View
            animation='fadeInDown'
            duration={2000}
            delay={1000}
          >
            <History />
            <Card
              containerStyle={[styles.card]}
            >
              <Card.Title>
                Corporate Leadership
              </Card.Title>
              <Card.Divider />
              <Text>
                {this.props.leaders.errMess}
              </Text>
            </Card>
          </Animatable.View>
        </ScrollView>
      )
    } else {
      return (
        <ScrollView 
          style={[styles.view]}
        >
          <Animatable.View
            animation='fadeInDown'
            duration={2000}
            delay={1000}
          >
            <History />
            <RenderLeaders leaders={this.props.leaders.leaders} />
          </Animatable.View>
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  view: {
    paddingTop: 5,
    paddingBottom: 5
  },
  listItemTitle: {
    fontWeight: 'bold'
  },
  listItemSubtitle: {
    color: '#000' 
  },
  card: {
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5
  },
  cardDescription: {
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
})

export default connect(mapStateToProps)(About)