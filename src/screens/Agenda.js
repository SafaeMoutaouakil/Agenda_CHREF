import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ImageBackground, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Color, FontFamily, FontSize, Border } from "../../GlobalStyles";
import { getAuthorities, getLocations, getMeetings, searchReunions, selectOrganes, selectSallesReunion, getAllReunions  } from '../../Data/dataSQLite';



const Agenda = () => {

  const navigation = useNavigation();
  const [selectedAuthority, setSelectedAuthority] = useState('');
  const [location, setLocation] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [meetingRooms, setMeetingRooms] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAuthorities = await selectOrganes();
        const fetchedLocations = await selectSallesReunion();

        setAuthorities(fetchedAuthorities);
        setLocations(fetchedLocations);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  
  



const showStartDatePickerHandler = () => {
  setShowStartDatePicker(true);
};

const showEndDatePickerHandler = () => {
  setShowEndDatePicker(true);
};

const handleStartDateConfirm = (event, selectedDate) => {
  const currentDate = selectedDate || startDate;
  setStartDate(currentDate);
  setShowStartDatePicker(false);
};

const handleEndDateConfirm = (event, selectedDate) => {
  const currentDate = selectedDate || endDate;
  setEndDate(currentDate);
  setShowEndDatePicker(false);
};

const handleSearch = async () => {
  try {
    const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
    const formattedEndDate = moment(endDate).format('YYYY-MM-DD');
    
    console.log('Searching for meetings with params:', {
      selectedAuthority,
      location,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    const results = await searchReunions(
      selectedAuthority,
      location,
      formattedStartDate,
      formattedEndDate
    );

    console.log('Résultats de la recherche:', results);
    setMeetings(results);
  } catch (error) {
    console.error('Error during search:', error);
  }
};



  return (
    <ImageBackground
      style={styles.homeIcon}
      resizeMode="cover"
      source={require("../../assets/home.png")}
    >
     
      <ScrollView style={styles.scrollView}>
      
      <View style={styles.main}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="أدخل المكان"
          value={location}
          onChangeText={setLocation}
        />
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedAuthority}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedAuthority(itemValue)}
          >
            <Picker.Item label="اختر الهيئة" value={null} enabled={false} />
            {authorities.map((authority) => (
                  <Picker.Item key={authority.id} label={authority.Nom_Ar} value={authority.id} />
                ))}
          </Picker>
        </View>
      </View>

      <View style={styles.dateContainer}>
        <Button
          title={`من: ${moment(startDate).format('DD/MM/YYYY')}`}
          onPress={showStartDatePickerHandler}
        />

        <Button
          title={`إلى: ${moment(endDate).format('DD/MM/YYYY')}`}
          onPress={showEndDatePickerHandler}
        />
      </View>

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={handleStartDateConfirm}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={handleEndDateConfirm}
        />
      )}

      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchText}>بحث</Text>
      </TouchableOpacity>

    
    
      

</View>

{meetings.length > 0 ? (
          meetings.map((meeting) => (
            <View key={`${meeting.Date_Reunion}-${meeting.Heure_Reunion}-${meeting.id}`} style={styles.agenda}>
              <View style={styles.row}>
                <Text style={styles.boldText}>التاريخ: </Text>
                <Text style={styles.agendaText}>{meeting.Date_Reunion}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>الساعة: </Text>
                <Text style={styles.agendaText}>{meeting.Heure_Reunion}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>الموضوع: </Text>
                <Text style={styles.agendaText}>{meeting.Sujet_Ar}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>التفاصيل: </Text>
                <Text style={styles.agendaText}>{meeting.Details}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>الهيئة: </Text>
                <Text style={styles.agendaText}>{authorities.find(authority => authority.id === meeting.IDorganes)?.Nom_Ar}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>الوضعية: </Text>
                <Text style={styles.agendaText}>{meeting.Observation}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>المكان: </Text>
                <Text style={styles.agendaText}>{locations.find(location => location.id === meeting.Salles_ID)?.Salle_Ar}</Text>
              </View>

              <View style={styles.lineViewBorder} />
            </View>
          ))
        ) : (
          <Text style={styles.noMeetingsText}>لا توجد اجتماعات</Text>
        )}
          
          
      </ScrollView>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  noMeetingsText: {
    top: 1,
  },
  main:{
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    top:10,
    marginVertical: 10,
    marginHorizontal:5,
    left:-5,
    width: 370,
    height:210,
    

  },
  noMeetingsText:{
    top:1,
  },
  
  
  agendascreenInner: {
    top: 1663,
    width: 731,
    height: 15,
    left: 32,
  },
  handle: {
    marginTop: -2,
    marginLeft: -54,
    top: "50%",
    left: "50%",
    borderRadius: 12,
    backgroundColor: Color.schemesOnSurface,
    height: 4,
    width: 108,
    position: "absolute",
  },
  
  rectangleViewBg: {
    backgroundColor: Color.colorWhite,
    position: "absolute",
  },
  lineViewBorder: {
    borderTopWidth: 15,
    borderColor: Color.colorBlack,
    height: 15,
    borderStyle: "solid",
    position: "absolute",
  },
  gestureBar: {
    top: 1475,
    left: 180,
    width: 434,
    height: 24,
    position: "absolute",
  },
  image26Icon: {
    top: -70,
    left: 17,
    height: 35,
    width: 57,
    position: "absolute",
  },
  agendascreenChild: {
    top: 60,
    left: 122,
    borderColor: "#cd0606",
    borderTopWidth: 2,
    width: 192,
    height: 2,
    borderStyle: "solid",
    position: "absolute",
  },
  todayIcon: {
    top: 14,
    left: 270,
    width: 42,
    height: 44,
    position: "absolute",
  },
  agendascreenItem: {
    top: 1461,
    left: 0,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4,
    }
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold', // Gras

  },
  
  dateContainer: {
    top:-40,
    left:50,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 60,
    marginTop: 70,
    borderRadius: 5, // Bords arrondis
    

    
  },
  
  
  agenda: {
    top: -5,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'right',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5, // Adds some space between the title and the value
    color: 'black', // Couleur du texte noire
      },
  agendaText: {
    top : -5,
    fontSize: 16,
    marginVertical: 5,
  },
  label: {
    top: 25,
    left: -10,
    fontSize: 18,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row', // Pour placer les éléments côte à côte
    justifyContent: 'space-between',
    alignItems: 'center', // Pour aligner les éléments verticalement
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  pickerContainer: {
    left:20,
    marginRight: 10, // Espace entre le Picker et le TextInput
    height: 50, // Hauteur du Picker pour correspondre à celle du TextInput
    backgroundColor: 'white', // Couleur de fond du TextInput
    borderRadius: 5, // Pour arrondir les bords du TextInput
    borderColor: 'black', // Couleur de la bordure
    borderWidth: 1, // Épaisseur de la bordure
    width:160,
  
  },
  picker: {
    height: '100%', // Prendre toute la hauteur du conteneur
    color: 'gray', // Couleur du texte
    top:-3,
    textAlign:'center',
    
  },
  input: {
    width:160,
    left:-15,
    height: 50,
    backgroundColor: 'white', // Couleur de fond du TextInput
    borderRadius: 5, // Pour arrondir les bords du TextInput
    borderColor: 'black', // Couleur de la bordure
    borderWidth: 1, // Épaisseur de la bordure
    paddingHorizontal: 10, // Espacement intérieur
    textAlign: 'center',
    
    
  },
  scrollView: {
    marginHorizontal: 20,
  },
  searchButton: {
    top:-95,
    backgroundColor: '#B22222', // Couleur Firebrick
    paddingVertical: 10, // Espacement vertical pour le bouton
    paddingHorizontal: 20, // Espacement horizontal pour le bouton
    borderRadius: 5, // Bords arrondis
    alignItems: 'center', // Centre le texte horizontalement
    justifyContent: 'center', // Centre le texte verticalement
    width:80,
    height:40,
    left:10,
  },
  searchText: {
    color: 'white', // Couleur du texte noire
    fontSize: 18, // Taille de la police
    fontWeight: 'bold', // Gras
    textAlign:'center',
    top:-3,
  },
  dateButton: {
    top:30,
    width: 350,
    height: 50,
    left:7,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5, // Bords arrondis
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  homeIcon: {
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
  lineView: {
    top: 510,
    left: 1,
    
    height: 10,
    borderStyle: "solid",
    borderRadius: 5, // Bords arrondis


  },
  lineViewBorder: {
    width: 372, // S'assure que la ligne s'étend sur toute la largeur du conteneur
    borderTopWidth: 10,
    borderColor: 'black', // Change selon la couleur souhaitée
    height: 10,
    borderStyle: 'solid',
    position: 'absolute',
    bottom: 0, // Positionne la ligne en bas du conteneur
    left: 0,
    borderRadius: 15, // Bords arrondis
  },
});

export default Agenda;
