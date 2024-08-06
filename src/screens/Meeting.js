import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { getMeetingsByMonth, selectSallesReunion, SelectOrganes } from '../../Data/dataSQLite';

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentMonth = new Date().getMonth() + 1;
        let meetingsData = await getMeetingsByMonth(currentMonth);

        // Supprimer les doublons
        const uniqueMeetings = Array.from(new Set(meetingsData.map(meeting => meeting.id)))
          .map(id => {
            return meetingsData.find(meeting => meeting.id === id);
          });

        setMeetings(uniqueMeetings || []); // Ensure meetings is an array

        const authoritiesData = await SelectOrganes();
        setAuthorities(authoritiesData || []); // Ensure authorities is an array

        const locationsData = await selectSallesReunion();
        setLocations(locationsData || []); // Ensure locations is an array
      } catch (error) {
        console.log('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <ImageBackground
      style={styles.homeIcon}
      resizeMode="cover"
      source={require("../../assets/home.png")}
    >
      <ScrollView>
        {meetings.length > 0 ? (
          meetings.map((meeting) => (
            <View key={meeting.id} style={styles.agenda}>
              <View style={styles.row}>
                <Text style={styles.agendaText}>{meeting.Date_Reunion}</Text>
                <Text style={styles.boldText}>التاريخ: </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.agendaText}>{meeting.Heure_Reunion}</Text>
                <Text style={styles.boldText}>الساعة: </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.agendaText}>{meeting.Sujet_Ar}</Text>
                <Text style={styles.boldText}>الموضوع: </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.agendaText}>{meeting.Details}</Text>
                <Text style={styles.boldText}>التفاصيل: </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.agendaText}>
                  {authorities.find(authority => authority.id === meeting.IDorganes)?.Nom_Ar}
                </Text>
                <Text style={styles.boldText}>الهيئة: </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.agendaText}>{meeting.Observation}</Text>
                <Text style={styles.boldText}>الوضعية: </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.agendaText}>
                  {locations.find(location => location.id === meeting.Salles_ID)?.Salle_Ar}
                </Text>
                <Text style={styles.boldText}>المكان: </Text>
              </View>
              <View style={styles.lineViewBorder} />
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>Aucune réunion trouvée pour ce mois.</Text>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  homeIcon: {
    flex: 1,
  },
  agenda: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'flex-end', // Align items to the right
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5, // Add space between the label and the data
    color: 'black',
    textAlign: 'right', // Align text to the right
  },
  agendaText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'right', // Align text to the right
  },
  lineViewBorder: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  noDataText: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Meeting;
