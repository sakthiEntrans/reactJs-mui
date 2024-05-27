import React, { useState } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box,
  IconButton,
  Typography,
  Drawer,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CssBaseline,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Assignment as ObjectiveIcon,
  Update as FrequencyIcon,
  Person as AssignedToIcon,
  CalendarToday as StartDateIcon,
  Event as EndDateIcon,
  AssignmentTurnedIn as StatusIcon,
  Comment as CommentsIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

const SmallTextField = styled(TextField)({
  width: '300px',
  '& .MuiInputBase-root': {
    fontSize: '14px',
  },
  '& .MuiInputLabel-root': {
    fontSize: '14px',
  },
});

const DrawerTextField = styled(TextField)({
  width: '100%',
  marginBottom: '16px',
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
  },
});

function AuditAreaInput() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [formValues, setFormValues] = useState({
    objective: '',
    frequency: '',
    assignedTo: '',
    startDate: '',
    endDate: '',
    status: '',
    comments: '',
  });

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleDrawerClick = (event) => {
    event.stopPropagation();
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box display="flex" flexDirection="row" alignItems="center">
          <SmallTextField
            label="Audit Area"
            placeholder="Enter the Audit area"
            variant="outlined"
            value={inputValue}
            onChange={handleChange}
          />
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{ ml: 2 }}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
        </Box>
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{
              width: '500px',
              p: 3,
              backgroundColor: 'background.paper',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
            role="presentation"
            onClick={handleDrawerClick}
          >
            <Typography variant="h6" gutterBottom>
              Audit Area: {inputValue}
            </Typography>
            <Box display="flex" alignItems="center">
              <ObjectiveIcon sx={{ mr: 2 }} />
              <DrawerTextField
                label="Objective"
                name="objective"
                variant="outlined"
                value={formValues.objective}
                onChange={handleFormChange}
              />
            </Box>
            <Box display="flex" alignItems="center">
              <FrequencyIcon sx={{ mr: 2 }} />
              <FormControl variant="outlined" sx={{ width: '100%' }}>
                <InputLabel>Frequency</InputLabel>
                <Select
                  name="frequency"
                  value={formValues.frequency}
                  onChange={handleFormChange}
                  label="Frequency"
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="Daily">Daily</MenuItem>
                  <MenuItem value="Weekly">Weekly</MenuItem>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" alignItems="center">
              <AssignedToIcon sx={{ mr: 2 }} />
              <FormControl variant="outlined" sx={{ width: '100%' }}>
                <InputLabel>Assigned To</InputLabel>
                <Select
                  name="assignedTo"
                  value={formValues.assignedTo}
                  onChange={handleFormChange}
                  label="Assigned To"
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="John Doe">John Doe</MenuItem>
                  <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                  <MenuItem value="Mike Johnson">Mike Johnson</MenuItem>
                  <MenuItem value="Emily Davis">Emily Davis</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" alignItems="center">
              <StartDateIcon sx={{ mr: 2 }} />
              <DrawerTextField
                label="Start Date"
                name="startDate"
                type="date"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.startDate}
                onChange={handleFormChange}
              />
            </Box>
            <Box display="flex" alignItems="center">
              <EndDateIcon sx={{ mr: 2 }} />
              <DrawerTextField
                label="End Date"
                name="endDate"
                type="date"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formValues.endDate}
                onChange={handleFormChange}
              />
            </Box>
            <Box display="flex" alignItems="center">
              <StatusIcon sx={{ mr: 2 }} />
              <FormControl variant="outlined" sx={{ width: '100%' }}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formValues.status}
                  onChange={handleFormChange}
                  label="Status"
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="Not Started">Not Started</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display="flex" alignItems="center">
              <CommentsIcon sx={{ mr: 2 }} />
              <DrawerTextField
                label="Comments"
                name="comments"
                variant="outlined"
                multiline
                rows={4}
                value={formValues.comments}
                onChange={handleFormChange}
              />
            </Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              sx={{ mt: 2 }}
              onClick={() => { 
                setDrawerOpen(false);
                handleClick(); 
              }}
            >
              Save
            </Button>
          </Box>
        </Drawer>
        <Snackbar 
          open={open} 
          autoHideDuration={6000} 
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Saved Successfully!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default AuditAreaInput;
