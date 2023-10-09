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
    alignItems: 'center',
    fontSize: 20
  },
  entryWithLabelRight: {
    flex: 0.6,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 20
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
  }
}