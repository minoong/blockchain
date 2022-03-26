import React from 'react';

interface MyAnimalProps {
 account: string;
}

const MyAnimal: React.FC<MyAnimalProps> = ({ account }) => {
 return <div>MyAnimal</div>;
};

export default MyAnimal;
