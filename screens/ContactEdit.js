import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon, CheckBox, Overlay, ButtonGroup, Button } from '@rneui/themed';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generalStyles } from '../styles/Styles';
import { addContact, deleteContact, updateContact } from '../Actions';
import uuid from 'uuid';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function ContactEditScreen({navigation, route}) {

  let contactID = route.params?.contactID;
  let contact = {};
  if (contactID) {
    contact = useSelector(state=>{
      return state.contacts.find(elem=>elem.id===contactID)
    });
  }
  let groups = useSelector(state=>state.groups);

  let dispatch = useDispatch();

  let {firstName, lastName, company, 
    phone, email, address, groups: contactGroups} = contact;

  const [firstNameInput, setFirstNameInput] = useState(firstName ?? '');
  const [lastNameInput, setLastNameInput] = useState(lastName ?? '');
  const [companyInput, setCompanyInput] = useState(company ?? '');

  if (!phone || phone.length === 0) {
    phone = [{
      id: uuid.v4(),
      label: 'Other',
      number: ''
    }]
  }

  if (!email || email.length === 0) {
    email = [{
      id: uuid.v4(),
      label: 'Other',
      emailaddr: ''
    }]
  }

  if (!address || address.length === 0) {
    address = [{
        id: uuid.v4(),
        label: 'Other',
        addr1: '',
        addr2: '',
        city: '',
        state:'',
        postalcode: '',
        country: ''
    }]
  }


  const [phoneList, setPhoneList] = useState(phone);
  const [emailList, setEmailList] = useState(email);
  const [addressList, setAddressList] = useState(address);
  const [groupList, setGroupList] = useState(contactGroups ?? []);

  const labels = ['Home', 'Work', 'Other']; // change this?
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [selectedItemType, setSelectedItemType] = useState('');
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (

    <View style={styles.container}>

      {/* **** HEADER **** */}

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={()=>navigation.goBack()}
          >
            <Text style={[styles.headerText, styles.highlight]}>
              &lt; Back
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.headerText}>
            Edit Contact
          </Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            onPress={()=>{
              const updatedContact = {
                firstName: firstNameInput,
                lastName: lastNameInput,
                company: companyInput,
                phone: phoneList,
                address: addressList,
                email: emailList,
                groups: groupList
              };
              if (contactID) {
                updatedContact.id = contactID;
                dispatch(updateContact(updatedContact));
              } else {
                dispatch(addContact(updatedContact));  
              }
              // then navigate back
              navigation.goBack();              
            }}
          >
            <Text style={[styles.headerText, styles.highlight]}>
                Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* **** BODY **** */}

      <KeyboardAwareScrollView 
        style={styles.body}
        extraScrollHeight={30}
      >

        {/* *** BASIC INFO *** */}
        <View style={styles.entryWithLabel}>
          <View style={styles.entryWithLabelLeft}>
            <Icon 
              name='person'
              type='material'
            />
            <Text style={styles.listItemText}>&nbsp; Basic Info</Text>
          </View>
        </View>

        <View style={styles.entryWithLabel}>
          <View style={styles.entryWithLabelLeft}>
            <View style={{flex: 0.4}}></View>
            <Text>First Name: </Text>
          </View>
          <View style={[styles.entryWithLabelRight]}>
            <TextInput
              style={styles.textInput}
              placeholder='First Name'
              value={firstNameInput}
              onChangeText={text=>setFirstNameInput(text)}
            />
          </View>
        </View>

        <View style={styles.entryWithLabel}>
          <View style={styles.entryWithLabelLeft}>
            <View style={{flex: 0.4}}></View>
            <Text>Last Name: </Text>
          </View>
          <View style={[styles.entryWithLabelRight]}>
            <TextInput
              style={styles.textInput}
              placeholder='Last Name'
              value={lastNameInput}
              onChangeText={text=>setLastNameInput(text)}
            />
          </View>
        </View>

        <View style={styles.entryWithLabel}>
          <View style={styles.entryWithLabelLeft}>
            <View style={{flex: 0.4}}></View>
            <Text>Company: </Text>
          </View>
          <View style={styles.entryWithLabelRight}>
            <TextInput
              style={styles.textInput}
              placeholder='Company'
              value={companyInput}
              onChangeText={text=>setCompanyInput(text)}
            />
          </View>
        </View>

        <View style={styles.hr}/>
        
        {/* *** PHONE NUMBERS *** */}
        <View style={styles.entryWithLabel}>
          <View style={styles.entryWithLabelLeft}>
            <Icon 
              name='phone'
              type='material'
              size={20}
            />
            <Text style={styles.listItemText}>&nbsp; Phone</Text>
          </View>

          <View style={styles.entryWithLabelRight}>
            <TextInput
              style={styles.textInput}
              placeholder='888-555-1212'
              value={phoneList[0].number}
              onChangeText={text=>{
                setPhoneList([{...phoneList[0], number: text}]);
              }}
            />
          </View>

        </View>

        <View style={styles.hr}/>

        {/* *** EMAIL *** */}

        <View style={styles.entryWithLabel}>
          <View style={styles.entryWithLabelLeft}>
            <Icon 
              name='email'
              type='material'
              size={20}
            />
            <Text style={styles.listItemText}>&nbsp; Email</Text>
          </View>
          <View style={styles.entryWithLabelRight}>
            <TextInput
              style={styles.textInput}
              placeholder='person@email.com'
              autoCapitalize='none'
              value={emailList[0].emailaddr}
              onChangeText={text=>{
                setEmailList([{...emailList[0], emailaddr: text}]);
              }}
            />
          </View>
        </View>

        <View style={styles.hr}/>

        {/* *** ADDRESSES *** */}

        <View style={styles.entryWithLabel}>
          <View style={styles.entryWithLabelLeft}>
            <Icon 
              name='address-card'
              type='font-awesome-5'
              size={20}
            />
            <Text style={styles.listItemText}>&nbsp; Address</Text>
          </View>
          <View style={styles.entryWithLabelRight}>
            <View styles={styles.editAddressContainer}>
              <TextInput
                style={styles.textInput}
                placeholder='Address line 1'
                value={addressList[0].addr1}
                onChangeText={text=>{
                  setAddressList([{...addressList[0], addr1: text}])
                }}
              />
              <TextInput
                style={styles.textInput}
                placeholder='Address line 2'
                value={addressList[0].addr2}
                onChangeText={text=>{
                  setAddressList([{...addressList[0], addr2: text}])
                }}
              />
              <TextInput
                style={styles.textInput}
                placeholder='City'
                value={addressList[0].city}
                onChangeText={text=>{
                  setAddressList([{...addressList[0], city: text}])
                }}
              />
              <TextInput
                style={styles.textInput}
                placeholder='State'
                value={addressList[0].state}
                onChangeText={text=>{
                  setAddressList([{...addressList[0], state: text}])
                }}
              />
              <TextInput
                style={styles.textInput}
                placeholder='Postal Code'
                value={addressList[0].postalcode}
                onChangeText={text=>{
                  setAddressList([{...addressList[0], postalcode: text}])
                }}
              />
              <TextInput
                style={styles.textInput}
                placeholder='Country'
                value={addressList[0].country}
                onChangeText={text=>{
                  setAddressList([{...addressList[0], country: text}])
                }}
              />
            </View>
          </View>
        </View>

        <View style={styles.hr}/>

        <View style={styles.entryWithLabel}>
          <View style={styles.entryWithLabelLeft}>
            <Icon 
              name='group'
              type='material'
              size={20}
            />
            <Text style={styles.listItemText}>&nbsp; Groups</Text>
          </View>
          <View style={[styles.entryWithLabelRight, {flexDirection: 'column'}]}>
            <View style={styles.contactGroupContainer}>
              {groups.map(grp=>{
                return (
                  <View style={styles.contactGroupRow} key={grp.id}>
                      <CheckBox
                        title={grp.label}
                        containerStyle={styles.checkBoxContainerStyle}
                        textStyle={styles.checkBoxTextStyle}
                        checked={groupList.some((g=>g.id===grp.id))}
                        onPress={()=>{
                          let thisGroup = groupList.find(g=>g.id===grp.id);
                          if (thisGroup) { // it was in there, so take it out
                            setGroupList(groupList.filter(g=>g.id !== grp.id));
                          } else { // it wasn't in there, so put it in
                            setGroupList(groupList.concat(grp));
                          }
                        }}
                      />
                    {/* <View style={styles.contactGroupEditLeft}>

                    </View>
                    <View style={styles.contactGroupEditRight}>
                      <Text style={styles.contactGroupLabelText}>{grp.label}</Text>
                    </View> */}
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <View style={styles.hr}/>

      {contactID ? 
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={()=>{
            console.log('in CE, deleting contactID', contactID);
            dispatch(deleteContact({id: contactID}));
            navigation.navigate('ContactList');
          }}
        >
          <Icon
            name='trash-o'
            type='font-awesome'
            size={44}
            color='red'
          />
          <Text
            style={[styles.headerText, {color: 'red'}]}
          >Delete Contact</Text>
        </TouchableOpacity>
        :
        <View/>
      }
      </KeyboardAwareScrollView>


      <Overlay
        isVisible={overlayVisible}
        onBackdropPress={()=>{
          setOverlayVisible(false);
        }}
        overlayStyle={styles.popupMenu}
      >
        <View style={[styles.popupHeader, {flex: 0.3}]}>
          <Text style={styles.headerText}>Select label</Text>
        </View>
        <View style={[styles.popupBody, {flex: 0.4}]}>
          <ButtonGroup
            buttons={labels}
            selectedIndex={selectedIndex}
            onPress={(value)=>{
              setSelectedIndex(value);
            }}
            vertical={true}
          />
        </View>
        <View style={styles.popupFooter}>
          <Button
              buttonStyle={styles.popupButton}
              title='Cancel'
              onPress={()=>setOverlayVisible(false)}
            />
          <Button
              buttonStyle={styles.popupButton}
              title='Save'
              onPress={()=>{
                switch (selectedItemType) {
                  case 'phone':
                    const newPhoneNumber = {...selectedItem, label: labels[selectedIndex]};
                    setPhoneList(phoneList.map(
                      p=>p.id===selectedItem.id?newPhoneNumber:p
                    ));
                    setOverlayVisible(false);
                    return;
                  case 'email':
                    const newEmail = {...selectedItem, label: labels[selectedIndex]};
                    setEmailList(emailList.map(
                      e=>e.id===selectedItem.id?newEmail:e
                    ));
                    setOverlayVisible(false);
                    return;
                  case 'address':
                    const newAddress = {...selectedItem, label: labels[selectedIndex]};
                    setEmailList(addressList.map(
                      a=>a.id===selectedItem.id?newAddress:a
                    ));
                    setOverlayVisible(false);
                    return;
                  default:
                    console.log('what??');
                }
              }              
            }
            />
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  ...generalStyles,
  container: {
    ...generalStyles.container, 
    alignItems: 'center'
  },
  entryWithLabel: {
    ...generalStyles.entryWithLabel,
    padding: '1%'
  }

});

export default ContactEditScreen;