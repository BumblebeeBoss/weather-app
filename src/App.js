import React,{useState} from "react";
// import  ReactDOM  from "react-dom";
import summer from "./images/summer.jpg"
import winter from "./images/winter.jpg"

const App=()=>{
    
const  [latitude,setLatitude]=useState(0);
const [longitude,setLongitude]=useState(0);
const [hemisphere,setSemisphere]=useState("");
const [month,setMonth]=useState(()=>{return new Date().getMonth()+1})//lazy initialization 
// we put this new date inside call back bcz we didnt want calculation happen again and again  when page is reload 

function fetchLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
       console.log(position)
       setLatitude(position.coords.latitude)
       setLongitude(position.coords.longitude)// thet both set latitude and set longitude are async code so
       // below code is sync code so before calculating the inside set code below code will run thts why hemisphere will not update if write
       // condition =(latitude>0)
       //so for calculatiin exact hemisphre will write exact value  "position.coords.latitude" inside if condition

       if(position.coords.latitude>0){
        setSemisphere("northern semisphere")
       }
       else if(position.coords.latitude<0){
        setSemisphere("southern semisphere")
       }
       else{
        setSemisphere("equator")
       }
      })
    }
    else{
        alert("some thing is wrong")
    }
}

 return (
     <div>
    
    <button onClick={fetchLocation}>fetch Location</button>
     <h1>latitude:{latitude}</h1>
     <h1>longitude:{longitude}</h1>
     <h1>hemisphere:{hemisphere}</h1>
     <h1>month:{month}</h1>
   {
      hemisphere && (
      (hemisphere=="northern semisphere"&& month>=4 && month<=10)||
      (hemisphere=="souththern semisphere"&& month<4 && month>10)
      ) &&
      
      (
        <div>
            <h1>Summer season</h1>
            <img src={summer} alt="summer"/>
        </div>
      )
      
   }

{
      hemisphere&&(hemisphere=="northern semisphere"&&( month<4|| month>10))&&
      (
        <div>
            <h1>Winter season</h1>
            <img src={winter} alt="winter"/>
        </div>
      )
      
   }


     </div>
 )


}
export default App;

