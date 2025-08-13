import React, { useEffect } from 'react'
import { getNavData } from '../services/home.services';

const Home = () => {
    useEffect(() => {
        console.log('Home component mounted');
        fetchData();
    })
    const fetchData = async () => {
        try {
            const res = await getNavData();
            console.log(res)
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <div>Home</div>
    )
}

export default Home