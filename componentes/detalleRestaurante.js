import React, { Component } from 'react' ;
import { Card, ListItem, Button, Icon, Text, Image } from 'react-native-elements'

class DetalleExcursion extends Component {
        render(){
            return(
                <Card>
                     <Card.Title>CARD WITH DIVIDER</Card.Title>  
                     <Card.Divider/>
                    <Image style={{width: '50%'}} source={require('../assets/images/mafia.jpg')} resizeMode='cover'/>
                    <Text style={{marginBottom: 10}}>
                            The idea with React Native Elements is more about component structure than actual design.
                    </Text>
                    <Button
                            icon={<Icon name='' color='#ffffff' />}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, backgroundColor:'#c136f4'}}
                            title='Reservar' />
                    
                </Card>
                
            )

        }
        }


export default DetalleExcursion;

// #c136f4 color de la app