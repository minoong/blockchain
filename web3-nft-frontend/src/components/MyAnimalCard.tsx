import { Box, Button, Input, InputGroup, InputRightAddon, Text } from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { saleAnimalTokenContract, web3 } from '../contracts';
import AnimalCard from './AnimalCard';

export interface IMyAnimalCard {
 animalTokenId: string;
 animalType: string;
 animalPrice: string;
 animalTokenOwner?: string;
}

interface MyAnimalCardProps extends IMyAnimalCard {
 saleStatus: boolean;
 account: string;
}

const MyAnimalCard: React.FC<MyAnimalCardProps> = ({ animalTokenId, animalType, animalPrice, saleStatus, account }) => {
 const [myAnimalPrice, setMyAnimalPrice] = useState<string>(animalPrice);
 const [sellPrice, setSellPrice] = useState<string>('');
 const onChangeSellPrice = (e: ChangeEvent<HTMLInputElement>) => setSellPrice(e.target.value);
 const onClickCell = async () => {
  try {
   if (!account || !saleStatus) return;

   const res = await saleAnimalTokenContract.methods.setForSaleAnimalToken(animalTokenId, web3.utils.toWei(sellPrice, 'ether')).send({
    from: account,
   });

   if (res.status) {
    setMyAnimalPrice(web3.utils.toWei(sellPrice, 'ether'));
   }
  } catch (error) {
   console.error(error);
  }
 };
 return (
  <Box textAlign='center' w={150}>
   <AnimalCard animalType={animalType} />
   <Box mt={2}>
    {myAnimalPrice === '0' ? (
     <>
      <InputGroup>
       <Input type='number' value={sellPrice} onChange={onChangeSellPrice} />
       <InputRightAddon children='Metic' />
      </InputGroup>
      <Button size='xs' colorScheme='green' mt='2' onClick={onClickCell}>
       Sell
      </Button>
     </>
    ) : (
     <Text d='inline-block'>{web3.utils.fromWei(myAnimalPrice)} Matic</Text>
    )}
   </Box>
  </Box>
 );
};

export default MyAnimalCard;
