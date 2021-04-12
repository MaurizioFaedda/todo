import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            margin: theme.spacing(1),
            color: '#fff',
            border: '3px solid #fff',
            width: '90%'
        },
    }),
);

type Props = {
    action(parameter: any): void;
    parameter?: any;
    text: string;
};

export default function Buttons({ action, parameter, text }: Props) {
    const classes = useStyles();

    return (
        <div>
            <Button
                variant="outlined"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={() => { action(parameter) }}
            >
                {text}
            </Button>
        </div>
    );
}
