import React from "react";

function Driver(props){
  return (
    <div>
        <p>{props.driver.name} | {props.driver.phone_number}</p>
    </div>
  );
}

export default Driver;
