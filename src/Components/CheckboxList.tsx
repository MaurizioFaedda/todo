import React, { useState } from 'react';
import Buttons from './Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { TaskType } from '../TaskType';
import InfoIcon from '@material-ui/icons/Info';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            '& .MuiCheckbox-colorSecondary.Mui-checked': {
                color: '#fff'
            },
            '& .myListBox': {
                borderBottom: '1px solid #fff'
            }
        },
    }),
);

type Props = {
    todoList: any
    deleteTask(id: number): void;
    deleteCompleteTasks(arr: any): void;
};

export default function CheckboxList({ todoList, deleteTask, deleteCompleteTasks }: Props) {
    const classes = useStyles();
    const [checked, setChecked] = useState([0]);
    const [show, setShow] = useState([0]);

    // function per mostrare/nascondere descrizione 
    const showClick = (value: number) => () => {
        const currentIndex = show.indexOf(value);
        const newShowed = [...show];

        if (currentIndex === -1) {
            newShowed.push(value);
        } else {
            newShowed.splice(currentIndex, 1);
        }
        setShow(newShowed);
    };

    // function per salvare item correnti in checked 
    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    return (
        <List className={classes.root}>
            <Box >
                <Buttons
                    text="Elimina attività svolte"
                    action={deleteCompleteTasks}
                    parameter={checked}
                />
            </Box>

            {todoList.map((task: TaskType, key: any) => {
                const labelId = `checkbox-list-label-${task.id}`;

                return (
                    <div key={task.id} className="myListBox">
                        <ListItem
                            role={undefined}
                            dense button
                        >
                            <ListItemIcon
                                onClick={handleToggle(task.id)}
                            >
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(task.id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>

                            <Typography
                                onClick={showClick(task.id)}
                                id={labelId}
                                variant="h5"
                                // risolto bug parola unica che sborda
                                // width 100 per poter cliccare e aprire le info
                                style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', width: '100%' }}
                            >
                                {show.indexOf(task.id) !== -1 ? <ExpandLess /> : <ExpandMore />}
                                {task.taskName}
                            </Typography>
                            <ListItemSecondaryAction>
                                <IconButton
                                    onClick={() => { deleteTask(task.id) }}
                                    edge="end"
                                    aria-label="delete"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        {/* mostro la descrizione solo se verifica la condizione */}
                        <Collapse in={show.indexOf(task.id) !== -1} timeout="auto" unmountOnExit>
                            <List
                                component="div"
                                disablePadding>
                                <ListItem>
                                    <ListItemIcon>
                                        <InfoIcon />
                                    </ListItemIcon>
                                    <Typography variant="subtitle1"
                                        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                                    >
                                        {task.descriptionInfo}
                                    </Typography>
                                </ListItem>
                            </List>
                        </Collapse>
                    </div>
                );
            })}
        </List>
    );
}