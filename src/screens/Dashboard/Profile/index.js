import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Avatar from '../../../components/Avatar';
import ButtonProfile from '../../../components/Button/Profile';
import s from '../style';
import color from '../../../styles/constant';
import {useSelector, useDispatch} from 'react-redux';
import {setPhoto} from '../../../redux/actions/user';
import ImagePicker from 'react-native-image-picker';
import {Modal, Portal, IconButton} from 'react-native-paper';
import Icons from 'react-native-vector-icons/Feather';
const index = (props) => {
  const {token} = useSelector((state) => state.Auth);
  const {userdata} = useSelector((state) => state.User);
  const {name, phone, photo} = userdata;
  const dispatch = useDispatch();
  const [visible, SetVisible] = React.useState(false);
  const [avatarSource, setAvatarSource] = React.useState(null);
  const [pic, Setpic] = React.useState(null);

  const showModal = () => SetVisible(true);
  const hideModal = () => SetVisible(false);

  const uploadPhoto = () => {
    console.log(pic);
    const formData = new FormData();
    formData.append('photo', pic);
    dispatch(setPhoto(token, formData));
    SetVisible(false);
  };

  const options = {
    title: 'Zwallet',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
  };

  const changePhoto = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      } else {
        let source = {uri: response.uri};
        setAvatarSource(source);
        Setpic({
          uri: response.uri,
          type: response.type,
          name: response.fileName,
        });
      }
    });
  };
  return (
    <>
      <StatusBar backgroundColor={color.secondary} barStyle="dark-content" />
      <ScrollView style={s.page}>
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <Avatar size={80} photo={photo} />
          <TouchableOpacity
            onPress={showModal}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
            }}>
            {/* <IconButton icon="" color={color.dark} size={10} /> */}
            <Icons name="edit-2" color={color.dark} size={14} />
            <Text>Edit</Text>
          </TouchableOpacity>
          <Text style={{fontFamily: 'NunitoSans-Bold', marginBottom: 5}}>
            {name}
          </Text>
          <Text>{phone ? `+62 ${phone}` : '-'}</Text>
        </View>
        <ButtonProfile
          onPress={() => props.navigation.navigate('PersonalInfo')}
          text="Personal Information"
          icon="arrow-right"
        />
        <ButtonProfile
          onPress={() => props.navigation.navigate('ChangePassword')}
          text="Change Password"
          icon="arrow-right"
        />
        <ButtonProfile
          onPress={() => props.navigation.navigate('Main')}
          text="Change PIN"
          icon="arrow-right"
        />
        <ButtonProfile
          onPress={() => props.navigation.navigate('Main')}
          text="Notification"
          withSwitch={true}
        />
        <ButtonProfile
          onPress={() => props.navigation.navigate('Logout')}
          text="Logout"
          style={{color: color.danger, marginLeft: 'auto', paddingLeft: 'auto'}}
        />
      </ScrollView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
          <Image
            source={avatarSource === null ? {uri: photo} : avatarSource}
            style={{width: '100%', height: 300}}
          />
          <TouchableOpacity
            style={{
              backgroundColor: color.grey,
              padding: 10,
              marginVertical: 10,
            }}
            onPress={changePhoto}>
            <Text style={{color: color.dark, alignSelf: 'center'}}>
              Select Image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color.primary,
              padding: 10,
              marginVertical: 10,
            }}
            onPress={uploadPhoto}>
            <Text style={{color: color.white, alignSelf: 'center'}}>
              Upload
            </Text>
          </TouchableOpacity>
        </Modal>
      </Portal>
    </>
  );
};

export default index;
