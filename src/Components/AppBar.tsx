import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'fixed',
            zIndex: 2,
            top: 0,
            left: 0,
            right: 0,
            margin: '0 auto',
            '& .MuiAppBar-colorPrimary': {
                backgroundColor: 'rgba(256,256,256, 0.8)',
                color: '#5fb5fe'
            }
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

type Props = {
    showInputTask(): void;
    open: any;
}

export default function ButtonAppBar({ showInputTask, open }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h4"
                        className={classes.title}
                    >
                        TODO
                    </Typography>
                    <IconButton
                        onClick={() => { showInputTask() }} >
                        {open ? <AddIcon /> : <RemoveIcon />}

                        <Typography
                            variant="h6"
                            className={classes.title}
                        >
                            Nuova Attività
                    </Typography>

                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
