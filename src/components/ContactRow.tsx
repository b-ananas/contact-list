import Contact from "../Contact.interface";
import "../App.css";

interface Props {
  contact: Contact;
  handleClick: () => void;
}

export const ContactRow: React.FC<Props> = (props: Props) => {
  return (
    <tr onClick={props.handleClick} className="checked">
      <td>
        <div
          className={`contact-button ${props.contact.checked ? "checked" : ""}`}
        >
          {props.contact.id}
          {props.contact.firstName.charAt(0) + props.contact.lastName.charAt(0)}
        </div>
      </td>
      <td>
        <div className={"full-name"}>
          {props.contact.firstName} {props.contact.lastName}{" "}
        </div>
        <div className={"email"}>{props.contact.email}</div>
      </td>
    </tr>
  );
};
