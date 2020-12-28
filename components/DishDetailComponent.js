import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Card } from 'react-native-elements'

function RenderDish(props) {
    const dish = props.dish
    if(dish != null) {
        return (
            <Card containerStyle={styles.card}>
                <Card.Image source={require('./images/uthappizza.png')} style={styles.image} >
                    <Card.Title style={{color: '#fff'}}>{dish.name}</Card.Title>    
                </Card.Image>
                <Text style={styles.title}>
                    {dish.description}
                </Text>
            </Card>
        )
    } else {
        return (
            <View />
        )
    }
}

function DishDetail(props) {
    return (
        <RenderDish dish={props.dish} />
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 0, 
        borderRadius: 10 
    },
    image: {
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    title: {
        margin: 10
    }
})

export default DishDetail