import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView } from 'react-native';
import { getLastMeetings, selectSallesReunion, selectOrganes } from '../../Data/dataSQLite';

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLastMeetings();
        setMeetings(data || []); // Ensure meetings is an array
        const authoritiesData = await selectOrganes();
        setAuthorities(authoritiesData || []); // Ensure authorities is an array
        const locationsData = await selectSallesReunion();
        setLocations(locationsData || []); // Ensure locations is an array
      } catch (error) {
        console.log('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  // Get the current month (1-based, so January is 1, February is 2, etc.)
  const currentMonth = new Date().getMonth() + 1;

  // Filter meetings for the current month
  const filteredMeetings = meetings.filter((meeting) => {
    const meetingMonth = new Date(meeting.Date_Reunion).getMonth() + 1;
    return meetingMonth === currentMonth;
  });

  return (
    <ImageBackground
      style={styles.homeIcon}
      resizeMode="cover"
      source={require("../../assets/home.png")}
    >
      <ScrollView>
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map((meeting) => (
            <View key={meeting.id} style={styles.agenda}>
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
                <Text style={styles.agendaText}>
                  {authorities.find(authority => authority.id === meeting.IDorganes)?.Nom_Ar}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>الوضعية: </Text>
                <Text style={styles.agendaText}>{meeting.Observation}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.boldText}>المكان: </Text>
                <Text style={styles.agendaText}>
                  {locations.find(location => location.id === meeting.Salles_ID)?.Salle_Ar}
                </Text>
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
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
    color: 'black',
  },
  agendaText: {
    fontSize: 16,
    color: 'black',
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
