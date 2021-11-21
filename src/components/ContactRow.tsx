import Contact from "../Contact.interface";

interface Props {
  contact: Contact;
}

export const ContactRow: React.FC<Props> = (props: Props) => {
  return (
    <tr>
      <td>
        <button className={'contact-button'}>
          {props.contact.firstName.charAt(0) +
            props.contact.lastName.charAt(0)}
        </button>
      </td>
      <td>
        <div className={'full-name'}>{props.contact.firstName} {props.contact.lastName} </div>
        <div className={'email'}>{props.contact.email}</div>
      </td>
    </tr>
  );
};
