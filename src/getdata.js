import { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Stack, Typography } from '@mui/material';

export default function GetAllData() {
    let data = useData();

    if (!data) {
        return <>Loading...</>;
    }

    data.forEach(element => {
        return new Menu(element)
    });

    let card = MakeCard(data);

    return <>{card}</>;
}

class Menu {
    constructor(data) {
        this.price = data.id;
        this.calorie = data.calorie;
        this.salt = data.salt;
        this.name = data.name;
        this.img = null;
    }
}

function useData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8080');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return loading ? null : data;
}

/**
 * 
 * @param {Menu[]} menu 
 */
function MakeCard(menu) {
    let cards = [];

    menu.forEach(data => {
        cards.push(
            <Card>
                <Stack direction="row" alignItems="center" spacing={3} p={2} useFlexGap></Stack>
                <Typography>{data.name}</Typography>
            </Card>
        )
    });

    return cards;
}