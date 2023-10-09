import { FlatList, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button, Icon } from '@rneui/themed';
import { useSelector } from 'react-redux';

import { generalStyles } from '../styles/Styles';

function ContactsScreen({navigation}) {

  const contacts = useSelector(state=>state.contacts);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>
            <Icon
              name='group'
              type='material'
              size={20}
            />
            &nbsp; All Contacts &nbsp;  
            <Icon
              name='right'
              type='antdesign'
              size={20}
            />
          </Text>
        </View>
        <View>
          <Icon
            name='pluscircle'
            type='antdesign'
            size={32}

          />
        </View>
      </View>

      <View style={styles.body}>
        <FlatList
          data={contacts}
          //contentContainerStyle={styles.listContainer}
          renderItem={({item})=>{
            return (
              <TouchableOpacity style={styles.listItemContainer}
                onPress={()=>navigation.navigate("ContactDetails", {
                  contactID: item.id
                })}
              >
                <Text style={styles.listItemText}>
                  {item.firstName} {item.lastName}
                </Text>
              </TouchableOpacity>
            );
          }}  
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ...generalStyles
});

export default ContactsScreen;