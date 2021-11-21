import { useState, useEffect } from "react";
import _ from "lodash";
import Contact from "./Contact.interface";
import { ApiUrl } from "./constants";
import { ContactRow } from "./components/ContactRow";
import "./App.css";

function App() {
  const [users, setUsers] = useState<Array<Contact>>([]);
  useEffect(() => {
    fetch(ApiUrl)
      .then((response) => response.json())
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
      .then((json) => setUsers(json));
  }, []);

  const [checked, setChecked] = useState<Set<string>>(new Set());

  // toggle checked for contact of given id
  const udpateChecked = (id: string) => {
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

  useEffect(() => {
    console.log(checked);
    setUsers(
      users.map((usr) =>
        checked.has(usr.id)
          ? { ...usr, checked: true }
          : { ...usr, checked: false }
      )
    );
  }, [checked]);

  return (
    <div className="App">
      <table>
        {users.map((usr) => (
          <ContactRow contact={usr} handleClick={() => udpateChecked(usr.id)} />
        ))}
      </table>
    </div>
  );
}

export default App;
