import { Canvas } from '@react-three/fiber'
import TarotReading from './TarotReading'
import Lights from './Lights'

const Reading = () => {
  return (
  <Canvas shadows
  camera={ {
      fov: 45,
      near: 0.1,
      far:  1000,
      position: [ 2.5, 2, -10 ]}} className='canvas'>
      <Lights />
      <TarotReading />
  </Canvas>
  )
}

export default Reading
