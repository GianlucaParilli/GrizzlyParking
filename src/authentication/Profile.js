
import { observer } from 'mobx-react';
import React from 'react';
import { Button, Text, View, StyleSheet, Image, Dimensions, ImageBackground, ScrollView, } from 'react-native';
import A from '../../lib/images/L_Lot.jpg'
import B from '../../lib/images/H_Lot.jpg'
import C from '../../lib/images/A_Lot2.jpg'
import D from '../../lib/images/I_Lot.jpg'
import E from '../../lib/images/F_Lot.jpg'
import F from '../../lib/images/Parking_Deck.jpg'

const { width: WIDTH } = Dimensions.get('window')
const { height: HEIGHT } = Dimensions.get('window')

export const Profile = observer(
    ({ navigation, ...props }) => {
        return (

            <View style={styles.background}>
                <ScrollView>
                    <View style={styles.scrollView}>
                  <Text style={styles.logoText}> Parking Lots </Text>



                    <View>
                        <Text style={styles.lotsText}>Lot H</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={B} style={styles.backgroundImage} />
                    </View>

{/* Default --> {assumed equation}

                    availibility = default%;
                        if user (parked) {
                            prompt("assume % of availability");
                                    //onces they answer: +20 stars
                                            --> with 1000 stars they get free starbucks.
                            availiability -= 20%; 
                        } 
                        
                        else {
                            after (hour) --> 
                        }
****************************************************************************************************

assumption: 50%;

if(parked):
    assumption += 10%; 
else if(!parked && hour = 1):
        assumption -= 10%;
        if(asssumption = 0%):
            assumption = assumption;
else: 
    assumption = assumption;

****************************************************************************************************
                        */}
                        

                    <View>
                        <Text style={styles.lotsText}>Lot A</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={C} style={styles.backgroundImage} />
                    </View>



                    <View>
                        <Text style={styles.lotsText}>Parking Deck</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={F} style={styles.backgroundImage} />
                    </View>



                    <View>
                        <Text style={styles.lotsText}>Lot F</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={E} style={styles.backgroundImage} />
                    </View>

                    



                    <View>
                        <Text style={styles.lotsText}>Lot I</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={D} style={styles.backgroundImage} />
                    </View>


                
                    <View>
                        <Text style={styles.lotsText}>Lot L</Text>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={A} style={styles.backgroundImage} />
                    </View>

                    <View style={styles.button}>
                        <Button title="Log Out" color="#0A5A45"
                            onPress={() => navigation.goBack()} />
                    </View>

                    </View>
                    </ScrollView>
            </View>
           
        );
    })

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingRight: 12,
        paddingLeft: 12
    },
    button: {
        alignSelf:'center',
        height: 100,
        width: 150,
        marginTop: 25,
       
    },  

    background: {
        backgroundColor: '#056f4b',
        height: HEIGHT,
        width: WIDTH,
    },
    imageContainer: {
        height: 185,
        shadowColor: 'black',
        shadowOpacity: 0.50,
        shadowOffset:{
                      width: 10,
                      height: 10
                     }
    },
    backgroundImage: {
        resizeMode: "cover",
        alignSelf: 'stretch',
        flex: 1,
        width: undefined,
        height: undefined,
        borderRadius: 15,
    },

    logoText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 40,
        opacity: 0.8,
        marginTop: 10,
        paddingBottom: 5,
    },

    lotsText: {
        color: 'rgba(255,255,255,0.9)',
        backgroundColor: '#0A5A45',
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 20,
        width: WIDTH - 18,
        height: 30,
        marginBottom: 10,
        marginTop: 10,
    },
});