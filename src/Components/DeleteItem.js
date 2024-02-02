import React from 'react'
import styled from "styled-components"
import '../styles.scss'
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const DeleteContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    gap: 1rem;
    width: 100%;
    margin-bottom: 0.5rem;
`

const DeleteCard = styled.div`
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

const DeleteContent = styled.div`
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 460px){
        flex-direction: column;
    }
`
const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    border-left: 5px solid ${props => props.priority === "High" ? 'var(--high-priority)' : props.priority === "Medium" ? 'var(--medium-priority)' : 'var(--low-priority)'
    };
    gap: 0.3rem;
    width: 100% ;
`
const Task = styled.div`
    font-size: 1.2rem;
    color: var(--primary-blue-extra-dark);
    font-weight: 600;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    text-decoration: line-through;
`

const Description = styled.div`
    font-size: 0.8rem;
    color: var(--regent-gray);
    font-weight: 500;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    text-decoration: line-through;
`
const Category = styled.div`
    font-size: 0.7rem;
    color: var(--primary-purple-light);
`

const IconContainer = styled.div`
    display: flex;
`

const StyledRestoreIcon = styled(RestoreIcon)`
    && {
    color: var(--primary-blue-extra-dark);
    transition: color 0.2s;
    &:hover {
      color: var(--primary-green-dark);
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

function DeleteItem({ addTodo, id, deleteTodo, completeTodo }) {

    const task = addTodo?.task || '';
    const category = addTodo?.category || '';
    const description = addTodo?.description || '';

    return (
        <DeleteContainer>
            <DeleteCard>
                <DeleteContent>
                    <TaskContainer priority={addTodo.priority}>
                        <Task>
                            {task}
                        </Task>
                        <Description>
                            <Category>{category}</Category>
                            {description}
                        </Description>
                    </TaskContainer>
                    <IconContainer>
                        <IconButton aria-label="edit" size="large" onClick={() => completeTodo(id)}>
                            <StyledRestoreIcon/>
                        </IconButton>
                        <IconButton aria-label="delete" size="large" onClick={() => deleteTodo(id)}>
                            <StyledDeleteIcon/>
                        </IconButton>
                    </IconContainer>
                </DeleteContent>
            </DeleteCard>
        </DeleteContainer>
    )
}

export default DeleteItem