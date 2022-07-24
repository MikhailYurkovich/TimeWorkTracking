import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import styleFile from '../style';
import moment from 'moment';
import {BtnContainerApply} from './BtnContainerApply';

const ModalWinDeleteDay = ({
  selectedDay,
  setmodalVisible,
  modalVisible,
  apply,
}) => {
  const btnClose = () => {
    setmodalVisible(false);
  };

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          btnClose();
        }}>
        <TouchableWithoutFeedback onPress={() => btnClose()}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          <View style={styles.modalView}>
            <Text style={styles.textTitle}>Удалить запись?</Text>
            <Text style={[styles.text, {marginBottom: 5}]}>
              {` ${moment(selectedDay).format('DD MMMM YYYY')}`}
            </Text>
            <View style={styles.btnWrap}>
              <BtnContainerApply
                btnApply_1={btnClose}
                btnApply_2={apply}
                textBtn_1={'Отмена'}
                textBtn_2={'Удалить'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    margin: 15,
    position: 'relative',
  },
  modalView: {
    backgroundColor: styleFile.window.backgroundColor,
    borderRadius: 5,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  btnWrap: {
    width: 250,
    alignSelf: 'center',
    marginVertical: 8,
  },

  textTitle: {
    color: styleFile.text.color,
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
    marginVertical: 5,
  },
  text: {
    color: styleFile.text.color,
    fontSize: 15,
    textAlign: 'center',
  },
});
export default ModalWinDeleteDay;
