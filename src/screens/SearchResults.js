/*import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const SearchResults = ({ route }) => {
  const { searchedAuthority, searchedLocation, searchedStartDate, searchedEndDate } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>نتائج البحث</Text>
      <Text style={styles.result}>الهيئة: {searchedAuthority}</Text>
      <Text style={styles.result}>المكان: {searchedLocation}</Text>
      <Text style={styles.result}>من: {searchedStartDate}</Text>
      <Text style={styles.result}>إلى: {searchedEndDate}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  result: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default SearchResults;*/
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import moment from 'moment';

const SearchResults = ({ route }) => {
  const { searchedAuthority, searchedLocation, searchedStartDate, searchedEndDate } = route.params;
  const [filteredMeetings, setFilteredMeetings] = useState([]);

  useEffect(() => {
    // Simuler la récupération des données de la base de données
    const fetchMeetingDetails = async () => {
      // Simuler les données récupérées de la base de données
      const allMeetings = [
        {
          date: '2024-07-25',
          time: '17:00:00',
          topic: 'جلسة رقم 4',
          details: 'جلسة مشتركة للمجلس الرائدان',
          location: 'قاعة الاجتماعات',
          authority: 'جلسة مشتركة',
          status: 'تم البرمجة',
          committee: 'اللجنة التربوية',
          notes: 'الاجتماع برئاسة النائب السيد محمد مرقي',
        },
        {
          date: '2024-07-23',
          time: '10:00:00',
          topic: 'جلسة رقم 5',
          details: 'جلسة لمناقشة القضايا الاقتصادية',
          location: 'قاعة الاجتماعات',
          authority: 'جلسة مشتركة',
          status: 'تم البرمجة',
          committee: 'اللجنة الاقتصادية',
          notes: 'الاجتماع برئاسة النائب السيد علي حسن',
        },
        // Ajouter plus de réunions ici
      ];

      const startDate = moment(searchedStartDate);
      const endDate = moment(searchedEndDate);

      const filtered = allMeetings.filter(meeting => {
        const meetingDate = moment(meeting.date);
        return (
          meeting.authority === searchedAuthority &&
          meeting.location === searchedLocation &&
          meetingDate.isBetween(startDate, endDate, undefined, '[]')
        );
      });

      setFilteredMeetings(filtered);
    };

    fetchMeetingDetails();
  }, [searchedAuthority, searchedLocation, searchedStartDate, searchedEndDate]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>نتائج البحث</Text>
      {filteredMeetings.length > 0 ? (
        filteredMeetings.map((meeting, index) => (
          <View key={index} style={styles.agenda}>
            <Text style={styles.agendaText}>التاريخ: {meeting.date}</Text>
            <Text style={styles.agendaText}>الساعة: {meeting.time}</Text>
            <Text style={styles.agendaText}>الموضوع: {meeting.topic}</Text>
            <Text style={styles.agendaText}>التفاصيل: {meeting.details}</Text>
            <Text style={styles.agendaText}>المكان: {meeting.location}</Text>
            <Text style={styles.agendaText}>الهيئة: {meeting.authority}</Text>
            <Text style={styles.agendaText}>اللجنة: {meeting.committee}</Text>
            <Text style={styles.agendaText}>ملاحظات: {meeting.notes}</Text>
          </View>
        ))
      ) : (
        <Text>لا توجد نتائج مطابقة للبحث.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  agenda: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 20,
  },
  agendaText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default SearchResults;

