/*import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AgendaScreen = () => {
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

export default AgendaScreen;*/
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';

const AgendaScreen = () => {
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>أجندة المجلس</Text>

      <Picker
        selectedValue={selectedEntity}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedEntity(itemValue)}
      >
        <Picker.Item label="الهيئة" value="" />
        <Picker.Item label="Entity 1" value="entity1" />
        <Picker.Item label="Entity 2" value="entity2" />
      </Picker>

      <Picker
        selectedValue={selectedPlace}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedPlace(itemValue)}
      >
        <Picker.Item label="المكان" value="" />
        <Picker.Item label="Place 1" value="place1" />
        <Picker.Item label="Place 2" value="place2" />
      </Picker>

      <View style={styles.dateContainer}>
        <Button title={`من: ${moment(startDate).format('DD/MM/YYYY')}`} onPress={showStartDatePicker} />
        <Button title={`إلى: ${moment(endDate).format('DD/MM/YYYY')}`} onPress={showEndDatePicker} />
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

      <View style={styles.agenda}>
        <Text style={styles.agendaText}>التاريخ: 2021-10-11</Text>
        <Text style={styles.agendaText}>الساعة: 17:00:00</Text>
        <Text style={styles.agendaText}>الموضوع: جلسة رقم 4</Text>
        <Text style={styles.agendaText}>التفاصيل: جلسة مشتركة للمجلس الرائدان</Text>
        <Text style={styles.agendaText}>المكان: قاعة الاجتماعات</Text>
        <Text style={styles.agendaText}>الموضوعية: جلسة مشتركة</Text>
        <Text style={styles.agendaText}>اللجنة: اللجنة التربوية</Text>
        <Text style={styles.agendaText}>ملاحظات: الاجتماع برئاسة النائب السيد محمد مرقي</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  picker: {
    height: 50,
    marginVertical: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default AgendaScreen;
