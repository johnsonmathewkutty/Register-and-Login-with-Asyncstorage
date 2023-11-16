import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View,StyleSheet,Text,TextInput,TouchableOpacity, Alert} from "react-native";


const Register=({navigation})=>{
  const [input,setinput]=useState({
    fullname:'',mobileno:'',email:'',password:''
  })
    const handleonchange= (text, input) => {
        setinput((prevState) => {
          if (text ==='') {
            return { ...prevState, [input]: '' };
          }else{
          return { ...prevState, [input]: text };
          }
        });
      };
       
 
      const handleerror=()=>{
        
      }
 
      const handleRegister = async () => {
        if(input.email=='' || input.mobileno=='' || input.password==''){
          Alert.alert('all fields required')
        }else{
        try {
          // Check if data already exists
          const existingData = await AsyncStorage.getItem('userData');
          if (existingData) {
            // Data exists, parse and check for conflicts
            const parsedData = JSON.parse(existingData);
            if (parsedData.email === input.email) {
              // Email already exists, show an alert
              Alert.alert('Error', 'User with this email already exists.');
              return;
            }
          }
    
          // Data doesn't exist or no conflicts, store the data
          await AsyncStorage.setItem('userData', JSON.stringify(input));
          Alert.alert('Success', 'User registered successfully!');
        } catch (error) {
          console.error('Error:', error);
        }
      };
    }
    return(
        <View style={styles.container}>
      <Text style={styles.headtext}>Register</Text>
      <View style={styles.textinputcontainer}>
      <TextInput style={styles.textinput} placeholder="full name"
      onChangeText={(text)=>handleonchange(text,'fullname')}
      />
      <TextInput style={styles.textinput} placeholder="mobile no"
      onChangeText={(text)=>handleonchange(text,'mobileno')}/>
      <TextInput style={styles.textinput} placeholder="email"
      onChangeText={(text)=>handleonchange(text,'email')}
     />
      <TextInput style={styles.textinput} placeholder="password"
      onChangeText={(text)=>handleonchange(text,'password')}/>
      </View>
      <TouchableOpacity style={styles.button}>
            <Text style={styles.buttontext}onPress={()=>handleRegister()}>Register</Text>
         </TouchableOpacity>
         <View style={styles.textcontainer}>
            <Text style={{fontSize:17,fontWeight:'500'}}>Already have an account?</Text>
            <TouchableOpacity>
                <Text style={{fontSize:18,fontWeight:'500',color:'#48C9B0',marginLeft:5}}onPress={()=>navigation.navigate('Login')}>Login</Text>
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
        justifyContent:'center',
    },
    headtext:{
        fontSize:30,
        fontWeight:'bold',
        color:'#48C9B0',
        marginBottom:40
       },
       textinput:{
        width:'80%',
        height:50,
        borderWidth:1,
        borderRadius:6,
        alignSelf:'center',
        marginTop:20,
        paddingLeft:10,
    },
    textinputcontainer:{
        width:'100%',
        height:300,
    },
    button:{
        height:50,
        width:'80%',
        backgroundColor:'#48C9B0',
        borderRadius:6,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    buttontext:{
        color:'#fff',
        fontSize:28,
        fontWeight:'900',
    },
    textcontainer:{
        flexDirection:'row',
        marginTop:18
      },
})
export default Register;