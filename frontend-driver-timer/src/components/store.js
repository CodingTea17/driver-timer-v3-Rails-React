import React from "react";
import { NavLink } from 'react-router-dom';

function Store(props){
  return (
    <div>
      <NavLink
        to={`/store/${props.store.id}`}
        activeClassName='is-active'
      >
        {props.store.store_number}
      </NavLink>
    </div>
  );
}

export default Store;
