import React, { useState, useEffect } from 'react';
import "./Rui.css";

import io from "socket.io-client";
import Logo from './Khaan_Paan.png'

const newSocket = io.connect('https://foodiefriends.azurewebsites.net:443', {
    pingInterval: 10000,  // send a ping message every 10 seconds
    pingTimeout: 5000,    // wait for a pong message for up to 5 seconds
});

function Receiver() {
    var flag = false
    const [donations, setDonations] = useState([]);

    const DonationList = async () => {

        const temp = await fetch(`https://foodiefriends.azurewebsites.net/get_list`).then(res => res.json());
        setDonations(temp.results);
    }
    useEffect(() => {
        newSocket.on('donation', donation => {
            setDonations(() => donation);
        });
    }, []);
    if (flag === false) {
        DonationList()
        flag = true
    }

    return (
        <>
            <div className="menu">
                <div> <img src={Logo} alt="logo" className="img" /> </div>
                <div className="mbutt"><h2>Home</h2></div>
                <div className="mbutt"><h2>LogIn</h2></div>
                <div className="mbutt"><h2>SignUp</h2></div>
            </div>

            <div className="test">
                {donations.map((donation, index) => (
                    <div className="subl">
                        <ul className="mlist" type="none">
                            <li className="lits">
                                <div>
                                    <ul className="list" type="none">
                                        <li><h4>Name: {donation.Name} </h4></li>
                                        <li><h4>Contact No.: {donation.Phone} </h4></li>
                                        <li><h4>Pickup Location: {donation.Location} </h4></li>
                                        <li><h4>No. of Servings:{donation.servings} </h4></li>
                                        <li><h4>Type: {donation.Category1} </h4></li>
                                        <li><h4>Condition: {donation.Category2}</h4></li>
                                    </ul>
                                </div>
                            </li>

                            <li className="litt">
                                <div className="butt">
                                    <ul type="none">
                                        <li><button type="button" className="button"><h3>Accept</h3></button></li>
                                        <li><button type="button" className="button"><h3>Reject</h3></button></li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>

        </>
    );
}
export default Receiver;
