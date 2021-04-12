import React, { KeyboardEvent, ChangeEvent, useState, useEffect } from 'react';
// import TodoTask from './Components/TodoTask';
import { TaskTitleInput } from '../Components/TaskInput';
import { TaskType } from '../TaskType';
import Collapse from '@material-ui/core/Collapse';
import ButtonAppBar from '../Components/AppBar';
import Buttons from '../Components/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CheckboxList from '../Components/CheckboxList';

let count = 4;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
      height: '100vh',
    },
    paper: {
      textAlign: 'center',
      border: 0,
      borderRadius: 3,
      background: 'rgba(256,256,256,0.1)',
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
      color: 'white',
      marginTop: '60px',
      padding: theme.spacing(1),
      margin: 'auto',
      minWidth: '100%'
    },

  }),
);

const Master = () => {

  const classes = useStyles();


  const [task, setTask] = useState<any>("");
  const [description, setDescription] = useState<string>("");
  const [todoList, setTodoList] = useState<TaskType[]>([]);
  const [open, setOpen] = useState(true);


  useEffect(() => {
    // chiamata per mostrare delle attività di default al caricamento della pagina
    fetch(`https://jsonbox.io/box_bea332effb012fcbc681`)
      .then(response => response.json())
      .then(json => setTodoList(json[0].data))
  }, [])

  // catturo l'input per il titolo attività e pe la sua descrizione
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === "task") {
      setTask(event.target.value)
    } else {
      setDescription(event.target.value)
    }
  };

  // mostra/nascondo input per inserire una nuova attività
  const handleClick = () => {
    setOpen(!open);
  };


  // salvo la nuova attività al click
  const addTask = () => {
    if (task === "" || task === " ") {
      const newItem = { id: count++, taskName: 'Senza Titolo', descriptionInfo: description }
      setTodoList([newItem, ...todoList])
    } else {
      const newItem = { id: count++, taskName: task, descriptionInfo: description }
      setTodoList([newItem, ...todoList])
    }
    setTask("")
    setDescription("")
  }

  // salvo la nuova attività quando l'utente preme Enter
  const addTaskEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      addTask()
    }
  }

  // elimino un'attività intercettando il suo id
  const deleteTask = (id: TaskType['id']): void => {
    setTodoList(todoList.filter(item => {
      return item.id !== id
    }))
  }

  // elimino tutte le attività 
  // (controllo quale attività è presente nell'array delle checkbox)
  const deleteCompleteTasks = (arr: any): void => {
    setTodoList(todoList.filter(item => {
      return !arr.includes(item.id)
    }))
  }

  return (
    <Box className={classes.root}>
      {/* navbar */}
      <ButtonAppBar showInputTask={handleClick} open={open} />

      {/* contenuto box principale */}
      <Paper className={classes.paper}>
        <Grid
          container
          direction="row"
          justify="center"
        >
          <Grid item xs={12} md={8} container direction="column">
            <Collapse in={!open} timeout="auto" unmountOnExit>
              {/* input titolo */}
              <TaskTitleInput type="text"
                placeholder="Task title"
                name="task"
                handleChange={handleChange}
                addTaskEnter={addTaskEnter}
                value={task} />

              {/* input descrizione */}
              <TaskTitleInput type="text"
                placeholder="Task description"
                name="description"
                handleChange={handleChange}
                addTaskEnter={addTaskEnter}
                value={description} />

              {/* aggiungi nuova attività */}
              <Buttons text="Aggiungi attivita" action={addTask} />
            </Collapse>


            {/* lista attività */}
            <CheckboxList
              todoList={todoList}
              deleteTask={deleteTask}
              deleteCompleteTasks={deleteCompleteTasks}
            />
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default Master;
