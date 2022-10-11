import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import dayjs, {Dayjs} from 'dayjs';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceIcon from '@mui/icons-material/Place';

interface IList
{
    name?: string,
    id?: string,
    bookDate: Dayjs,
    bookTime: string,
    place: string,
    space: string,
}

export default function InteractiveList( props: IList ) {

    const { name, id, bookDate, bookTime, place, space } = props;
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
        <Grid item xs={10} md={6} >
            <List dense={true}>
                <ListItem>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={name}
                    secondary={id}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccessTimeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={bookDate && bookDate.format('YYYY-MM-DD')}
                    secondary={bookTime}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PlaceIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={space}
                    secondary={place}
                  />
                </ListItem>
            </List>
        </Grid>
    </Box>
  );
}
