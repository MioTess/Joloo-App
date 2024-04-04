import React, { useState } from 'react'
import { Modal, View, Text,StyleSheet, Button } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

    const Point = () =>{
    const [isModalVisible, setModalVisible] = useState(false) ;
        return (
        <View>
            <Button 
            title = "Илгээх"
            onPress={() => setModalVisible(true)}
            color= "midnightblue"
            />
            <Modal
                visible = {isModalVisible}
                onRequestClose={()=> setModalVisible(false)}
                animationType='slide'
            
            >
                <View style={{flex: 1,
                backgroundColor : "lightblue",
                alignItems : 'center',
                justifyContent:'center'
            }}>
                    <View style ={{
                        backgroundColor: 'white',
                        width: '90%',
                        borderRadius: '20',
                        padding: '20',
                        alignItems:'center'
                    }}>
                        <Text style ={ {fontSize: 30, fontWeight:"bold"}} > {onoo>(AllQuestion.length/2)? 'Тэнцлээ' : 'Тэнцсэнгүй'} </Text>
                        <View style = {{
                            flexDirection: 'row',
                            justifyContent:'flex-start',
                            alignItems:'center',
                            marginVertical:20
                        }}>
                            <Text style={{
                                fontSize:30,
                                color: onoo>(AllQuestion.length/2) ? Colors.success : Colors.error
                            }}>{onoo} </Text>
                            <Text>/ {AllQuestion.length}</Text>

                        </View>
                    
                    </View>

                    
                    

                </View>
            </Modal>            
        </View>
        )
    }
    

const styles = StyleSheet.create({})
export default Point;
/*<Button 
title = "Дахин эхлэх"
color = "midnightblue"
onPress={()=> setModalVisible(false)}
/>*/