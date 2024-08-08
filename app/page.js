"use client";
import { collection, getDocs, doc, setDoc, query, deleteDoc, getDoc } from 'firebase/firestore';
import { Typography, Box, Stack, Button, Modal, TextField } from '@mui/material';
import { firestore } from '../firebase';
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
  gap: 3,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemName, setItemName] = useState('');

  const updatePantry = async () => {
    const snapshot = await getDocs(collection(firestore, 'pantry'));
    const pantryList = snapshot.docs.map(doc => ({ name: doc.id, count: doc.data().count }));
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(firestore, 'pantry', item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      await setDoc(docRef, { count: data.count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(firestore, 'pantry', item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.count > 1) {
        await setDoc(docRef, { count: data.count - 1 });
      } else {
        await deleteDoc(docRef);
      }
      await updatePantry();
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Item
          </Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Item Name"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}
            >
              ADD
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button variant="contained" onClick={handleOpen}>
        ADD
      </Button>
      <Box border="1px solid #333" width="800px" padding={2} mt={2}>
        <Box
          width="100%"
          height="100px"
          bgcolor="#ADD8E6"
          display="flex"
          justifyContent="center"
          alignItems="center"
          border="1px solid #333"
        >
          <Typography variant="h3" color="white" textAlign="center" fontWeight="bold">
            Pantry Items
          </Typography>
        </Box>
        <Stack width="100%" spacing={2} mt={2}>
          {pantry.map((item, index) => (
            <Box
              key={index}
              width="100%"
              minHeight="150px"
              bgcolor="primary.main"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              paddingX={5}
              border="1px solid #333"
            >
              <Typography variant="h5" color="white" textAlign="center">
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Typography>
              <Typography variant="h5" color="white" textAlign="center">
                Quantity: {item.count}
              </Typography>
              <Button variant="contained" onClick={() => removeItem(item.name)}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
