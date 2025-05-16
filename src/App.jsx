// App.js
import { Box } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import './App.css';
import ImageBuilder from './Imagebuilder/ImageBuilder';
import ImageBuilder2dac from './Imagebuilder/ImageBuilder2dac';
import { usePage } from './Imagebuilder/hook/PageContext';

function App() {
  const { currentPage } = usePage();
	console.log('currentPage', currentPage)

  return (
    <Box>
      {currentPage === 'all' && <ImageBuilder />}
      {currentPage === '2d-acrylic' && <ImageBuilder />}
      {currentPage === '2d-cutout' && <ImageBuilder2dac />}
      <Toaster />
    </Box>
  );
}

export default App;
