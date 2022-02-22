import axios from "axios";
import React from "react";
function Api()
{
    const [db, setDb] = React.useState("")
    React.useEffect(()=>{
        axios({
            method: 'get',
            url: 'https://house-management-0.herokuapp.com/start',
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });  
    },[])
    const houseDetails=JSON.stringify(
        {

            "houseId":"12211",

            "houseNo":"121",

            "status":"not booked",

            "type":"2BHK"
        
        }, null, 2       
    )
    function saveHouse()
    {
        axios({
            method: 'post',
            url: 'https://house-management-0.herokuapp.com/saveHouse',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            data: JSON.stringify({
                houseId:"12211",
                houseNo:"121",
                status:"not booked",
                type:"2BHK"
            })
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });
    }
    function getByType()
    {
          axios({
            method: 'get',
            url: 'https://house-management-0.herokuapp.com/getByType?type=2BHK',
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });   
    }
    function deleteHouse()
    {
        axios({
            method: 'get',
            url: 'https://house-management-0.herokuapp.com/deleteHouse?id=12211',
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });      
    }
    function getAll()
    {
        axios({
            method: 'get',
            url: 'https://house-management-0.herokuapp.com/getAll',
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });   
    }

    function getHouseId()
    {
        axios({
            method: 'get',
            url: 'https://house-management-0.herokuapp.com/getHouseId?id=12211',
          }).then((response)=>{
             setDb(JSON.stringify(response.data, null, 2))
             console.log(response.data)
          });   
    }

    return(
        <div>
            <h1 className="title">House Management</h1>
            
            <div className="request-call">
                <div>
                    <h2>Add House</h2>
                    <p></p>POST - /saveHouse
                    <br></br>
                    <h3>Request Body:</h3>
                    <pre>{houseDetails}</pre>
                    <button onClick={()=>{saveHouse()}} className="sendBtn">Send</button>
                </div>
                

                <div>
                    <h2>Get By House Type</h2>
                    <p>GET - /getByType?type=2BHK</p>
                    <button onClick={()=>{getByType()}} className="sendBtn">Send</button>
                </div>

                
                <div>
                    <h2>Delete a House</h2>
                    <p>GET - /deleteHouse?id=12211</p>
                    <button onClick={()=>{deleteHouse()}} className="sendBtn">Send</button>
                </div>

                <div>
                    <h2>Get All House</h2>
                    <p>GET - /getAllHouse</p>
                    <button onClick={()=>{getAll()}} className="sendBtn">Send</button>
                </div>
                
                <div>
                    <h2>Get House By ID</h2>
                    <p>GET - /getHouse?id=12212</p>
                    <button onClick={()=>{getHouseId()}} className="sendBtn">Send</button>
                </div>

            </div>
            <div className="api-response">
                <h1>DB-Table</h1>
                <pre>
                    {db}
                </pre>
            </div>
        </div>
    )
}
export default Api;