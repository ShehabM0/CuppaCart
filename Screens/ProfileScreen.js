import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';

const ProfileScreen = ({navigation}) => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
     
        <TouchableOpacity  onPress={() => {
          navigation.navigate("SettingsTab");
        
       }}>
        <Text>Go</Text>
        </TouchableOpacity>

    </View>
  )
}

export default ProfileScreen