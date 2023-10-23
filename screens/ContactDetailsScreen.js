import { ScrollView, StyleSheet, Text,TouchableOpacity, View } from 'react-native';
//import { Text } from '../components/Text';
import { Icon } from '@rneui/themed';
import { useSelector } from 'react-redux';

import { generalStyles } from '../styles/Styles';
import { AddressCard } from '../components/AddressCard';

function ContactDetailScreen({navigation, route}) {

  let {contactID} = route.params;
  let contact = useSelector(state=>{
    return state.contacts.find(elem=>elem.id===contactID);
  });
  let groups = useSelector(state=>state.groups);

  let {firstName, lastName, company, 
    phone, email, address, groups: contactGroups} = contact;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={()=>navigation.navigate('ContactList')}
          >
            <Text style={[styles.headerText, styles.highlight]}>
              &lt; Back
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.headerText}>
            {firstName} {lastName}
          </Text>
          <Text>
            {company}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={()=>navigation.navigate('ContactEdit', 
              {
                contactID: contactID
              }
            )}
          >
            <Text style={[styles.headerText, styles.highlight]}>
                Edit
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.body}>
        {/* phone section */}
        {phone.map(pnum => {
          return (
            <View style={[styles.entryWithLabel]} key={pnum.id}>
              <View style={styles.entryWithLabelLeft}>
                <Icon 
                  name='phone'
                  type='material'
                />
                <Text style={styles.listItemText}>&nbsp; {pnum.label}</Text>
              </View>
              <View style={styles.entryWithLabelRight}>
                <Text>{pnum.number}</Text>
              </View>
            </View>
          )
        })}
        {email.map(em => {
          return (
            <View style={[styles.entryWithLabel]} key={em.id}>
              <View style={styles.entryWithLabelLeft}>
                <Icon 
                  name='email'
                  type='material'
                />
                <Text style={styles.listItemText}>&nbsp; {em.label}</Text>
              </View>
              <View style={styles.entryWithLabelRight}>
                <Text>{em.emailaddr}</Text>
              </View>
            </View>
          )
        })}
        {address.map(addr => {
          return (
            <AddressCard address={addr} key={addr.id}/>
          )
        })}

        <View style={[styles.entryWithLabel]}>
          <View style={styles.entryWithLabelLeft}>
            <Icon 
              name='group'
              type='material'
            />
            <Text style={styles.listItemText}>&nbsp; Groups</Text>
          </View>
          <View style={styles.entryWithLabelRight}>
            <View style={styles.contactGroupContainer}>
              {contactGroups.map(grp=>{
                console.log(groups);
                console.log(contactGroups);
                console.log(grp);
                const groupObj = groups.find(g=>grp.id===g.id);
                const groupLabel = groupObj.label;
                return (
                  <Text 
                    style={styles.aLittlePadding} 
                    key={groupObj.id}>
                    {groupLabel}
                  </Text>
                );
              })}
            </View>
          </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  ...generalStyles,
  container: {
    ...generalStyles.container, 
    alignItems: 'center'
  },

});

export default ContactDetailScreen;