import { Box, Button, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { saleAnimalTokenContract, web3 } from '../contracts';
import AnimalCard from './AnimalCard';

interface SaleAnimalCardProps {
 animalType: string;
 animalPrice: string;
 animalTokenId: string;
 animalTokenOwner: string;
 account: string;
 getOnSaleAnimalTokens: () => Promise<void>;
}

const SaleAnimalCard: React.FC<SaleAnimalCardProps> = ({ animalType, animalPrice, animalTokenId, animalTokenOwner, account, getOnSaleAnimalTokens }) => {
 const [isBuyable, setIsBuyable] = useState<boolean>(false);

 const onClickBuy = async () => {
  try {
   if (!account) return;
   const res = await saleAnimalTokenContract.methods.purchaseAnimalToken(animalTokenId).send({ from: account, value: animalPrice });

   console.log(res);

   if (res.status) {
    getOnSaleAnimalTokens();
   }
  } catch (error) {
   console.error(error);
  }
 };

 useEffect(() => {
  setIsBuyable(animalTokenOwner.toLocaleLowerCase() == account.toLocaleLowerCase());
 }, []);
 return (
  <Box textAlign='center' w={150}>
   <AnimalCard animalType={animalType} />
   <Box>
    <Text d='inline-block'>{web3.utils.fromWei(animalPrice)} METIC</Text>
    <Button size='sm' colorScheme='green' m={2} disabled={isBuyable} onClick={onClickBuy}>
     Buy
    </Button>
   </Box>
  </Box>
 );
};

export default SaleAnimalCard;
