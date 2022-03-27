import { Flex, Button, Grid, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AnimalCard from '../components/AnimalCard';
import { mintAnimalTokenContract } from '../contracts';

interface MyAnimalProps {
 account: string;
}

const MyAnimal: React.FC<MyAnimalProps> = ({ account }) => {
 const [animalCardArray, setAnimalCardArray] = useState<string[]>();
 const [saleStatus, setSaleStatus] = useState<boolean>(false);
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

 const getIsApprovedForAll = async () => {
  try {
   const res = await mintAnimalTokenContract.methods.isApprovedForAll(account, process.env.REACT_APP_SALE_ANIMAL).call();

   if (res) {
    setSaleStatus(res);
   }
  } catch (err) {
   console.error(err);
  }
 };

 const onClickApproveToggle = async () => {
  try {
   if (!account) return;

   const res = await mintAnimalTokenContract.methods.setApprovalForAll(process.env.REACT_APP_SALE_ANIMAL, !saleStatus).send({ from: account });
   if (res.status) {
    setSaleStatus(!saleStatus);
   }
  } catch (err) {
   console.error(err);
  }
 };

 useEffect(() => {
  if (!account) return;
  getIsApprovedForAll();
  getAnimalTokens();
 }, [account]);

 return (
  <>
   <Flex alignItems='center'>
    <Text display='inline-block'>Sale Status : {saleStatus ? 'True' : 'False'}</Text>
    <Button size='xs' ml={2} colorScheme={saleStatus ? 'red' : 'blue'} onClick={onClickApproveToggle}>
     {saleStatus ? 'Cancel' : 'Approve'}
    </Button>
   </Flex>
   <Grid templateColumns='repeat(4, 1fr)' gap={8} mt={4}>
    {animalCardArray && animalCardArray.map((animal, i) => <AnimalCard key={i} animalType={animal} />)}
   </Grid>
  </>
 );
};

export default MyAnimal;
