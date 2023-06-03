import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './testimonials.css'
import pic from '../../assets/profile.jpg'

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  }

  return (
    <Slider {...settings}>
      <div className='testimonial'>
        <p>
          Hop In! Travel Agency was absolutely fantastic! Their attention to
          detail, personalized service, and seamless travel arrangements made my
          trip a dream come true. Highly recommended!
        </p>
        <div className='img-wrapper'>
          <img src={pic} alt='user1' className='testimonials-img' />
          <div>
            <h6 className='username'>Emma Johnson</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className='testimonial'>
        <p>
          Hop In! Travel Agency was absolutely fantastic! Their attention to
          detail, personalized service, and seamless travel arrangements made my
          trip a dream come true. Highly recommended!
        </p>
        <div className='img-wrapper'>
          <img src={pic} alt='user1' className='testimonials-img' />
          <div>
            <h6 className='username'>Emma Johnson</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className='testimonial'>
        <p>
          Hop In! Travel Agency was absolutely fantastic! Their attention to
          detail, personalized service, and seamless travel arrangements made my
          trip a dream come true. Highly recommended!
        </p>
        <div className='img-wrapper'>
          <img src={pic} alt='user1' className='testimonials-img' />
          <div>
            <h6 className='username'>Emma Johnson</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className='testimonial'>
        <p>
          Hop In! Travel Agency was absolutely fantastic! Their attention to
          detail, personalized service, and seamless travel arrangements made my
          trip a dream come true. Highly recommended!
        </p>
        <div className='img-wrapper'>
          <img src={pic} alt='user1' className='testimonials-img' />
          <div>
            <h6 className='username'>Emma Johnson</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
      <div className='testimonial'>
        <p>
          Hop In! Travel Agency was absolutely fantastic! Their attention to
          detail, personalized service, and seamless travel arrangements made my
          trip a dream come true. Highly recommended!
        </p>
        <div className='img-wrapper'>
          <img src={pic} alt='user1' className='testimonials-img' />
          <div>
            <h6 className='username'>Emma Johnson</h6>
            <p>Customer</p>
          </div>
        </div>
      </div>
    </Slider>
  )
}

export default Testimonials
