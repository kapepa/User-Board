import React from "react";
import './NavLayout.scss'
import { useHistory, useLocation } from "react-router-dom";
import WarningPopup from '../../components/WarningPopup/WarningPopup'

function NavLayout ({children}){
  const history = useHistory()
  const location = useLocation();

  return(
    <>
      <WarningPopup/>
      <div className="container">
        <div className="nav-layout">
          <header className="nav-layout__header">
            <nav className="navigation">
              <button
                onClick={() => {history.push("/")}}
                className={`navigation__btn ${location.pathname === "/" ? "navigation__btn--active" : ""}`}
              >Home</button>
              <button
                onClick={() => {history.push("/users")}}
                className={`navigation__btn ${location.pathname === "/users" ? "navigation__btn--active" : ""}`}
              >Users</button>
            </nav>
          </header>
          <div className="nav-layout__body">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default NavLayout