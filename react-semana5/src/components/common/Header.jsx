import Menu from "./Menu";

function Header(props) {
  console.log(props.fullname);
  return (
    <header>
      <nav>
        <div>
          <h3>{props.fullname}</h3>
          <p>{props.address}</p>
          <p>{props.phone}</p>
        </div>
        <Menu items={props.items} />
      </nav>
    </header>
  );
}

export default Header;
