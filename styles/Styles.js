export const generalStyles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 0.15,
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    padding: '5%'
  },
  headerLeft: {
    flex: 0.3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerRight: {
    flex: 0.3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 20
  },
  highlight: {
    color: 'blue'
  },
  // body styling
  body: {
    flex: 0.85,
    backgroundColor: 'white',
    width: '100%',
    padding: '5%',
//    backgroundColor: 'green'
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: '2%',
  },
  listItemText: {
    fontSize: 20
  },
  entryWithLabel: {
    flexDirection: 'row',
    padding: '3%',
    width: '100%'
  },
  entryWithLabelLeft: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20
  },
  entryWithLabelRight: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: 20
  },
  editAddressContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  textInput: {
    borderBottomColor: 'gray', 
    borderBottomWidth: 1, 
    width:'100%',
    fontSize: 20,
    color: 'gray'
  },
  hr: {
    flex: 0.05, 
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    width: '95%',
    marginTop: '6%',
    marginBottom: '6%',
    alignSelf: 'center'
  },
  contactGroupContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  contactGroupRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  checkBoxContainerStyle: {
    padding: '1%',
    margin: 0
  },
  checkBoxTextStyle: {
    fontWeight: 'normal'
  },
  aLittlePadding: {
    padding: '1%'
  },
  deleteButton: {
    flex: 0.1,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '50%'
  },
  groupRow: {
    flexDirection: 'row',
    width: '100%',
    paddingBottom: '5%',
    paddingHorizontal: '5%'
  },
  groupRowLeft: {
    flex: 0.8,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  groupRowRight: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  groupRowText: {
    fontSize: 24
  },
  popup: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    padding: '10%',
    margin: '20%',
    borderRadius: 6
  },
  popupMenu: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    padding: '5%',
    margin: '5%',
    borderRadius: 6  
  },
  popupHeader: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: '5%',
  },

  popupBody: {
    flex: 0.45,
    justifyContent: 'center',
    width: '100%',
  },
  popupFooter: {
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: '5%',
    width: '100%',
  },
  popupButton: {
    borderRadius: 6,
    paddingHorizontal: '5%'
  }
}