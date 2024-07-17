import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';

const members = [

  {  name: 'محمد صباري', role: 'فريق الأصالة والمعاصرة', position: 'النائب الأول للرئيس', photo: require("../../assets/image-111.png") },
  {  name: 'عبد الصمد قيوح', role: 'حزب الاستقلال', position: 'النائب الثاني للرئيس', photo: require("../../assets/image-111.png") },
  {  name: 'ادريس اشطيبي', role: 'الاتحاد الاشتراكي للقوات الشعبية', position: 'النائب الثالث للرئيس', photo: require("../../assets/image-111.png") },
  {  name: 'محمد والزين', role: 'حزب الحركة الشعبية', position: 'النائب الرابع للرئيس', photo: require("../../assets/image-111.png") },
  {  name: 'محمد جودار', role: 'حزب الاتحاد الدستوري', position: 'النائب الخامس للرئيس', photo: require("../../assets/image-111.png") },
  {  name: 'نادية تهامي', role: 'حزب التقدم والاشتراكية', position: 'النائب السادس للرئيس', photo: require("../../assets/image-111.png") },
  {  name: 'زينة ادحلي', role: 'حزب التجمع الوطني للأحرار', position: 'النائب السابع للرئيس', photo: require("../../assets/image-111.png") },
  {  name: 'محمد غيات', role: 'حزب التجمع الوطني للأحرار', position: 'النائب الثامن للرئيس', photo: require("../../assets/image-111.png") },
  
];

const MembersList = () => {
  return (
    <ScrollView style={styles.container}>
      {members.map((member, index) => (
        <View key={index} style={styles.memberCard}>
          <Image source={member.photo} style={styles.memberImage} />
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberRole}>{member.role}</Text>
            <Text style={styles.memberPosition}>{member.position}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  memberCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  memberImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  memberInfo: {
    justifyContent: 'center',
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberRole: {
    fontSize: 14,
    color: '#666',
  },
  memberPosition: {
    fontSize: 14,
    color: '#666',
  },
});

export default MembersList;
