import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';





const UserDetailsProvider = createContext(null);


const DataProvider = () => {


    const [userInfo, setUserInfo] = useState({
        username: '',
        userrole: '',
        email: ''
    });


    return (

        <div>
            <UserDetailsProvider.Provider
                value={{
                    userInfo,
                    setUserInfo
                }}>

            </UserDetailsProvider.Provider>
        </div>
    )
}

export default DataProvider;
