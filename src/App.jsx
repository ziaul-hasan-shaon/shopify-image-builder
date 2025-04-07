import { Box } from '@chakra-ui/react'
import './App.css'
import ImageBuilder from './Imagebuilder/ImageBuilder'
import { Toaster } from 'react-hot-toast'

function App() {
  

  return (
    <>
      <Box>
				<ImageBuilder/>
				<Toaster />
			</Box>
    </>
  )
}

export default App
