import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// salvo il colore desiderato per poterlo reciclare e cambiarlo facilmente
const colorLight = '#fff';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '90%',
                backgroundColor: 'rgba(256, 256, 256, 0.4)',
                borderRadius: '4px'
            },
            '& label.Mui-focused': {
                color: colorLight,
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: colorLight,
            },
            '& .MuiFormLabel-root': {
                color: colorLight
            },
            '& .MuiOutlinedInput-root': {
                color: colorLight,
                '& fieldset': {
                    color: colorLight,
                    borderColor: colorLight,
                },
                '&:hover fieldset': {
                    borderColor: 'rgba(256,256,256,0.8)',
                    backgroundColor: 'rgba(256,256,256,0.1)'
                },
                '&.Mui-focused fieldset': {
                    borderColor: colorLight,
                    color: colorLight
                },
            },
        },
    }),
);


type Props = {
    type: string;
    placeholder: string;
    name: string;
    handleChange: any;
    addTaskEnter: any;
    value: string;
}

export const TaskTitleInput = ({ type, placeholder, name, handleChange, addTaskEnter, value }: Props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <TextField
                className="outlined-basic" label={placeholder} variant="outlined"
                type={type}
                name={name}
                onChange={handleChange}
                onKeyPress={addTaskEnter}
                value={value}
            />

        </div>
    )
}