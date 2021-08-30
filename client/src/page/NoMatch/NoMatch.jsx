import React from "react";
import './NoMatch.scss';
import NavLayout from "../../layout/NavLayout/NavLayout";

function NoMatch () {

  return (
    <NavLayout>
      <section className="no-match">
        <div className="no-match__content">
          <h5 className="no-match__h5">404</h5>
          <span className="no-match__desc">Page notfound</span>
        </div>
      </section>
    </NavLayout>
  )
}

export default NoMatch;