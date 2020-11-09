import {StyleSheet} from 'react-native';
import color from '../../styles/constant';
const style = StyleSheet.create({
card: {
    backgroundColor: color.white,
    padding: 20,
    marginVertical:10,
    borderRadius:10,
    // height: Dimensions.get('screen').height - 200,
    // shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 3,
  },
  textSuccess:{color:color.success},
  textDanger:{color:color.danger},
})

export default style
