import React from "react";
import Canvas from "../Canvas/Canvas";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './MainBlock.css';
import DataTable from "../DataTable/DataTable";
import { setX, setY, setR, setErrorY } from '../../redux/action';
import { fetchAddAttempts , fetchDeleteAttempts} from '../../redux/action';
import { connect }  from 'react-redux';

const Graph = ({currentEnteredX,
    currentEnteredY,
    currentEnteredR,
    addAttempt,
    deleteAttempts,
    setX,
    setY,
    setR,
    errorMessage,
    setErrorY,
    errorY
    }) => {

    const handleSubmit = () => {
        if (!errorY) {
            addAttempt({x: currentEnteredX, y: currentEnteredY, r: currentEnteredR});
        } else {
            alert("Incorrect Y value: -3 <= Y <= 3");
        }
    };

    const handleYTextField = (event) => {
        if (event.target.value >= -3 && event.target.value <= 3) {
            setErrorY(false);
            setY(event.target.value);
        } else {
            setErrorY(true);
        }
    }

    const handleDelete = () => {
        deleteAttempts();
    }

    const handleXSelect = (event) => {
        setX(event.target.value)
    }

    const handleRSlider = (event) => {
        setR(event.target.value)
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <div>
            <div id="graph-style">
                <Canvas/>
            </div>
            <div>
                <form id="form">
                    <div id="form-style">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">X</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="X"
                            defaultValue={currentEnteredX}
                            onChange={handleXSelect}
                        >
                            <MenuItem value={-5}>-5</MenuItem>
                            <MenuItem value={-4}>-4</MenuItem>
                            <MenuItem value={-3}>-3</MenuItem>
                            <MenuItem value={-2}>-2</MenuItem>
                            <MenuItem value={-1}>-1</MenuItem>
                            <MenuItem value={0}>0</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                        </Select>
                    </FormControl>
                    </div>
                    <div id="form-style">
                    <TextField 
                        id="standard-basic" 
                        label="Y from -3 to 3" 
                        variant="standard"
                        onChange={handleYTextField}
                        inputProps={{ maxLength: 4 }}
                        />
                    </div>
                    <div id="form-style">
                    <Typography id="input-slider" gutterBottom>
                        Radius
                    </Typography>
                    <Slider
                        key={`slider-${currentEnteredR}`}    
                        aria-label="Temperature"
                        defaultValue={currentEnteredR}
                        onChange={handleRSlider}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={10}
                        />
                    </div>
                    <div id="form-style">
                    <Button variant="contained" style={{width: "50%", padding: "5%"}} onClick={handleSubmit}>Shoot</Button>
                    <Button variant="contained" style={{width: "50%", padding: "5%"}} onClick={handleDelete}>Delete All</Button>
                    </div>
                </form>
            </div>
            <div>
                <p style={{padding: "10%"}}>
                    {errorMessage}
                </p>
            </div>
            <div style={{ padding: "5%"}}>
            <DataTable/>
            </div>
            <div style={{padding: "5%"}}>
            <Button id="Submit" variant="contained" style={{width:"20%"}} onClick={handleLogout}>Log out</Button>
            </div>
        </div>
    )
}

function mapDispatchToButtonsProps(dispatch) {
    return {
        addAttempt: (attempt) => dispatch(fetchAddAttempts(attempt)),
        setX: (x) => dispatch(setX(x)),
        setY: (y) => dispatch(setY(y)),
        setR: (r) => dispatch(setR(r)),
        setErrorY: (errorY) => dispatch(setErrorY(errorY)),
        deleteAttempts: () => dispatch(fetchDeleteAttempts())
    }
}

function mapButtonStateToFormProps(state) {
    return {
        currentEnteredX: state.x,
        currentEnteredY: state.y,
        currentEnteredR: state.r,
        errorY: state.errorY,
        errorMessage: state.errorMessage
    }
}

export default connect(mapButtonStateToFormProps, mapDispatchToButtonsProps)(Graph);