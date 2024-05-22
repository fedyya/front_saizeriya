import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardMedia, Container, Dialog, DialogContent, DialogTitle, Grid, Stack, Typography } from '@mui/material';

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
        this.img = data.image;
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

const MenuItem = ({ image, name, price, calories, salt, allergies }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card sx={{ maxWidth: 345, margin: 1 }} onClick={handleClickOpen}>
                <CardMedia
                    component="img"
                    height="140"
                    src={"data:image/png;base64," + image}
                    alt={name}
                />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {name}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end" flexDirection="column" alignItems="flex-end">
                        <Typography variant="body2" color="text.secondary">
                            {`Price: ${price}円`}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {`Calories: ${calories} kcal`}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogContent>
                    <Box display="flex">
                        <CardMedia
                            component="img"
                            src={"data:image/png;base64," + image}
                            alt={name}
                            sx={{ width: '55%', marginRight: 9 }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5">{name}</Typography>
                            <Typography variant="body3" color="text.secondary">
                                {`Calories: ${calories} kcal`}
                            </Typography>
                            <Typography variant="body3" color="text.secondary">
                                {`食塩相当量: ${salt} g`}
                            </Typography>
                            <Typography variant="body3" color="text.secondary">
                                {`アレルギー: ${allergies}`}
                            </Typography>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

/**
 * 
 * @param {Menu[]} menu 
 */
function MakeCard(menu) {
    return (
        <Container>
            <Grid container spacing={2}>
                {menu.map((item, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <MenuItem
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            calories={item.calorie}
                            salt={item.salt}
                            allergies={item.allergies}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}