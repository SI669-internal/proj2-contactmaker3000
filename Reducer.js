
const ADD_CONTACT = 'ADD_CONTACT';
const UPDATE_CONTACT = 'UPDATE_CONTACT';
const DELETE_CONTACT = 'DELETE_CONTACT';

// change to use Firebase
const addContact = (state, newContact) => {
  let contact = {
    ...newContact,
    id: Date.now()
  }
  return {
    ...state, 
    contacts: [...state.contacts, contact]
  };
}

// change to use Firebase
const updateContact = (state, itemId, updatedContact) => {
  let contact = {...updatedContact};
  return {
    ...state, 
    contacts: state.contacts.map(item=>item.id === itemId ? contact : item)
  };
}

// change to use Firebase
const deleteContact = (state, itemId) => {
  return {
    ...state, 
    contacts: state.contacts.filter(item=>item.id !== itemId)
  }
}

const initContacts = [
  { 
    id: Date.now(),
    firstName: 'Jane',
    lastName: 'Doe',
    company: 'Doe Consulting, LLC',
    phone: [
      {
        label: 'Mobile',
        number: '734-555-1212'
      },
      { 
        label: 'Work',
        number: '734-555-2211'
      }
    ],
    address: [
      {
        label: 'Home',
        addr1: '123 Oak St.',
        addr2: '',
        city: 'Ann Arbor',
        state: 'MI',
        postalcode: '48103',
        country: 'USA'
      },
      {
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
        label: 'Personal',
        emailaddr: 'janedoe@coldmail.com'
      },
      {
        label: 'Work',
        emailaddr: 'jane.e.doe@doeconsulting.com'
      }
    ],
    groups: [1, 2]
  },
  { 
    id: Date.now() + 1,
    firstName: 'John',
    lastName: 'Buck',
    company: 'Buck\'s Flower Shop',
    phone: [
      {
        label: 'Mobile',
        number: '734-555-3333'
      },
      { 
        label: 'Work',
        number: '734-555-4000'
      }
    ],
    address: [
      {
        label: 'Home',
        addr1: '456 Chestnut St.',
        addr2: '',
        city: 'Ann Arbor',
        state: 'MI',
        postalcode: '48103',
        country: 'USA'
      },
      {
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
        label: 'Personal',
        emailaddr: 'jb11245@yeehaw.com'
      },
      {
        label: 'Work',
        emailaddr: 'contact@bucksflowers.com'
      }
    ],
    groups: [1]
  }
];

const initGroups = [
  {
    id: 1,
    label: 'Friends'
  },
  {
    id: 2,
    label: 'Business'
  }
];

const initialState = {
  contacts: initContacts,
  groups: initGroups
}

function rootReducer(state=initialState, action) {
  switch (action.type) {
    case ADD_CONTACT:
      return addContact(state, action.payload.contact);
    case UPDATE_CONTACT:
      return updateContact(state, action.payload.id, action.payload.contact);
    case DELETE_CONTACT:
      return deleteContact(state, action.payload.id);
    default:
      return state;
  }
}

export { rootReducer, ADD_CONTACT, UPDATE_CONTACT, DELETE_CONTACT };