import { FlatList, TouchableOpacity, Text, View, TextInput } from 'react-native';
import { Button, Icon, Overlay } from '@rneui/themed';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

import { generalStyles } from '../styles/Styles';
import { addGroup, updateGroup, deleteGroup } from '../Actions';

function GroupsScreen({navigation}) {

  const groups = useSelector(state=>state.groups); 

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [inputText, setInputText] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(undefined);

  const dispatch = useDispatch();


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
            &nbsp; Groups &nbsp;  
            <Icon
              name='right'
              type='antdesign'
              size={20}
            />
          </Text>
        </View>
        <TouchableOpacity
          onPress={()=>{
            setSelectedGroup(undefined);
            setInputText('');
            setOverlayVisible(true);
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
            data={groups}
            renderItem={({item}) => {
              return (
                <View style={styles.groupRow}>
                    <View style={styles.groupRowLeft}>
                      <Text style={styles.groupRowText}>{item.label}</Text>
                    </View>
                  <View style={styles.groupRowRight}>
                    <TouchableOpacity
                      onPress={()=>{
                        dispatch(deleteGroup(item));
                      }}
                    >
                      <Icon
                        name='trash-o'
                        type='font-awesome'
                        style={styles.groupRowText}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={()=>{
                        setSelectedGroup(item);
                        setInputText(item.label);
                        setOverlayVisible(true)
                      }}
                    >
                      <Icon
                        name='edit'
                        type='font-awesome'
                        style={styles.groupRowText}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}    
          />
      </View>


    <Overlay
      isVisible={overlayVisible}
      overlayStyle={styles.popup}
    >
        {/* <View style={styles.popupHeader}>
          <Text style={styles.headerText}>
            Name your group  
          </Text>
        </View> */}
        <View style={styles.popupBody}>
          <TextInput
            style={styles.textInput}
            placeholder='New group name'
            value={inputText}
            onChangeText={text=>setInputText(text)}
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
              if (selectedGroup) {
                dispatch(updateGroup({
                    ...selectedGroup,
                    label: inputText
                }));
              } else {
                dispatch(addGroup({label: inputText}));              
              }
              setSelectedGroup(undefined);
              setInputText('');
              setOverlayVisible(false)}
            }
          />
        </View>



    </Overlay>
    </View>
  );
}

const styles = {...generalStyles};

export default GroupsScreen;