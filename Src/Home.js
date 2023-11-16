import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState} from "react";
import { View,StyleSheet,Text,TouchableOpacity} from "react-native";
import { useNavigation} from "@react-navigation/native";

const Home=({route})=>{
    const [userdetail,setuserdetail]=useState(false)
    const [userdata,setuserdata]=useState()
    const navigation=useNavigation();
    const {email}=route.params;
    useEffect(()=>{
        console.log('the email id',email)
     fetchuserdata()
    },[email])
    const handleLogout = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      };
    const fetchuserdata=async()=>{
        try{
            const existingdata=await AsyncStorage.getItem('userData');
            if(existingdata){
                const userdatas=JSON.parse(existingdata);
                const user = userdatas.find(u => u.email === email);
                if(user.email===email){
                  setuserdata(user)
                }
            }
        }catch(error){
            console.log('error',Error)
      }
    } 
    return(
        <View style={styles.container}>
         <Text style={styles.subtext}>Welcome to the Home page</Text>
         <TouchableOpacity style={styles.button}onPress={()=>{setuserdetail(true)}}>
            <Text style={styles.buttontext}>user Details</Text>
         </TouchableOpacity>
         {userdetail===true &&(
         <View style={styles.usercontainer}>
            <Text style={styles.userheadtext}>User Details</Text>
            <View>
            <Text style={styles.userdatatext}>user name: {userdata.fullname}</Text>
            <Text style={styles.userdatatext}>Email id: {userdata.email}</Text>
            <Text style={styles.userdatatext}>phone number: {userdata.mobileno}</Text>
            </View>
            <TouchableOpacity onPress={()=>{setuserdetail(false),fetchuserdata()}} style={styles.buttonclose}>
                <Text style={styles.buttontext}>close</Text>
            </TouchableOpacity>
         </View>
         )
         }
         <TouchableOpacity style={styles.button1}onPress={()=>{navigation.navigate('Login'),handleLogout()}}>
            <Text style={styles.buttontext}>Logout</Text>
         </TouchableOpacity>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        width:150,
        height:50,
        backgroundColor:'#48C9B0',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6,
        marginTop:30
    },
    buttontext:{
        fontSize:18,
        color:'#fff',
        fontWeight:'bold'
    },
    button1:{
        width:150,
        height:50,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6,
        marginTop:20
    },
    subtext:{
        fontSize:18,
        color:'#000'
    },
    usercontainer:{
        width:'99%',
        height:200,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        marginTop:10,
        borderRadius:6
    },
    userheadtext:{
        fontSize:30,
        color:'#000',
        fontWeight:'bold',
        marginBottom:15
    },
    userdatatext:{
        fontSize:15,color:'green',
        marginLeft:10,
        marginBottom:5
    },
    buttonclose:{
        width:100,
        height:40,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6,
        marginTop:10,
        marginLeft:250
    }
})
export default Home;
