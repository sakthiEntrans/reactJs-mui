import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AuditAreaInput from './AuditAreaInput';
import { Button, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

function Container() {
  const [auditAreas, setAuditAreas] = useState([{ id: 0, component: <AuditAreaInput key={0} /> }]);

  const addAuditArea = () => {
    const newId = auditAreas.length;
    setAuditAreas([...auditAreas, { id: newId, component: <AuditAreaInput key={newId} /> }]);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(auditAreas);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAuditAreas(items);
  };

  return (
    
    <ThemeProvider theme={darkTheme}>
      
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="background.default"
        p={2}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          width="100%"
          maxWidth="400px"
          border={1}
          borderColor="primary.main"
          p={2}
          borderRadius="20px"
          gap={2}
          bgcolor="background.paper"
        >
           <h2>Compli*Sun</h2>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  gap={2}
                >
                  {auditAreas.map((auditArea, index) => (
                    <Draggable key={auditArea.id} draggableId={auditArea.id.toString()} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          width="100%"
                          bgcolor="background.default"
                          border="1px solid"
                          borderColor="primary.main"
                          borderRadius="8px"
                          p={1}
                        >
                          {auditArea.component}
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />} 
            onClick={addAuditArea}
            sx={{ mt: 2 }}
            fullWidth
          >
            Add Audit Area
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Container;
