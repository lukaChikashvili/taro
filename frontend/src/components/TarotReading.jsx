import { Html, OrbitControls, Stars, useTexture } from '@react-three/drei';
import { useEffect, useReducer, useRef, useState } from 'react';
import { cardData } from './CardData';
import cover from '../assets/cover.jpg';
import gsap from 'gsap';
import * as THREE from 'three';

const TarotReading = () => {
  const [randomCards, setRandomCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [rotations, setRotations] = useState({});


  const background = useTexture(cover);

 
  const cardTextures = cardData.map(card => useTexture(card.img));

  const getRandomCards = () => {
    const shuffledCards = [...cardData].sort(() => 0.5 - Math.random());
    setRandomCards(shuffledCards.slice(0, 3));
  };

  const cardRefs = useRef([]);

  useEffect(() => {
    

    getRandomCards();

 
  
  }, []);

  const shuffleCards = () => {
    getRandomCards();
    
    const duration = 1; 
    const totalDuration = 3; 
    const repeatCount = totalDuration / duration - 1; 
    
    gsap.to(cardRefs.current.at(0).position, {
      x: 1,  
      y: 0.2,
      z: 0.5,
      duration: duration,
      ease: "power2.inOut",
      repeat: repeatCount, 
      yoyo: true,  
      stagger: 0.2 
    });
    
    gsap.to(cardRefs.current.at(1).position, {
      x: -1,  
      y: 0.2,
      z: -0.5,
      duration: duration,
      ease: "power2.inOut",
      repeat: repeatCount,  
      yoyo: true,
      stagger: 0.2
    });
    
    gsap.to(cardRefs.current.at(2).position, {
      x: 2,  
      y: 0.2,
      z: -0.5,
      duration: duration,
      ease: "power2.inOut",
      repeat: repeatCount,  
      yoyo: true,
      stagger: 0.2
    });

  }

   

  const handleCardClick = (card, index) => {
  
    const newRotation = rotations[index] === 180 ? 0 : 180;

   
    gsap.to(`.card-${index}`, {
      rotationY: newRotation * Math.PI / 180,
      duration: 2,
      ease: "power2.inOut"
    });
    
    setRotations(prev => ({ ...prev, [index]: newRotation }));

    setSelectedCard(card);
    console.log(card);
  };

  return (
    <>
      <OrbitControls makeDefault />
      <Stars />

      <group position={[-2, 0.5, 0]}>
        {randomCards.map((card, index) => (
          <mesh ref={el => cardRefs.current[index] = el}
            className={`card-${index}`}
            key={index}
            position={[index * 2, 0, 0]}
            onClick={() => handleCardClick(card, index)}
          >
            <planeGeometry args={[1.5, 2]} />
            <meshStandardMaterial
              map={rotations[index] === 180 ? cardTextures[index] : background} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        ))}
      </group>


      <Html className='absolute -bottom-[15rem] -left-[45rem]'>
        <button onClick={shuffleCards}>Shuffle</button>
      </Html>
    </>
  );
};

export default TarotReading;
