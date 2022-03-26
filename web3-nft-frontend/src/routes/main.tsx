import React, { useState } from 'react';
import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { mintAnimalTokenContract } from '../contracts';

interface MainProps {
 account: string;
}

const Main: React.FC<MainProps> = ({ account }) => {
 const [newAnimalCard, setNewAnimalCard] = useState<string>();
 const onClickMint = async () => {
  try {
   if (!account) return;

   const res = await mintAnimalTokenContract.methods.mintAnimalToken().send({ from: account });

   console.log(res);
  } catch (err) {
   console.error(err);
  }
 };
 return (
  <Flex w='full' h='100vh' justifyContent='center' alignItems='center' direction='column'>
   <Box>{newAnimalCard ? <div>AnimalCard</div> : <Text>Let's mint Animal Card!</Text>}</Box>
   <Button mt={4} size='sm' colorScheme='blue' onClick={onClickMint}>
    Mint
   </Button>
  </Flex>
 );
};

export default Main;
