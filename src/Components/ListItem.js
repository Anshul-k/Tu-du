import React, { useState } from 'react'
import styled from "styled-components"
import '../styles.scss'
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    gap: 1rem;
    width: 100%;
    margin-bottom: 0.5rem;
`

const ListCard = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    background-color: var(--neutral-dark);
    transition: 0.3s;
    border-radius: 10px;
    width: 100%;
    text-align: left;
    width: 100%;

    &:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`

const ListContent = styled.div`
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    border-left: 5px solid ${props => props.priority === "High" ? 'var(--high-priority)' : props.priority === "Medium" ? 'var(--medium-priority)' : 'var(--low-priority)'
    };
    gap: 0.3rem;
    width: 100%;
`
const Task = styled.div`
    font-size: 1.2rem;
    color: var(--primary-blue-extra-dark);
    font-weight: 600;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    width: 100%;

    .TextField{
        width: 85%;
    }
`

const Description = styled.div`
    font-size: 0.8rem;
    color: var(--regent-gray);
    font-weight: 500;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

    .TextField{
        width: 85%;
    }
`
const Category = styled.div`
    font-size: 0.7rem;
    color: var(--primary-purple-light);
`

const IconContainer = styled.div`
    display: flex;
`

const StyledCheckCircleIcon = styled(CheckCircleIcon)`
    && {
    color: var(--primary-blue-extra-dark);
    transition: color 0.2s;
    &:hover {
      color: var(--primary-green-dark);
    }
  }
`
const StyledEditIcon = styled(EditIcon)`
    && {
    color: var(--primary-blue-extra-dark);
    transition: color 0.2s;
    &:hover {
      color: var(--regent-gray);
    }
  }
`
const StyledDeleteIcon = styled(DeleteIcon)`
    && {
    color: var(--primary-blue-extra-dark);
    transition: color 0.2s;
    &:hover {
      color: var(--primary-red);
    }
  }
`

function ListItem({
    addTodo,
    id,
    isEditing,
    deleteTodo,
    completeTodo,
    editTodo,
    updateTask
}) {

    const category = addTodo?.category || '';

    const [editedTask, setEditedTask] = useState(addTodo?.task || '');
    const [editedDescription, setEditedDescription] = useState(addTodo?.description || '');

    const handleEditChange = () => {
        updateTask(id, editedTask, editedDescription)
        editTodo(id)
    }

    return (
        <ListContainer>
            <ListCard>
                {isEditing ?
                    <ListContent>
                        <TaskContainer priority={addTodo.priority}>
                            <Task>
                                <TextField
                                    style={{ flexGrow: 1 }}
                                    variant="standard"
                                    value={editedTask}
                                    onChange={(e) => setEditedTask(e.target.value)}
                                    className='TextField'
                                    sx={{
                                        mb: "0.5rem"
                                    }}
                                />
                            </Task>
                            <Description>
                                <Category>{category}</Category>
                                <TextField
                                    style={{ flexGrow: 1 }}
                                    variant="standard"
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    className='TextField'
                                    inputProps={{ style: { fontSize: "0.8rem" } }}
                                    sx={{
                                        mt: "0.5rem",
                                        "& .MuiInputBase-root": {
                                            height: "1.5rem"
                                        }
                                    }}
                                />
                            </Description>
                        </TaskContainer>
                        <IconContainer>
                            <IconButton aria-label="check" size="large">
                                <StyledCheckCircleIcon
                                    onClick={() => handleEditChange()}
                                />
                            </IconButton>
                        </IconContainer>
                    </ListContent>
                    :
                    <ListContent>
                        <TaskContainer priority={addTodo.priority}>
                            <Task>
                                {editedTask}
                            </Task>
                            <Description>
                                <Category>{category}</Category>
                                {editedDescription}
                            </Description>
                        </TaskContainer>
                        <IconContainer>
                            <IconButton aria-label="check" size="large">
                                <StyledCheckCircleIcon
                                    onClick={() => completeTodo(id)}
                                />
                            </IconButton>
                            <IconButton aria-label="edit" size="large">
                                <StyledEditIcon
                                    onClick={() => editTodo(id)}
                                />
                            </IconButton>
                            <IconButton aria-label="delete" size="large">
                                <StyledDeleteIcon
                                    onClick={() => deleteTodo(id)}
                                />
                            </IconButton>
                        </IconContainer>
                    </ListContent>
                }
            </ListCard>
        </ListContainer>
    )
}

export default ListItem