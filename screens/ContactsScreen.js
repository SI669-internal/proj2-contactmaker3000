import { FlatList, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { Button, ButtonGroup, Icon, Overlay } from '@rneui/themed';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { generalStyles } from '../styles/Styles';

function ContactsScreen({navigation}) {

  const contacts = useSelector(state=>state.contacts);
  const groups = useSelector(state=>state.groups);

  const allContactsGroup = {id: -1, label: "All Contacts"};

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [groupFilter, setGroupFilter] = useState(allContactsGroup);
  const [selectedIndex, setSelectedIndex] = useState(0);


  console.log('filtering by', groupFilter);

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          onPress={()=>{
            setOverlayVisible(true);
          }}  
        >
          <Text style={styles.headerText}>
            <Icon
              name='group'
              type='material'
              size={20}
            />
            &nbsp; {groupFilter.label} &nbsp;  
            <Icon
              name='right'
              type='antdesign'
              size={20}
            />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={()=>{
            navigation.navigate('ContactEdit'); // with no ID, so it's an add
          }}
        >
          <Icon
            name='pluscircle'
            type='antdesign'
            size={32}

          />
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <FlatList
          data={contacts}
          //contentContainerStyle={styles.listContainer}
          renderItem={({item})=>{
            console.log('rendering item', item);
            if (groupFilter.id === -1 || item.groups.some((g=>g.id===groupFilter.id))) {
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
          } else {
            return <View/>  
          }}  
        }
        />
      </View>
      
      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={()=>{
          setOverlayVisible(false);
        }}
        overlayStyle={styles.popupMenu}
      >
        <View style={[styles.popupHeader, {flex: 0.3}]}>
          <Text style={styles.headerText}>Filter by group</Text>
        </View>
        <View style={[styles.popupBody, {flex: 0.7}]}>
          <ButtonGroup
            buttons={[allContactsGroup.label, ...(groups.map(g=>g.label))]}
            selectedIndex={selectedIndex}
            onPress={(value)=>{
              setSelectedIndex(value);
              setGroupFilter(value==0?allContactsGroup:groups[value-1]);
              setOverlayVisible(false);
            }}
            vertical={true}
          />
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  ...generalStyles
});

export default ContactsScreen;