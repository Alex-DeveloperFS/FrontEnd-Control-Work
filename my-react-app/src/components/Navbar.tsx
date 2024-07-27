import {NavLink} from "react-router-dom";

const links: LinlInterface[] = [
  {path: "/", name: "Home"},
  {path: "/posts", name: "Posts"},
  {path: "/users", name: "Users"},
  {path: "/todos", name: "Todos"}
]

const Navbar = () => {

  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar__list">
          {links.map((link: LinlInterface, index: number) => (
            <li key={index} className="navbar__item">
              <NavLink to={link.path} className="navbar__link">{link.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar