import React from 'react';

const carsStatusNumber=(props)=>{
  let header=props.status.status+ ' cars ' +(props.status.isToday ? 'today':'')  

return(<div className="container" >
<h3>{header}</h3>
<br></br>
   <h2> {props.countCarsByStatus }</h2>
    </div>)

}
export default carsStatusNumber;