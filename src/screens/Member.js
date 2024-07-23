import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, ScrollView, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Color, FontFamily, FontSize } from "../../GlobalStyles";

const members = [
  { name: 'راشيد الطالبي العلمي', group: 'فريق حزب التجمع الوطني للأحرار', title: 'رئيس مجلس النواب', image: require('../../assets/image-1.png') },
  { name: 'محمد صباري', group: 'فريق الأصالة والمعاصرة', title: 'النائب الأول للرئيس', image: require('../../assets/image-111.png') },
  { name: 'عبد الصمد قيوح', group: 'الفريق الاستقلالي للوحدة والتعادلية', title: 'النائب الثاني للرئيس', image: require('../../assets/image-111.png') },
  { name: 'ادريس اشطيبي', group: 'الفريق الاشتراكي - المعارضة الاتحادية', title: 'النائب الثالث للرئيس', image: require('../../assets/image-111.png') },
  { name: 'محمد والزين', group: 'الفريق الحركي', title: 'النائب الرابع للرئيس', image: require('../../assets/image-111.png') },
  { name: 'محمد جودار', group: 'الفريق الدستوري الديمقراطي الاجتماعي', title: 'النائب الخامس للرئيس', image: require('../../assets/image-111.png') },
  { name: 'نادية تهامي', group: 'فريق التقدم والاشتراكية', title: 'النائبة السادسة للرئيس', image: require('../../assets/image-111.png') },
  { name: 'زينب إدحلي', group: 'فريق التجمع الوطني للأحرار', title: 'النائبة السابعة للرئيس', image: require('../../assets/image-111.png') },
  { name: 'محمد غيات', group: 'فريق التجمع الوطني للأحرار', title: 'النائب الثامن للرئيس', image: require('../../assets/image-111.png') },
  { name: 'محمد الحموتي', group: 'فريق الأصالة والمعاصرة', title: 'محاسب المجلس', image: require('../../assets/image-111.png') },
  { name: 'طارق قديري', group: 'الفريق الاستقلالي للوحدة والتعادلية', title: 'محاسب المجلس', image: require('../../assets/image-111.png') },
  { name: 'امبارك حمية', group: 'فريق التجمع الوطني للأحرار', title: 'أمين المجلس', image: require('../../assets/image-111.png') },
  { name: 'نادية بزداف', group: 'فريق الأصالة والمعاصرة', title: 'أمينة المجلس', image: require('../../assets/image-111.png') },
  { name: 'مروى الأنصاري', group: 'الفريق الاستقلالي للوحدة والتعادلية', title: 'أمينة المجلس', image: require('../../assets/image-111.png') },
];

const MemberCard = ({ name, group, title, image }) => (
  <View style={styles.card}>
    <Image source={image} style={styles.image} />
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.group}>{group}</Text>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Member = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../assets/home.png')} style={styles.homeIcon}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.image101Icon}
          resizeMode="cover"
          source={require("../../assets/image-101.png")}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image
            style={styles.image26Icon}
            resizeMode="cover"
            source={require("../../assets/image-26.png")}
          />
        </TouchableOpacity>
        <Image
          style={styles.memItem}
          resizeMode="cover"
          source={require("../../assets/line-2.png")}
        />
        <Text style={styles.header}> اعضاء مكتب مجلس النواب</Text>
        <View style={styles.gestureBar}>
          <View style={styles.handle} />
        </View>
        {members.map((member, index) => (
          <MemberCard
            key={index}
            name={member.name}
            group={member.group}
            title={member.title}
            image={member.image}
          />
        ))}
      </ScrollView>
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
