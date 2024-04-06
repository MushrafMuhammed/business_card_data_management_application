import { BASE_URL } from '../../constants/urls';
import React, { useState, useEffect } from 'react';
import {Button, Table} from 'react-bootstrap'; 

function CardDetailsList() {
    const [cardList, setCardList] = useState([]);
    const [userData, setUserData] = useState(sessionStorage.getItem("user"));
    useEffect(()=>{
        if (userData){
        setUserData(JSON.parse(userData))
        }
    },[])
    const fetchData = () => {
        // Fetch data from the API
        fetch(BASE_URL + "/api/get_cardDetails_by_user?user_id="+userData.id)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    setCardList(data.success); // Set cardList to the 'success' property of the response
                } else {
                    console.error('Response does not contain success property');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleSubmit = () => {
        fetchData(); // Fetch data when the button is clicked
    };

    return (
        <div>
            <h2>Card List </h2>
            <Button variant="primary" className="w-100" onClick={handleSubmit}>
                Getdata
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Profession</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Website</th>
                        <th>Address</th>
                        <th>Logo</th>
                    </tr>
                </thead>
                <tbody>
                    {cardList.map((card, index) => (
                        <tr key={index}>
                            <td>{card.name}</td>
                            <td>{card.profession}</td>
                            <td>{card.email}</td>
                            <td>{card.phone_number}</td>
                            <td>{card.website}</td>
                            <td>{card.address}</td>
                            <td>
                                <img src={card.logo} alt="logo" style={{ width: "50px", height: "50px" }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CardDetailsList;
