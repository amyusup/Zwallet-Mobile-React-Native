import {StyleSheet, Dimensions} from 'react-native';
import color from '../../styles/constant';
var style = StyleSheet.create({
  page: {backgroundColor: color.secondary},
  radiusTop: {borderTopLeftRadius: 50, borderTopRightRadius: 50},
  card: {
    backgroundColor: color.white,
    padding: 30,
    // paddingTop:30,
    // paddingHorizontal:20,
    // height: 500,
    height: Dimensions.get('screen').height - 200,
    // height:Dimensions.get('screen'),
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  brand: {
    alignSelf: 'center',
    marginVertical: 50,
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily:"NunitoSans-Bold",
    color: color.primary,
  },
  title: {
    alignSelf: 'center',
    fontSize: 18,
    // fontWeight: 'bold',
    fontFamily:"NunitoSans-Bold",
    marginBottom: 10,
  },
  subTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: color.dark,
  },
  button: {
    borderRadius: 10,
    bottom: 20,
    position: 'absolute',
    width: Dimensions.get('screen').width - 50,
    alignSelf: 'center',
    paddingVertical: 3,
    marginVertical:10
  },
});

export default style;
