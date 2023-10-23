import {StyleSheet, Text, View} from 'react-native';
import {Icon} from '@rneui/themed';

import { generalStyles } from '../styles/Styles';

export function AddressCard(props) {
  const {address} = props;
  return (
    <View style={styles.entryWithLabel}>
      <View style={styles.entryWithLabelLeft}>
        <Icon
          name='address-card'
          type='font-awesome-5'
          size={20}
        />
        <Text style={styles.listItemText}>&nbsp; {address.label}</Text>
      </View>
      <View style={[styles.entryWithLabelRight, {flexDirection: 'column'}]}>
        <Text>{address.addr1}</Text>
        {address.addr2 === '' ? <View/> : <Text>{address.addr2}</Text>}
        <Text>{address.city}, {address.state} {address.postalcode} {address.country}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  ...generalStyles,
  cardContainer: {
    //padding: '5%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingBottom: '5%'
  },
  listItemText: {
    ...generalStyles.listItemText
  }
})