import { Image } from '@chakra-ui/react';
import React from 'react';

interface AnimalCardProps {
 animalType: string;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animalType }) => {
 return <Image w={150} h={150} src={`images/${animalType}.png`} alt='AnimalCard' />;
};

export default AnimalCard;
