import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 

export default function ErrorMessage({ message, childToParent }) {
    const [load, setLoad] = useState(true);

    useEffect(() => childToParent(load));

    useEffect(() => {
        setTimeout(() => {
            setLoad(false)
        }, 5000);
    }, [])
    
    return load ? (
        <View style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={{ justifyContent: 'center', marginRight: 5 }}>
                    <MaterialIcons name="error-outline" size={24} color="black" />
                </View>
                <Text style={{ fontWeight: 'bold' }}>{message}</Text>
            </View>
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: '10%',
        width: '90%',
        zIndex: 1,
        backgroundColor: '#f56565',
        borderRadius: 5,
        padding: 10,
        alignSelf: 'center',
    },
});
