import * as Animatable from "react-native-animatable";
import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CustomPickerItem from "../../common/components/custom-picker-item";
import React from "react";

export const ActivityKindModal = ({closeModal, activityKinds, selectActivity, selectedValue}) => {
  return(
    <Animatable.View transition="height" style={styles.animatedView}>
      <TouchableOpacity style={styles.closeIconContainer} onPress={closeModal}>
        <Icon name="md-close-circle" style={styles.closeIcon} />
      </TouchableOpacity>
      <View style={styles.content}>
        <FlatList data={activityKinds}
                  keyExtractor={item => item.id}
                  renderItem={(item) => <CustomPickerItem item={item} select={selectActivity} selectedValue={selectedValue} />}
        />
      </View>
    </Animatable.View>
  )
};

export default ActivityKindModal;

const styles = StyleSheet.create({
  animatedView: {
    height: 250,
    width: '100%',
    margin: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 15
  },
  content: {
    marginBottom: 15
  },
  closeIconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeIcon: {
    color: '#909090',
    paddingLeft: 10,
    fontSize: 28
  }
});
