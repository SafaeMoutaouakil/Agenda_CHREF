/*import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Agenda = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Agenda Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#000',
  },
});

/*import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Color, FontFamily, FontSize, Border } from "../../GlobalStyles";


const Agenda = () => {
  const navigation = useNavigation();
  const [selectedAuthority, setSelectedAuthority] = useState('');
  const [location, setLocation] = useState('');
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [meetings, setMeetings] = useState([
    {
      date: '2021-10-11',
      time: '17:00:00',
      topic: 'جلسة رقم 4',
      details: 'جلسة مشتركة لمجلس البرلمان',
      authority: 'جلسة مشتركة',
      status: 'تم البرمجة',
      location: 'القاعة المغربية',
      type: 'حضوري',
      notes: 'الاجتماع برئاسة النائب السيد محمد شوكي رئيس اللجنة المدة الزمنية',
    },
    {
      date: '2021-10-11',
      time: '17:00:00',
      topic: 'جلسة رقم 4',
      details: 'جلسة مشتركة لمجلس البرلمان',
      authority: 'جلسة مشتركة',
      status: 'تم البرمجة',
      location: 'القاعة المغربية',
      type: 'حضوري',
      notes: 'الاجتماع برئاسة النائب السيد محمد شوكي رئيس اللجنة المدة الزمنية',
    },
    // Ajoutez plus de réunions ici
  ]);

  

  const authorities = ['Authority 1', 'Authority 2', 'Authority 3']; // Remplacez avec vos choix

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartDateConfirm = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    hideStartDatePicker();
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDateConfirm = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    hideEndDatePicker();
  };

  const handleSearch = () => {
    // Implémentez la logique de recherche ici
  };

  return (
    <ImageBackground
    style={styles.homeIcon}
    resizeMode="cover"
    source={require("../../assets/home.png")}
  >
    <Text style={styles.header}>اجندة المجلس</Text>

    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
    <Image
      style={styles.image26Icon}
      resizeMode="cover"
      source={require("../../assets/image-26.png")}
    />
     
     </TouchableOpacity>
     <Image
        style={styles.todayIcon}
        resizeMode="cover"
        source={require("../../assets/today.png")}
      />
    <View style={styles.agendascreenChild} />
    <View style={[styles.agendascreenItem, styles.rectangleViewBg]} />
    <View style={[styles.agendascreenInner, styles.lineViewBorder]} />
    <View style={styles.gestureBar}>
      <View style={styles.handle} />
    </View>
    <ScrollView style={styles.scrollView}>
      <Text style={styles.label}>الهيئة:</Text>
      <Picker
        selectedValue={selectedAuthority}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedAuthority(itemValue)}
      >
        {authorities.map((authority, index) => (
            <Picker.Item key={index} label={authority} value={authority} />
          ))}
      </Picker>

      <Text style={styles.label}>المكان</Text>
        <TextInput
          style={styles.input}
          placeholder="أدخل المكان"
          value={location}
          onChangeText={setLocation}
        />

<View style={styles.dateContainer}>
      <Button
        title={`من: ${moment(startDate).format('DD/MM/YYYY')}`}
        onPress={showStartDatePicker}
      />
      
      <Button
        title={`إلى: ${moment(endDate).format('DD/MM/YYYY')}`}
        onPress={showEndDatePicker}
      />
    </View>
     

      {isStartDatePickerVisible && (
        <DateTimePicker
          testID="startDateTimePicker"
          value={startDate}
          mode="date"
          display="default"
          onChange={handleStartDateConfirm}
        />
      )}

      {isEndDatePickerVisible && (
        <DateTimePicker
          testID="endDateTimePicker"
          value={endDate}
          mode="date"
          display="default"
          onChange={handleEndDateConfirm}
        />
      )}
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Image
            style={styles.searchIcon}
            source={require("../../assets/search.png")}
          />
        </TouchableOpacity>

        {meetings.map((meeting, index) => (
          <View key={index} style={styles.agenda}>
            <Text style={styles.agendaText}>التاريخ: {meeting.date}</Text>
            <Text style={styles.agendaText}>الساعة: {meeting.time}</Text>
            <Text style={styles.agendaText}>الموضوع: {meeting.topic}</Text>
            <Text style={styles.agendaText}>التفاصيل: {meeting.details}</Text>
            <Text style={styles.agendaText}>الهيئة: {meeting.authority}</Text>
            <Text style={styles.agendaText}>الوضعية: {meeting.status}</Text>
            <Text style={styles.agendaText}>المكان: {meeting.location}</Text>
            <Text style={styles.agendaText}>الطبيعة: {meeting.type}</Text>
            <Text style={styles.agendaText}>ملاحظات: {meeting.notes}</Text>
          </View>
        ))}
      </ScrollView>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
  },
  picker: {
    top: 15,
    height: 50,
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 20, // Add some padding to push buttons towards the center
    marginTop:70 ,
  },
  agenda: {
    top: 80,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
  },
  agendaText: {
    fontSize: 16,
    marginVertical: 5,
  },
  label: {
    top:25,
    left:-10,
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    top :30,
    width:350,
    height: 50,
    left:7,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    textAlign: 'right', // Align text to the right for Arabic input
  },
  scrollView: {
    marginHorizontal: 20,
  },
  searchButton: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
   homeIcon: {
    flex: 1,
    height: 932,
    overflow: "hidden",
    width: "100%",
  },
});

export default Agenda;*/
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Color, FontFamily, FontSize, Border } from "../../GlobalStyles";

const Agenda = () => {
  const navigation = useNavigation();
  const [selectedAuthority, setSelectedAuthority] = useState('');
  const [location, setLocation] = useState('');
  const [showStartDatePicker, setShowStartPicker] = useState(false);
  const [showEndDatePicker, setShowEndPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [meetings, setMeetings] = useState([
    {
      date: '2021-10-11',
      time: '17:00:00',
      topic: 'جلسة رقم 4',
      details: 'جلسة مشتركة لمجلس البرلمان',
      authority: 'جلسة مشتركة',
      status: 'تم البرمجة',
      location: 'القاعة المغربية',
      type: 'حضوري',
      notes: 'الاجتماع برئاسة النائب السيد محمد شوكي رئيس اللجنة المدة الزمنية',
    },
    {
      date: '2021-10-11',
      time: '17:00:00',
      topic: 'جلسة رقم 4',
      details: 'جلسة مشتركة لمجلس البرلمان',
      authority: 'جلسة مشتركة',
      status: 'تم البرمجة',
      location: 'القاعة المغربية',
      type: 'حضوري',
      notes: 'الاجتماع برئاسة النائب السيد محمد شوكي رئيس اللجنة المدة الزمنية',
    },
    // Ajoutez plus de réunions ici
  ]);

  

       
          const authorities = [          'جلسة مشتركة',
'Authority 1', 'Authority 2', 'Authority 3',]; // Replace with your choices

  const handleStartDateConfirm = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setShowStartPicker(false);
  };

  const handleEndDateConfirm = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    setShowEndPicker(false);
  };

  const handleSearch = () => {
    navigation.navigate('SearchResults', {
      searchedAuthority: selectedAuthority,
      searchedLocation: location,
      searchedStartDate: moment(startDate).format('YYYY-MM-DD'),
      searchedEndDate: moment(endDate).format('YYYY-MM-DD'),
    });
  };

  return (
    <ImageBackground
      style={styles.homeIcon}
      resizeMode="cover"
      source={require("../../assets/home.png")}
    >
      <Text style={styles.header}>اجندة المجلس</Text>

      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image
          style={styles.image26Icon}
          resizeMode="cover"
          source={require("../../assets/image-26.png")}
        />
      </TouchableOpacity>
      <Image
        style={styles.todayIcon}
        resizeMode="cover"
        source={require("../../assets/today.png")}
      />
      <View style={styles.agendascreenChild} />
      <View style={[styles.agendascreenItem, styles.rectangleViewBg]} />
      <View style={[styles.agendascreenInner, styles.lineViewBorder]} />
      <View style={styles.gestureBar}>
        <View style={styles.handle} />
      </View>
      <ScrollView style={styles.scrollView}>
      
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
          {authorities.map((authority, index) => (
            <Picker.Item key={index} label={authority} value={authority} />
          ))}
        </Picker>
      </View>
    </View>

<View style={styles.dateContainer}>
      <Button
        title={`من: ${moment(startDate).format('DD/MM/YYYY')}`}
        onPress={showStartDatePicker}
      />
      
      <Button
        title={`إلى: ${moment(endDate).format('DD/MM/YYYY')}`}
        onPress={showEndDatePicker}
      />
    </View>

       

<TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          
          <Text style={styles.searchText}>بحث</Text>
        </TouchableOpacity>

        {meetings.map((meeting, index) => (
          <View key={index} style={styles.agenda}>
            <Text style={styles.agendaText}>التاريخ: {meeting.date}</Text>
            <Text style={styles.agendaText}>الساعة: {meeting.time}</Text>
            <Text style={styles.agendaText}>الموضوع: {meeting.topic}</Text>
            <Text style={styles.agendaText}>التفاصيل: {meeting.details}</Text>
            <Text style={styles.agendaText}>الهيئة: {meeting.authority}</Text>
            <Text style={styles.agendaText}>الوضعية: {meeting.status}</Text>
            <Text style={styles.agendaText}>المكان: {meeting.location}</Text>
            <Text style={styles.agendaText}>الطبيعة: {meeting.type}</Text>
            <Text style={styles.agendaText}>ملاحظات: {meeting.notes}</Text>
          </View>
        ))}

        
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  
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
    left:60,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 60,
    marginTop: 70,
    borderRadius: 5, // Bords arrondis
    

    
  },
  
  
  agenda: {
    top: 80,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
  },
  agendaText: {
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
    left:30,
    marginRight: 10, // Espace entre le Picker et le TextInput
    height: 50, // Hauteur du Picker pour correspondre à celle du TextInput
    backgroundColor: 'white', // Couleur de fond du TextInput
    borderRadius: 5, // Pour arrondir les bords du TextInput
    borderColor: 'gray', // Couleur de la bordure
    borderWidth: 1, // Épaisseur de la bordure
    width:150,
  
  },
  picker: {
    height: '100%', // Prendre toute la hauteur du conteneur
    color: 'gray', // Couleur du texte
    top:-3,
    textAlign:'center',
    
  },
  input: {
    width:150,
    left:-20,
    height: 50,
    backgroundColor: 'white', // Couleur de fond du TextInput
    borderRadius: 5, // Pour arrondir les bords du TextInput
    borderColor: 'gray', // Couleur de la bordure
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
  },
  searchText: {
    color: 'black', // Couleur du texte noire
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
});

export default Agenda;
