import React from 'react';
import {View, Image} from 'react-native';
import Dialog from 'react-native-dialog';

export const DeletetDialog = ({
  visible,
  onCancel,
  onDelete,
  title,
  description,
}) => {
  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title style={{color: 'red', alignItems: 'center'}}>
          <Image
            source={require('../assets/images/exclamation.png')}
            style={{
              width: 20,
              height: 20,
              tintColor: 'red',
              marginLeft: 20,
            }}
          />
          {'    '}
          {title}
        </Dialog.Title>
        <Dialog.Description>{description}</Dialog.Description>
        <Dialog.Button label="Cancel" onPress={onCancel} />
        <Dialog.Button label="Delete" onPress={onDelete} />
      </Dialog.Container>
    </View>
  );
};
