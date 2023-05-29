import React from 'react'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import './image-gallery.css'
import gallery1 from '../../assets/gallery1.jpg'
import gallery2 from '../../assets/gallery2.jpg'
import gallery3 from '../../assets/gallery3.jpg'
import gallery4 from '../../assets/gallery4.jpg'
import gallery5 from '../../assets/gallery5.jpg'
import gallery6 from '../../assets/gallery6.jpg'
import gallery7 from '../../assets/gallery7.jpg'
import gallery8 from '../../assets/gallery8.jpg'
import gallery9 from '../../assets/gallery9.jpg'

const ImageGallery = () => {
  const images = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
    gallery9,
  ]
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
      <Masonry gutter='1rem'>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} alt='tour-image' className='img-gallery' />
          </div>
        ))}
      </Masonry>
    </ResponsiveMasonry>
  )
}

export default ImageGallery
