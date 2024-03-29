import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'
import hero1 from '../assets/hero1.jpg'
import hero2 from '../assets/hero2.jpeg'
import hero_video from '../assets/hero-video.mp4'
import experienceImg from '../assets/experience.jpg'
import SectionTitle from '../shared/SectionTitle'

import SearchBar from '../shared/SearchBar'
import FeaturedToursList from '../components/featured-tours/FeaturedToursList'
import ImageGallery from '../components/image-gallery/ImageGallery'
import Testimonials from '../components/testimonials/Testimonials'

const Home = () => {
  return (
    <>
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='hero-content'>
                <div className='hero-title'>
                  <SectionTitle sectionTitle='Discover Your Next Adventure With Us! 🌈' />
                </div>
                <p className='hero-text'>
                  Embark on unforgettable journeys and create lasting memories
                  with Hop In!. Our expert team is dedicated to crafting unique
                  travel experiences tailored to your interests and preferences.
                  With a wide range of destinations and personalized services,
                  we ensure every trip is truly one-of-a-kind. Ready to explore
                  the world? Let's turn your travel dreams into reality!
                </p>
                <div className='button-container'>
                  <Link to='/tours' className='btn primary-btn book-btn'>
                    Book Now
                  </Link>
                </div>
              </div>
            </div>

            <div className='col-lg-2'>
              <div className='hero-img-box-1'>
                <img src={hero1} alt='hero1' className='hero-img' />
              </div>
            </div>
            <div className='col-lg-2'>
              <div className='hero-img-box-2'>
                <img src={hero2} alt='hero2' className='hero-img' />
              </div>
            </div>
            <div className='col-lg-2'>
              <div className='hero-img-box-3'>
                <video
                  src={hero_video}
                  alt='hero3'
                  className='hero-img'
                  autoPlay
                  loop
                  muted
                />
              </div>
            </div>
            <SearchBar />
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 featured-section'>
              <SectionTitle sectionTitle='Explore' />
              <h2 className='featured-tour-title'>Our featured tours</h2>
            </div>
            <FeaturedToursList />
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6'>
              <div className='experience-content'>
                <SectionTitle sectionTitle='Experience' />
                <h2>
                  Unforgettable Journeys. <br /> Expertise Matters.
                </h2>
                <p>
                  With years of expertise, our travel agency creates
                  unforgettable journeys for our clients. We have a loyal client
                  base who trust us to deliver successful trips. Our curated
                  itineraries showcase the best of each destination, with
                  handpicked accommodations and seamless logistics. We value
                  client feedback, continuously improving our services. Join our
                  travel community for unforgettable experiences that exceed
                  expectations. Trust us to bring your travel dreams to life.
                </p>
              </div>

              <div className='counter-wrapper'>
                <div className='counter-box'>
                  <span>12k+</span>
                  <h6>Succesful Trips</h6>
                </div>
                <div className='counter-box'>
                  <span>2k+</span>
                  <h6>Regular clients</h6>
                </div>
                <div className='counter-box'>
                  <span>10</span>
                  <h6>Years Experience</h6>
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              <div className='experience-img'>
                <img src={experienceImg} alt='Experience Image' />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <SectionTitle sectionTitle={'Gallery'} />
              <h2 className='gallery-title'>Visit our customers gallery</h2>
            </div>
            <div className='col-lg-12'>
              <ImageGallery />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <SectionTitle sectionTitle={'Testimonials'} />
              <h2 className='testimonial-title'>What our fans say about us</h2>
            </div>
            <div className='col-lg-12'>
              <Testimonials />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
