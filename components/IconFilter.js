import React from 'react';
import {View, Text, Image, FlatList, StyleSheet } from 'react-native';


const IconFilter = ({category}) => {

   
    console.log('Category:', category);

    let imageSource; //image source variable
    //Set the image source variable
    if (category === "Meat") {
        imageSource = require('../assets/icons/meat_icon.png');
    } else if (category === "Fruit") {
        imageSource = require('../assets/icons/fruit_icon.png');
    } else if (category === "Vegetable") {
        imageSource = require('../assets/icons/vegetable_icon.png');
    } else if (category === "Grain") {
        imageSource = require('../assets/icons/carb_icon.png');
    } else if (category === "Dairy") {
        imageSource = require('../assets/icons/dairy_icon.png');
    } else if (category === "Sweet") {
        imageSource = require("../assets/icons/sweet_icon.png");
    } else if (category === "Juice") {
        imageSource = require("../assets/icons/juice_icon.png");
    } else {
        imageSource = require("../assets/favicon.png");
    }

    // display the image in react native
    return (
        <View style={styles.item}>
            <Image source={imageSource}
                    style={styles.image}
                    resizeMode="contain"
            />
        </View>
    )
};

//styles for the icons
const styles = StyleSheet.create({
    item: {
        flexDirection:'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        //image sizes are controlled here
        width: 60,
        height: 60,
        marginRight: 10,
    },
});

export default IconFilter;