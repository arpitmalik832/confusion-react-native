import React from 'react'
import { FlatList } from 'react-native'
import { Avatar, Icon, ListItem } from 'react-native-elements'

function Menu(props) {
    const renderMenuItem = ({ item, index }) => {
        return (
            <ListItem key={index} bottomDivider>
                <Avatar rounded title={item.name} source={require('./images/uthappizza.png')} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>    
        )
    }

    return (
        <FlatList data={props.dishes} renderItem={renderMenuItem} keyExtractor={item => item.id.toString()} />
    )
}

export default Menu