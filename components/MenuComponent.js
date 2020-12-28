import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

function Menu(props) {
    const renderMenuItem = ({ item, index }) => {
        return (
            <ListItem key={index} bottomDivider onPress={() => props.onPress(index)}>
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

const styles = StyleSheet.create({
    
})

export default Menu