import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import InfoInput from '../../InfoInput';
import ModalProfile from '../Modal';
import { ModalFieldProps } from '../../../../../../../shared/types/typesModalField';

export default function ModalName({ value, avatar, name, onUpdate }: ModalFieldProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <InfoInput title="Имя" info={value} />
      </TouchableOpacity>
      <ModalProfile
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        avatar={avatar}
        name={name}
        placeholder="Измените ваше имя"
        title="Имя"
        infoBlock={value}
        onSave={onUpdate}
      />
    </>
  );
}