import { Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { IMyAnimalCard } from '../components/MyAnimalCard';
import SaleAnimalCard from '../components/SaleAnimalCard';
import { mintAnimalTokenContract, saleAnimalTokenContract } from '../contracts';

interface SaleAnimalProps {
 account: string;
}

const SaleAnimal: React.FC<SaleAnimalProps> = ({ account }) => {
 const [saleAnimalCard, setSaleAnimalCard] = useState<IMyAnimalCard[]>();

 const getOnSaleAnimalTokens = async () => {
  try {
   const onSaleAnimalTokenArrayLength = await saleAnimalTokenContract.methods.getOnSaleAnimalTokenArrayLength().call();
   const tempOnSaleArray: IMyAnimalCard[] = [];

   if (onSaleAnimalTokenArrayLength === '0') return;

   const tempAnimalCardArray: IMyAnimalCard[] = [];
   const res: IMyAnimalCard[] = await saleAnimalTokenContract.methods.getSaleAnimalTokens().call();

   res.map(({ animalPrice, animalTokenId, animalType, animalTokenOwner }) => {
    tempAnimalCardArray.push({
     animalPrice,
     animalTokenId,
     animalType,
     animalTokenOwner,
    });
   });

   setSaleAnimalCard(tempAnimalCardArray);
  } catch (error) {
   console.error(error);
  }
 };

 useEffect(() => {
  getOnSaleAnimalTokens();
 }, []);

 return (
  <Grid mt={4} templateColumns='repeat(4, 1fr)' gap={8}>
   {saleAnimalCard &&
    saleAnimalCard.map((animal, index) => (
     <SaleAnimalCard
      key={index}
      animalType={animal.animalType}
      animalPrice={animal.animalPrice}
      animalTokenId={animal.animalTokenId}
      animalTokenOwner={animal.animalTokenOwner!}
      account={account}
      getOnSaleAnimalTokens={getOnSaleAnimalTokens}
     />
    ))}
  </Grid>
 );
};

export default SaleAnimal;
