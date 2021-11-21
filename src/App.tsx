import {useState, useEffect} from 'react'
import _ from "lodash";
import Contact from './Contact.interface';
import {ApiUrl} from './constants'
import { ContactRow } from './components/ContactRow';


function App() {
  const [users, setUsers] = useState<Array<Contact>>([]);
  useEffect(()=> {
    fetch(ApiUrl)
      .then(response => response.json())
      .then(json => json
        .map((contact: Contact)=> _.mapKeys(contact, (_value: any, key: any) => _.camelCase(key))))
      .then(json => json.sort((prev: Contact, next: Contact) => prev.lastName.localeCompare(next.lastName)))
      .then(json => setUsers(json))
  }, [])



  return (
    <div className="App">
      <table>
      {users.map((usr)=> <ContactRow contact={usr} />)}
      </table>
    </div>
  );
}

export default App;
