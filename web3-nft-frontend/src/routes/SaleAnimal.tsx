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
   for (let i = 0; i < parseInt(onSaleAnimalTokenArrayLength, 10); i++) {
    const animalTokenId = await saleAnimalTokenContract.methods.onSaleAnimalTokenArray(i).call();
    const animalType = await mintAnimalTokenContract.methods.animalTypes(animalTokenId).call();
    const animalPrice = await saleAnimalTokenContract.methods.animalTokenPrices(animalTokenId).call();

    tempOnSaleArray.push({ animalTokenId, animalType, animalPrice });
   }
   setSaleAnimalCard(tempOnSaleArray);
  } catch (error) {
   console.error(error);
  }
 };

 useEffect(() => {
  getOnSaleAnimalTokens();
 }, []);

 return (
  <Grid mt={4} templateColumns='repeat(4, 1fr)' gap={8}>
   {saleAnimalCard && saleAnimalCard.map((animal, index) => <SaleAnimalCard key={index} animalType={animal.animalType} animalPrice={animal.animalPrice} />)}
  </Grid>
 );
};

export default SaleAnimal;
