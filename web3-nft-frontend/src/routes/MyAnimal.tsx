import { Flex, Button, Grid, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AnimalCard from '../components/AnimalCard';
import MyAnimalCard, { IMyAnimalCard } from '../components/MyAnimalCard';
import { mintAnimalTokenContract, saleAnimalTokenContract } from '../contracts';

interface MyAnimalProps {
 account: string;
}

const MyAnimal: React.FC<MyAnimalProps> = ({ account }) => {
 const [animalCardArray, setAnimalCardArray] = useState<IMyAnimalCard[]>();
 const [saleStatus, setSaleStatus] = useState<boolean>(false);
 console.log(account);
 const getAnimalTokens = async () => {
  try {
   const balanceLength = await mintAnimalTokenContract.methods.balanceOf(account).call();

   if (balanceLength === '0') return;

   const tempAnimalCardArray: IMyAnimalCard[] = [];

   const res: IMyAnimalCard[] = await mintAnimalTokenContract.methods.getAnimalTokens(account).call();

   res.map(({ animalPrice, animalTokenId, animalType }) => {
    tempAnimalCardArray.push({
     animalPrice,
     animalTokenId,
     animalType,
    });
   });

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
    {animalCardArray &&
     animalCardArray.map((animal, i) => (
      <MyAnimalCard
       key={i}
       animalTokenId={animal.animalTokenId}
       animalType={animal.animalType}
       animalPrice={animal.animalPrice}
       saleStatus={saleStatus}
       account={account}
      />
     ))}
   </Grid>
  </>
 );
};

export default MyAnimal;
