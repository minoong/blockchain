import { Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AnimalCard from '../components/AnimalCard';
import { mintAnimalTokenContract } from '../contracts';

interface MyAnimalProps {
 account: string;
}

const MyAnimal: React.FC<MyAnimalProps> = ({ account }) => {
 const [animalCardArray, setAnimalCardArray] = useState<string[]>();
 const getAnimalTokens = async () => {
  try {
   const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();
   const tempAnimalCardArray = [];

   for (let i = 0, len = parseInt(balanceLength, 10); i < len; i++) {
    const animalTokenId = await mintAnimalTokenContract.methods.tokenOfOwnerByIndex(account, i).call();
    const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();

    tempAnimalCardArray.push(animalType);
   }

   setAnimalCardArray(tempAnimalCardArray);
  } catch (err) {
   console.error(err);
  }
 };

 useEffect(() => {
  if (!account) return;
  getAnimalTokens();
 }, [account]);

 return (
  <Grid templateColumns='repeat(4, 1fr)' gap={8}>
   {animalCardArray && animalCardArray.map((animal, i) => <AnimalCard key={i} animalType={animal} />)}
  </Grid>
 );
};

export default MyAnimal;
