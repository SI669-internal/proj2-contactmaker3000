
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, collection, 
  getDocs, setDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

import { LOAD_ON_INIT, ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT, ADD_GROUP, UPDATE_GROUP, DELETE_GROUP } from "./Reducer"
import { firebaseConfig } from './Secrets';

let app = undefined;
if (getApps().length == 0) {
  app = initializeApp(firebaseConfig);
}
const db = getFirestore(app);

export const loadOnInit = () => {
  return async dispatch => {
    
    let initContacts = [];
    const contactsSnapshot = await getDocs(collection(db, 'contacts'));
    contactsSnapshot.docs.forEach((docSnapshot)=>{
      let contact = docSnapshot.data();
      contact.id = docSnapshot.id; // maybe not needed
      initContacts.push(contact);
    });

    let initGroups = [];
    const groupsSnapshot = await getDocs(collection(db, 'groups'));
    groupsSnapshot.docs.forEach(docSnapshot => {
      let group = docSnapshot.data();
      group.id = docSnapshot.id; // maybe not needed either
      initGroups.push(group);
    });
    console.log('about to dispatch', LOAD_ON_INIT);
    dispatch({
      type: LOAD_ON_INIT,
      payload: {
        contacts: initContacts,
        groups: initGroups
      }
    });
  }
}

export const addContact = (newContact) => {
  return async dispatch => {
    const docRef = await addDoc(collection(db, 'contacts'), newContact);
    const contactToAdd = {
      ...newContact, 
      id: docRef.id
    }

    dispatch( {
        type: ADD_CONTACT,
        payload: {
          contact: {...contactToAdd}
        }
      }
    )
  }
}

export const updateContact = (updatedContact) => {
  return async dispatch => {
    await setDoc(doc(db, 'contacts', '' + updatedContact.id), updatedContact);
    dispatch( {
        type: UPDATE_CONTACT,
        payload: {
          id: updatedContact.id,
          contact: {...updatedContact}
        }
      }
    );
  }
}

export const deleteContact = (contactToDelete) => {
  console.log('deleting contact with ID', contactToDelete.id);
  return async dispatch => {
    await deleteDoc(doc(db, 'contacts', contactToDelete.id));
    dispatch( {
        type: DELETE_CONTACT,
        payload: {
          id: contactToDelete.id,
        }
      }
    );
  }
}

export const addGroup = (group) => {
  return async dispatch => {
    const docRef = await addDoc(collection(db, 'groups'), {
      label: group.label
    });
    dispatch({
      type: ADD_GROUP,
      payload: {
        group: {
          id: docRef.id,
          label: group.label
        }
      }
    });
  }
}

export const updateGroup = (group) => {
  return async dispatch => {
    await updateDoc(doc(db, 'groups', group.id), {
      label: group.label
    });
    dispatch({
      type: UPDATE_GROUP,
      payload: {
        group: { ...group }
      }
    });
  }}

  export const deleteGroup = (group) => {
    return async (dispatch, getState) => {
      let contacts = getState().contacts;
      contacts.forEach(c => {
        c.groups.forEach(async g => {
          if (g.id === group.id) {
            let newC = {...c, groups: c.groups.filter(g=>g.id !== group.id)};
            await updateDoc(doc(db, 'contacts', c.id), newC);
          }
        });
      });
      await deleteDoc(doc(db, 'groups', group.id));
      console.log('deleted from firebase group:', group);
      dispatch({
        type: DELETE_GROUP,
        payload: {
          group: group
        }
      })
    }
  }
