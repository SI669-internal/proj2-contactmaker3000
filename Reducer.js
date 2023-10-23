
import uuid from 'uuid';

const LOAD_ON_INIT = 'LOAD_ON_INIT';
const ADD_CONTACT = 'ADD_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const DELETE_CONTACT = 'DELETE_CONTACT';
const ADD_GROUP = 'ADD_GROUP';
const UPDATE_GROUP = 'UPDATE_GROUP';
const DELETE_GROUP = 'DELETE_GROUP';

const loadOnInit = (state, contacts, groups) => {
  return {
    contacts: contacts, 
    groups: groups
  }
}

const addContact = (state, newContact) => {
  let contact = {
    ...newContact,
  }
  return {
    ...state, 
    contacts: [...state.contacts, contact]
  };
}

// change to use Firebase
const updateContact = (state, itemId, updatedContact) => {
  let contact = {...updatedContact};
  let newState = { 
    ...state, 
    contacts: state.contacts.map(item=>item.id === itemId ? contact : item)
  };
  return newState;
}

// change to use Firebase
const deleteContact = (state, itemId) => {
  return {
    ...state, 
    contacts: state.contacts.filter(item=>item.id !== itemId)
  }
}

const addGroup = (state, groupObj) => {
  return {
    ...state, 
    groups: [...state.groups, {...groupObj}]
  }
}

const updateGroup = (state, updatedGroupObj) => {
  return {
    ...state,
    groups: state.groups.map(g=>{
      return ( 
        g.id==updatedGroupObj.id ?
          {...updatedGroupObj} :
          g
      );
    })
  }
}

const deleteGroup = (state, groupObj) => {
  let updatedContacts = [];
  state.contacts.forEach(c => {
    updatedContacts.push({
        ...c,
        groups: c.groups.filter(g=>g.id!==groupObj.id)
    });
  });
  console.log('deleting', groupObj.id);
  return {
    ...state, 
    contacts: updatedContacts,
    groups: state.groups.filter(g=>g.id!==groupObj.id)
  }
}


const initGroups = [
  {
    id: uuid.v4(),
    label: 'Friends'
  },
  {
    id: uuid.v4(),
    label: 'Business'
  }
];

const initContacts = [
  { 
    id: uuid.v4(),
    firstName: 'Jane',
    lastName: 'Doe',
    company: 'Doe Consulting, LLC',
    phone: [
      {
        id: uuid.v4(),
        label: 'Mobile',
        number: '734-555-1212'
      },
      { 
        id: uuid.v4(),
        label: 'Work',
        number: '734-555-2211'
      }
    ],
    address: [
      {
        id: uuid.v4(),
        label: 'Home',
        addr1: '123 Oak St.',
        addr2: '',
        city: 'Ann Arbor',
        state: 'MI',
        postalcode: '48103',
        country: 'USA'
      },
      {
        id: uuid.v4(),
        label: 'Work',
        addr1: '3 Corporate Circle',
        addr2: '',
        city: 'Dearborn',
        state: 'MI',
        postalcode: '48301',
        country: 'USA'
      }
    ],
    email: [
      {
        id: uuid.v4(),
        label: 'Personal',
        emailaddr: 'janedoe@coldmail.com'
      },
      {
        id: uuid.v4(),
        label: 'Work',
        emailaddr: 'jane.e.doe@doeconsulting.com'
      }
    ],
    groups: [initGroups[0].id, initGroups[1].id]
  },
  { 
    id: uuid.v4(),
    firstName: 'John',
    lastName: 'Buck',
    company: 'Buck\'s Flower Shop',
    phone: [
      {
        id: uuid.v4(),
        label: 'Mobile',
        number: '734-555-3333'
      },
      { 
        id: uuid.v4(),
        label: 'Work',
        number: '734-555-4000'
      }
    ],
    address: [
      {
        id: uuid.v4(),
        label: 'Home',
        addr1: '456 Chestnut St.',
        addr2: '',
        city: 'Ann Arbor',
        state: 'MI',
        postalcode: '48103',
        country: 'USA'
      },
      {
        id: uuid.v4(),
        label: 'Work',
        addr1: '111 Main St.',
        addr2: '',
        city: 'Ann Arbor',
        state: 'MI',
        postalcode: '48104',
        country: 'USA'
      }
    ],
    email: [
      {
        id: uuid.v4(),
        label: 'Personal',
        emailaddr: 'jb11245@yeehaw.com'
      },
      {
        id: uuid.v4(),
        label: 'Work',
        emailaddr: 'contact@bucksflowers.com'
      }
    ],
    groups: [initGroups[0].id]
  }
];

const initialState = {
  contacts: initContacts,
  groups: initGroups
}

function rootReducer(state=initialState, action) {
  console.log('in reducer, action:', JSON.stringify(action));
  switch (action.type) {
    case LOAD_ON_INIT:
      return loadOnInit(state, action.payload.contacts, action.payload.groups);
    case ADD_CONTACT:
      return addContact(state, action.payload.contact);
    case UPDATE_CONTACT:
      return updateContact(state, action.payload.contact.id, action.payload.contact);
    case DELETE_CONTACT:
      return deleteContact(state, action.payload.id);
    case ADD_GROUP:
      return addGroup(state, action.payload.group);
    case UPDATE_GROUP:
      return updateGroup(state, action.payload.group);
    case DELETE_GROUP:  
      return deleteGroup(state, action.payload.group);
    default:
      return state;
  }
}

export { 
  rootReducer, 
  LOAD_ON_INIT, 
  ADD_CONTACT, 
  UPDATE_CONTACT, 
  DELETE_CONTACT,
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP
};