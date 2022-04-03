import React, { useState } from 'react';
import { Box, Text, Flex, Button } from '@chakra-ui/react';
import { mintAnimalTokenContract } from '../contracts';
import AnimalCard from '../components/AnimalCard';

interface MainProps {
 account: string;
}

const Main: React.FC<MainProps> = ({ account }) => {
 const [newAnimalType, setNewAnimalType] = useState<string>();
 const onClickMint = async () => {
  try {
   if (!account) return;

   const res = await mintAnimalTokenContract.methods.mintAnimalToken().send({ from: account });

   if (res.status) {
    const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();
    const animalTokenId = await mintAnimalTokenContract.methods.tokenOfOwnerByIndex(account, parseInt(balanceLength, 10) - 1).call();
    const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();
    console.log(animalType, animalTokenId);
    setNewAnimalType(animalType);
   }
  } catch (err) {
   console.error(err);
  }
 };
 return (
  <Flex w='full' h='100vh' justifyContent='center' alignItems='center' direction='column'>
   <Box>{newAnimalType ? <AnimalCard animalType={newAnimalType} /> : <Text>Let's mint Animal Card!</Text>}</Box>
   <Button mt={4} size='sm' colorScheme='blue' onClick={onClickMint}>
    Mint
   </Button>
  </Flex>
 );
};

export default Main;
