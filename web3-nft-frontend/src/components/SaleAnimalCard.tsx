import { Box, Button, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { mintAnimalTokenContract, web3 } from '../contracts';
import AnimalCard from './AnimalCard';

interface SaleAnimalCardProps {
 animalType: string;
 animalPrice: string;
 animalTokenId: string;
 animalTokenOwner: string;
 account: string;
}

const SaleAnimalCard: React.FC<SaleAnimalCardProps> = ({ animalType, animalPrice, animalTokenId, animalTokenOwner, account }) => {
 const [isBuyable, setIsBuyable] = useState<boolean>(false);

 useEffect(() => {
  setIsBuyable(animalTokenOwner.toLocaleLowerCase() == account.toLocaleLowerCase());
 }, []);
 return (
  <Box textAlign='center' w={150}>
   <AnimalCard animalType={animalType} />
   <Box>
    <Text d='inline-block'>{web3.utils.fromWei(animalPrice)} METIC</Text>
    <Button size='sm' colorScheme='green' m={2} disabled={isBuyable}>
     Buy
    </Button>
   </Box>
  </Box>
 );
};

export default SaleAnimalCard;
