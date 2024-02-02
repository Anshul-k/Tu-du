import React, { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar'
import styled from 'styled-components'
import '../styles.scss'
import ColorButton from '../Components/ColorButton'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import ListItem from '../Components/ListItem'
import AddNewCategory from "../Components/AddNewCategory"
import DeleteItem from '../Components/DeleteItem'
import { v4 as uuidv4 } from 'uuid';
uuidv4();

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const TodoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    margin: 2rem;
    gap: 1rem;
`

const TodoCard = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    background-color: var(--neutral-dark);
    transition: 0.3s;
    border-radius: 10px;
    width: 100%;
    text-align: left;

    &:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
`

const AddHeading = styled.p`
    font-size: 1.4rem;
    text-align: left;
    color: var(--primary-blue-dark);
    font-weight: 600;
    padding: 0rem 0rem 0rem 1rem;
`
const AddContentForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;

    @media screen and (max-width: 768px){
        flex-direction: column;
    }
`
const AddButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    @media screen and (max-width: 460px){
            width: 100% ;
        }

    .Add{
        @media screen and (max-width: 460px){
            width: 100% ;
        }
    }
`
const AddContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
`
const TextArea = styled.div`
    display: flex;
    width: 100%;

    .TextField{
        width: 100% ;
    }

    @media screen and (max-width: 768px){
        flex-direction: column;
    }
`
const TextAreaIcons = styled.div`
    display: flex;
    width: auto;
    gap: 1.5rem;
    margin-left:1rem;

    @media screen and (max-width: 768px){
        justify-content: start;
        margin-top: 1rem;
        margin-left: 0;
    }

    @media screen and (max-width: 420px){
        flex-direction: column ;
    }
`

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function SelectForm(props) {

    const { children, value, setfunction, styleValue, inputLabel, labelValue } = props;

    return (
        <FormControl >
            <InputLabel id="demo-simple-select-label">{labelValue}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label={inputLabel}
                autoWidth
                style={styleValue}
                value={value}
                onChange={(e) => setfunction(e.target.value)}
            >
                {children}
            </Select>
        </FormControl>
    );
}

function Todo() {

    const [categoryList, setCategoryList] = useState(() => {
        // Retrieve categoryList from localStorage on component mount
        const storedCategoryList = localStorage.getItem('categoryList');
        return storedCategoryList ? JSON.parse(storedCategoryList) : [
        {
            id: uuidv4(),
            category: "All"
        },
        {
            id: uuidv4(),
            category: "Personal"
        },
        {
            id: uuidv4(),
            category: "Work"
        },
        {
            id: uuidv4(),
            category: "School"
        },
        {
            id: uuidv4(),
            category: "Completed"
        },
    ];
})

    const [taskValue, setTaskValue] = useState("")
    const [descriptionValue, setDescriptionValue] = useState("")
    const [priorityValue, setPriorityValue] = useState("Low")
    const [categoryValue, setCategoryValue] = useState("")

    const [todos, setTodos] = useState(() => {
        // Retrieve todos from localStorage on component mount
        const storedTodos = localStorage.getItem('todos');
        return storedTodos ? JSON.parse(storedTodos) : [];
    });


    useEffect(() => {
        // Save categoryList to localStorage whenever it changes
        localStorage.setItem('categoryList', JSON.stringify(categoryList));
    }, [categoryList]);

    useEffect(() => {
        // Save todos to localStorage whenever it changes
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


    const [tabValue, setTabValue] = useState(0);

    const tabHandleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const todoSubmit = (e) => {
        e.preventDefault();

        const newTodo = {
            task: taskValue,
            description: descriptionValue,
            priority: priorityValue,
            category: categoryValue
        }

        setTodos([...todos, { id: uuidv4(), todo: newTodo, isComplete: false, isEditing: false }]);

        // Clear the input fields after submitting
        setTaskValue("");
        setDescriptionValue("");
        setPriorityValue("Low");
        setCategoryValue("");
    };

    const tabLabels = categoryList
        .sort((a, b) => {
            if (a.category === "Completed") return 1;  // Move "Completed" to the end
            if (b.category === "Completed") return -1; // Move "Completed" to the end
            return 0;
        })
        .map((category) => (
            <Tab key={category.id} label={category.category} {...a11yProps(category.id)} />
        ));

    const categoryMenuItems = categoryList
        .filter((category) => category.category !== "All" && category.category !== "Completed")
        .map((category) => (
            <MenuItem key={category.id} value={category.category}>
                {category.category}
            </MenuItem>
        ));


    const updatedCategoryList = [
        ...categoryList.filter((category) => category.category !== "Completed"),
        ...categoryList.filter((category) => category.category === "Completed"),
    ];

    const filteredCategoryTodos = todos.filter((todo) => {
        if (tabValue === 0) {
            // If "All" category is selected, show all todos
            return true;
        } else if (tabValue === updatedCategoryList.length - 1) {
            // If last category (which is "Completed") is selected, show only completed todos
            return todo.todo.category === "Completed" || todo.isComplete;;
        } else {
            // If any other category is selected, show todos with the selected category
            return todo.todo.category === updatedCategoryList[tabValue].category;
        }
    });

    const deleteTodo = id => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const completeTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo))
    };

    const editTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
    };

    const updateTask = (id, updatedTask, updatedDescription) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, todo: { task: updatedTask, description: updatedDescription } } : todo))
    }

    const updateCategories = (value) => {
        setCategoryList([...categoryList, {id: uuidv4(), category: value}]);
    }

    return (
        <Container>
            <Navbar />
            <TodoContainer>
                <TodoCard>
                    <AddHeading>Add New Task</AddHeading>
                    <AddContentForm onSubmit={todoSubmit}>
                        <AddContent>
                            <TextArea>
                                <TextField
                                    style={{ flexGrow: 1 }}
                                    label="Task"
                                    variant="standard"
                                    className="TextField"
                                    required
                                    value={taskValue}
                                    onChange={(e) => setTaskValue(e.target.value)}
                                    />
                                <TextAreaIcons>                                       
                                    <SelectForm
                                        value={priorityValue}
                                        setfunction={setPriorityValue}
                                        styleValue={{ minWidth: "6rem" }}
                                        inputLabel="Priority"
                                        labelValue="Priority"
                                    >
                                        <MenuItem value="High">High</MenuItem>
                                        <MenuItem value="Medium">Medium</MenuItem>
                                        <MenuItem value="Low">Low</MenuItem>
                                    </SelectForm>
                                    <SelectForm
                                        value={categoryValue}
                                        setfunction={setCategoryValue}
                                        styleValue={{ minWidth: "7rem" }}
                                        inputLabel="Category"
                                        labelValue="Category"
                                    >
                                        {categoryMenuItems}
                                    </SelectForm>
                                    <div style={{display: 'flex', justifyContent: 'center', padding: "0.5rem 0"}}>
                                        <AddNewCategory
                                            DialogHeading="Add New Category"
                                            updateCategories={updateCategories}
                                            existingCategories={categoryList}
                                        />
                                    </div>
                                </TextAreaIcons>
                            </TextArea>
                            <TextArea>
                                <TextField
                                    style={{ flexGrow: 1 }}
                                    label="Description"
                                    variant="outlined"
                                    value={descriptionValue}
                                    onChange={(e) => setDescriptionValue(e.target.value)}
                                />
                            </TextArea>
                        </AddContent>
                        <AddButton>
                            <ColorButton
                                name=" Add "
                                color="--tiara"
                                background="--primary-blue-dark"
                                backgroundHover="--primary-blue-extra-dark"
                                type="submit"
                                variant="contained"
                                className="Add"
                            />
                        </AddButton>
                    </AddContentForm>
                </TodoCard>
                <TodoCard>
                    <Tabs
                        variant="scrollable"
                        scrollButtons
                        allowScrollButtonsMobile
                        aria-label="scrollable force tabs example"
                        value={tabValue} onChange={tabHandleChange}
                    >
                        {tabLabels}
                    </Tabs>
                </TodoCard>
                {updatedCategoryList.map((category, index) => (
                    <CustomTabPanel key={category.id} style={{ width: "100%" }} value={tabValue} index={index}>
                        {filteredCategoryTodos.map((todo) => (
                            <React.Fragment key={todo.id}>
                                {tabValue === updatedCategoryList.length - 1 && (todo.isComplete || category.category === "Completed") ? (
                                    <DeleteItem
                                        addTodo={todo.todo}
                                        id={todo.id}
                                        deleteTodo={deleteTodo}
                                        completeTodo={completeTodo}
                                    />
                                ) : (
                                    // Show ListItem only when category is not "Completed" and isComplete is false
                                    !todo.isComplete && category.category !== "Completed" && (
                                        <ListItem
                                            addTodo={todo.todo}
                                            id={todo.id}
                                            isEditing={todo.isEditing}
                                            deleteTodo={deleteTodo}
                                            completeTodo={completeTodo}
                                            editTodo={editTodo}
                                            updateTask={updateTask}
                                        />
                                    )
                                )}
                            </React.Fragment>
                        ))}
                    </CustomTabPanel>
                ))}
            </TodoContainer>
        </Container >
    )
}

export default Todo