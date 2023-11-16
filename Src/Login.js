import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View,StyleSheet,Image,Text,TextInput,TouchableOpacity, Alert} from "react-native";

const Login=({navigation})=>{
    const [email,setemail]=useState()
    const [password,setpassword]=useState()

    const handleuserlogin= async()=>{
     if(email=='' || password==''){
        Alert.alert('this fields are required')
     }
     else{
        try{
            const existingdata=await AsyncStorage.getItem('userData');
            if(existingdata){
                const parsedata=JSON.parse(existingdata);
                if(parsedata.email===email && parsedata.password=== password){
                    navigation.navigate('Home',email)
                }else{
                    Alert.alert('user not found')
                }
            }
        }catch(error){
            console.log('error',Error)
        }
     }
    }
    return(
        <View style={styles.container}>
         <View style={styles.imagecontainer}>
           <Image source={require('../Src/Images/mykareicon.png')} style={styles.image}/> 
         </View>
         <Text style={styles.headtext}>Login</Text>
         <View style={styles.textinputcontainer}>
         <TextInput style={styles.textinput} placeholder="Email id"
         onChangeText={(text)=>setemail(text)}/>
         <TextInput style={styles.textinput} placeholder="Password"
         onChangeText={(text)=>setpassword(text)}/>
         </View>
         <TouchableOpacity style={styles.button} onPress={()=>handleuserlogin()}>
            <Text style={styles.buttontext}>Login</Text>
         </TouchableOpacity>
         <View style={styles.textcontainer}>
            <Text style={{fontSize:17,fontWeight:'500'}}>Don't have an account?</Text>
            <TouchableOpacity>
                <Text style={{fontSize:18,fontWeight:'500',color:'#48C9B0',marginLeft:5}} onPress={()=>navigation.navigate('Register')}>Register</Text>
            </TouchableOpacity>
         </View>
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    imagecontainer:{
        width:'50%',
        height:'15%',
    },
    image:{
        width:'90%',
        height:'90%',
        borderRadius:8,
        alignSelf:'center'
    },
    headtext:{
     fontSize:30,
     fontWeight:'bold',
     color:'#48C9B0',
     marginTop:70
    },
    textinput:{
        width:'80%',
        height:50,
        borderWidth:1,
        borderRadius:6,
        alignSelf:'center',
        marginTop:15,
        paddingLeft:15
    },
    textinputcontainer:{
        width:'100%',
        height:150,
        marginTop:20
    },
    button:{
        height:50,
        width:'80%',
        backgroundColor:'#48C9B0',
        borderRadius:6,
        marginTop:15,
        justifyContent:'center',
        alignItems:'center',
    },
    buttontext:{
        color:'#fff',
        fontSize:28,
        fontWeight:'900'
    },
    textcontainer:{
      flexDirection:'row',
      marginTop:30,
    },
    })
export default Login;