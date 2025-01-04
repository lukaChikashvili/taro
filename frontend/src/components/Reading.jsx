import { Canvas } from '@react-three/fiber'
import TarotReading from './TarotReading'
import Lights from './Lights'

const Reading = () => {
  return (
  <Canvas className='canvas'>
      <Lights />
      <TarotReading />
  </Canvas>
  )
}

export default Reading
