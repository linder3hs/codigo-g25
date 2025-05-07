export default function Menu(props) {
  // props.items = ["Inicio", "Proyetos", ...]
  return (
    <ul>
      {props.items.map((item) => (
        <li>
          <a href="#">{item}</a>
        </li>
      ))}
    </ul>
  );
}
