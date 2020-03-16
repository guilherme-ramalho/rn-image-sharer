import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';
import Share from 'react-native-share';
import { ToastAndroid } from 'react-native';

import { Container, PickerButton, ButtonWrapper } from './styles';

export default function Home() {
  const [image, setImage] = useState(null);

  const shareImage = () => {
    Share.open({
      title: 'Título do dialog',
      url: `file://${image.path}`,
      message: 'Esta é a minha mensagem personalizada',
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  const shareOnInstagram = () => {
    Share.shareSingle({
      title: 'Compartilhar no WhatsApp',
      url: `file://${image.path}`,
      message: 'Compartilhando no WhatsApp',
      social: Share.Social.INSTAGRAM,
    })
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  const pickImage = () => {
    ImagePicker.launchImageLibrary({ title: 'teste' }, response => {
      if (response.didCancel) {
        ToastAndroid.show('Cancelado pelo usuário', ToastAndroid.SHORT);
      } else if (response.error) {
        ToastAndroid.show('Ocorreu um erro ao escolher a imagem'), ToastAndroid.SHORT;
      } else if (response.customButton) {
        ToastAndroid.show(`O usuário usou o botão: ${response.customButton}`), ToastAndroid.SHORT;
      } else {
        setImage(response);
      }
    });
  };

  return (
    <Container>
      <ButtonWrapper>
        <PickerButton title="pick image" onPress={() => pickImage()} />
      </ButtonWrapper>
      <ButtonWrapper>
        <PickerButton title="share image" onPress={() => shareImage()} disabled={image === null} />
      </ButtonWrapper>
      <ButtonWrapper>
        <PickerButton title="share on instagram" onPress={() => shareOnInstagram()} disabled={image === null} />
      </ButtonWrapper>
    </Container>
  );
}
