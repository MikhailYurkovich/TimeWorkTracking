import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import styleFile from '../style';

const ModalWinMessage = ({modalWin, setmodalWin}) => {
  if (!modalWin) {
    modalWin = {
      visible: false,
      textTitle: '',
      text: '',
    };
  }

  let ButtonMenu = ({fucnDelBd, idDel, reloadData, setListData, newData}) => {
    //Удалить день по id с бд и обновить массив с днями
    if (fucnDelBd && idDel && reloadData && newData && setListData) {
      return (
        <>
          <Pressable
            style={styles.buttonClose}
            onPress={() => setmodalWin(false)}>
            <Text style={styles.text}>Отмена</Text>
          </Pressable>
          <Pressable
            style={styles.buttonClose}
            onPress={() => [
              setmodalWin(false),
              fucnDelBd(idDel, reloadData),
              setListData(newData),
            ]}>
            <Text style={styles.text}>Удалить</Text>
          </Pressable>
        </>
      );

      //Удалить Месяц по id с бд и обновить
    } else if (fucnDelBd && idDel && reloadData) {
      return (
        <>
          <Pressable
            style={styles.buttonClose}
            onPress={() => setmodalWin(false)}>
            <Text style={styles.text}>Отмена</Text>
          </Pressable>
          <Pressable
            style={styles.buttonClose}
            onPress={() => [
              setmodalWin(false),
              fucnDelBd(idDel),
              reloadData(),
            ]}>
            <Text style={styles.text}>Удалить</Text>
          </Pressable>
        </>
      );
    } else {
      return (
        <>
          <Pressable
            style={styles.buttonClose}
            onPress={() => setmodalWin(false)}>
            <Text style={styles.text}>Ок</Text>
          </Pressable>
        </>
      );
    }
  };

  const modalVisible = modalWin.visible;
  const textTitle = modalWin.textTitle;
  const text = modalWin.text;

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setmodalWin(false);
        }}>
        <TouchableWithoutFeedback onPress={() => setmodalWin(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          <View style={styles.modalView}>
            <View style={styles.modalConteiner}>
              <Text style={[styles.text, styles.textTitle, {marginBottom: 3}]}>
                {textTitle}
              </Text>
              <Text style={[styles.text]}>{text}</Text>

              <View style={styles.battonContainer}>
                <ButtonMenu
                  fucnDelBd={modalWin.fucnDelBd}
                  idDel={modalWin.idDel}
                  reloadData={modalWin.reloadData}
                  setListData={modalWin.setListData}
                  newData={modalWin.newData}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    margin: '10%',
  },
  modalView: {
    backgroundColor: styleFile.window.backgroundColor,
    borderRadius: 15,
  },
  modalConteiner: {
    margin: 10,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  battonContainer: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
  },
  buttonClose: {
    paddingTop: 1,
    paddingBottom: 2,
    // paddingLeft: 15,
    // paddingRight: 15,
    backgroundColor: styleFile.button.backgroundColor,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 10,
    width: '35%',
  },
  text: {
    color: styleFile.text.color,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ModalWinMessage;
