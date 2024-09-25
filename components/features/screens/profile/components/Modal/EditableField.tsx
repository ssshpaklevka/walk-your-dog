// ProfileField.js
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import InfoInput from '../InfoInput';
import ModalProfile from './Modal';


type Props = {
    title: string;
    initialValue: string;
    avatar: string;
    name: string;
}

export default function EditableField({ title, initialValue, avatar, name }: Props) {
  const [value, setValue] = useState(initialValue);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = (newValue:any) => {
    setValue(newValue);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <InfoInput title={title} info={value} />
      </TouchableOpacity>
      <ModalProfile
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        avatar={avatar}
        name={name}
        placeholder={`Измените ваш ${title.toLowerCase()}`}
        title={title}
        infoBlock={value}
        onSave={handleSave}
      />
    </>
  );
}