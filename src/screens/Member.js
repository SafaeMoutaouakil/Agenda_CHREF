import React, { useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import { Color, FontFamily, FontSize } from "../../GlobalStyles";
import { fetchMembers, getDeputesInfo } from '../../Data/dataSQLite';

const Member = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [deputesInfo, setDeputesInfo] = useState([]);

  useEffect(() => {
    getDeputesInfo()
      .then(data => setDeputesInfo(data))
      .catch(error => {
        console.error('Error fetching members:', error);
        setError(error);
      });
  }, []);


  return (
    <ImageBackground source={require('../../assets/home.png')} style={styles.homeIcon}>
       <View> 
       <FlatList
          data={deputesInfo}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={require('../../assets/image-111.png')} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.group}>{item.organ_group}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          )}
        />
     </View>


    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  homeIcon: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    top :-20,
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold', // Gras
    color: 'black', // Couleur du texte noire


  },
  image101Icon: {
    width: 165,
    height: 50,
    alignSelf: 'center',
    marginTop: 15,
  },
  image26Icon: {
    top: -70,
    left: -160,
    height: 35,
    width: 57,
    

  },
  memItem: {
    top:-35,
    width: 500,
    height: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  container: {
    padding: 10,
    alignItems: 'center',
  },
  memChild: {
    backgroundColor: "#d9d9d9",
    width: '100%',
    height: 77,
    marginTop: 20,
  },
  handle: {
    top:-50,
    borderRadius: 12,
    backgroundColor: Color.schemesOnSurface,
    width: 108,
    height: 4,
    alignSelf: 'center',
    marginTop: 10,
    width:200,
  },
  gestureBar: {
    width: '100%',
    height: 24,
    marginTop: 10,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '90%',
    height:110,
    left:20,
  },
  image: {
    width: 70,
    height: 70,
    marginBottom: 10,
    borderRadius: 35,
    left:130,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black', // Couleur du texte noire
    left:10,
    top:-80,


  },
  group: {
    fontSize: 18,
    color: '#555',
    color: 'black', // Couleur du texte noire
    left:-20,
    top:-70,

  },
  title: {
    fontSize: 16,
    color: '#999',
    color: 'black', // Couleur du texte noire
    left:1,
    top:-60,

  },
  textTypo2: {
    textAlign: "right",
    color: Color.colorBlack,
    fontFamily: FontFamily.m3HeadlineSmall,
  },
  text3: {
    fontSize: FontSize.m3HeadlineMedium_size,
    lineHeight: 36,
    width: 437,
    height: 72,
  },
});

export default Member;
