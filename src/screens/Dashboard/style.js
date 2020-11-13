import {StyleSheet, Dimensions} from 'react-native';
import color from '../../styles/constant';
var style = StyleSheet.create({
  page: {backgroundColor: color.secondary},
  menu: {flexDirection: 'row', alignItems: 'center', marginVertical: 10},
  bold: {fontWeight: 'bold'},
  textWhite: {color: color.white},
  textWhiteXl:{fontSize:18, marginVertical:10, fontFamily:"NunitoSans-Bold", color:color.white},
  mainCard:{backgroundColor:color.primary, padding:30, margin:10, borderRadius:20},
  button50:{width:'47%',height:50, borderRadius:10,justifyContent:"center"},
  button100:{height:50, borderRadius:10,justifyContent:"center"},
 
});

export default style;
