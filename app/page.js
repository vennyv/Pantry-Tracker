"use client";
import {collection, getDocs, doc, setDoc, query } from 'firebase/firestore';
import {Typography, Box, Stack, Button, Modal, TextField} from '@mui/material'
import {firestore} from '../firebase'
import React, { useEffect, useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper', 
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3
};

export default function Home() {
  const [pantry, setPantry] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState('')

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'))
    const docs = await getDocs(snapshot)
    const pantryList = []
    docs.forEach((doc) => {
      pantryList.push(doc.id)
    })
    console.log(pantryList)
    setPantry(pantryList)
  }

  useEffect(() => {
    
    updatePantry()
  }, [])

  const addItem = async(item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    await setDoc(docRef, {})
    updatePantry()
  }

  const removeItem = async(item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    // await setDoc(docRef, {})
    updatePantry()
  }

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx = {style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width={"100%"}  direction={'row'} spacing={2}>
              <TextField 
                id="outlined-basic" 
                label="Outlined" 
                variant="outlined" 
                fullWidth 
                value={itemName} 
                onChange={(e) => setItemName(e.target.value)} 
              />
              <Button 
                variant="outlined" 
                onClick={() => {
                addItem(itemName)
                setItemName('')
                handleClose()}}
              >
                ADD
              </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        ADD
      </Button>
      <Box border ={'1px solide #333'}>
      </Box>

      <Box width = "800px" height="100px" bgcolor="#ADD8E6" display={'flex'} justifyContent={'center'} alignItems={'center'} border = {'1px solid #333'}>
        <Typography variant="h3" color="white" textAlign="center" fontWeight="bold">
          Pantry Items
        </Typography>
      </Box>
      <Stack width = "800px" spacing={2} overflow={'auto'}  >
        {pantry.map((item, i) => (
          <Stack 
            key={i}
            direction={'row'}
            spacing={2}
            justifyContent={'center'}
            alignItems={'space-between'}
          
          >
            < Box
              key={i}
              width="100%"
              minHeight="150px"
              bgcolor="primary.main"
              display="flex"
              justifyContent="center"
              alignItems="center" 
            >
                <Typography variant="h3" color="white" textAlign="center">
                  {
                    // Capitalize the first letter of the item
                    item.charAt(0).toUpperCase() + item.slice(1)
                  }
                </Typography>
            </Box>
            <Button variant="contained" onClick={() => removeItem(item)}>
              Remove
            </Button>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}