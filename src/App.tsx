import { useState, useEffect } from "react";
import _ from "lodash";
import Contact from "./Contact.interface";
import { ApiUrl } from "./constants";
import { ContactRow } from "./components/ContactRow";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
function App() {
  const [contacts, setContacts] = useState<Array<Contact>>([]);

  //retrieve contacts from api
  useEffect(() => {
    fetch(ApiUrl)
      .then((response) => response.json())
      //move from snake_case to camelCase
      .then((json) =>
        json.map((contact: Contact) =>
          _.mapKeys(contact, (_value: any, key: any) => _.camelCase(key))
        )
      )
      .then((json) =>
        json.sort((prev: Contact, next: Contact) =>
          prev.lastName.localeCompare(next.lastName)
        )
      )
      .then((json) => setContacts(json));
  }, []);

  const [checked, setChecked] = useState<Set<string>>(new Set());

  useEffect(() => {
    console.log(checked);
    setContacts(
      contacts.map((usr) =>
        checked.has(usr.id)
          ? { ...usr, checked: true }
          : { ...usr, checked: false }
      )
    );
  }, [checked]);

  // add or remove from list of checked contacts
  const updateChecked = (id: string) => {
    if (checked.has(id)) {
      const newSet = new Set(checked);
      newSet.delete(id);
      setChecked(newSet);
    } else {
      const newSet = new Set(checked);
      newSet.add(id);
      setChecked(newSet);
    }
  };

  const [filter, setFilter] = useState("");

  return (
    <div className="App">
      <Table striped bordered hover>
        <thead>
          <th></th>
          <th>
            <input
              placeholder="filter"
              type="text"
              onChange={(e) => setFilter(e.target.value)}
            ></input>
          </th>
          <th>Select</th>
        </thead>
        <tbody>
          {contacts
            .filter(
              (contact) =>
                contact.lastName.includes(filter) ||
                contact.firstName.includes(filter)
            )
            .map((usr) => (
              <ContactRow
                contact={usr}
                handleClick={() => updateChecked(usr.id)}
              />
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
