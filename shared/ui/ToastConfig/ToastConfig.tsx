import React from 'react';
import Toast, { BaseToast } from 'react-native-toast-message';

const ToastConfig = {
  success: ({ text1, text2 }: any) => (
    <BaseToast
      style={{width: "95%", borderLeftColor: '#1cc910', backgroundColor: "#262626", borderRadius: 16 }}
      contentContainerStyle={{ paddingVertical: 15 }}
      text1Style={{ fontSize: 16, color: "white" }} 
      text2Style={{ fontSize: 14, color: "white"  }} 
      text1={text1}
      text2={text2}
    />
  ),
};

export default ToastConfig;