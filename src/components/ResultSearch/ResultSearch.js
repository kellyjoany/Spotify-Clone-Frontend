{/*import React from "react";

const ResultSearch = (props) => {
// console.log(props.list.data)
//console.log(props.nameListProduct)
 const filteredArray = props.nameList.filter((e) => {
   return e.name.toLowerCase().includes(props.nameListProduct.nameList.toLowerCase());
 });
 console.log(filteredArray);
 
 let musicList = filteredArray.map((e) =>{
//console.log(e)
    return (
        <div className="list">
          <div key={e._id}> 
          <Link to={`/playlist/${e._id}`}>
            <div className="playlistBrowser">
              <img src={e.imageAlbum} alt={e.name} />
              <strong>{e.name}</strong>
              <p>{e.description}</p>
            </div>
          </Link>
          </div>
      </div>
    );
}

export default ResultSearch; /*}