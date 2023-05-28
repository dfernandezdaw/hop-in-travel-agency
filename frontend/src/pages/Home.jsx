import React from 'react'
import '../styles/home.css'
import { Container, Row, Col } from 'reactstrap'
import hero1 from '../assets/hero1.jpg'
import hero2 from '../assets/hero2.jpeg'
import hero3 from '../assets/hero3.jpeg'
import hero_video from '../assets/hero-video.mp4'
import SectionTitle from '../shared/SectionTitle'

import SearchBar from '../shared/SearchBar'
import FeaturedToursList from '../components/featured-tours/FeaturedToursList'

const Home = () => {
  return (
    <>
      <section>
        <Container className='my_container'>
          <Row className='my_row'>
            <Col lg={6} className='my-col-lg-6'>
              <div className='hero_content'>
                <div className='hero_title'>
                  <SectionTitle sectionTitle='Discover Your Next Adventure With Us! 🌈' />
                </div>
                <p className='hero_text'>
                  Embark on unforgettable journeys and create lasting memories
                  with Hop In!. Our expert team is dedicated to crafting unique
                  travel experiences tailored to your interests and preferences.
                  With a wide range of destinations and personalized services,
                  we ensure every trip is truly one-of-a-kind. Ready to explore
                  the world? Let's turn your travel dreams into reality!
                </p>
                <div className='button_container'>
                  <button className='btn primary__btn'>Book Now</button>
                </div>
              </div>
            </Col>

            <Col lg={2} className='my-col-lg-2'>
              <div className='hero_img_box-1'>
                <img src={hero1} alt='hero1' className='hero_img' />
              </div>
            </Col>
            <Col lg={2} className='my-col-lg-2'>
              <div className='hero_img_box-2'>
                <img src={hero2} alt='hero2' className='hero_img' />
              </div>
            </Col>
            <Col lg={2} className='my-col-lg-2'>
              <div className='hero_img_box-3'>
                <video
                  src={hero_video}
                  alt='hero3'
                  className='hero_img'
                  autoPlay
                  loop
                  muted
                />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>
      {/*       <section>
        <Container className='my_container'>
          <Row className='my_row'>
            <Col className='my-col-lg-3'>
              <h5 className='subtitle-service'>What we serve</h5>
              <h2 className='title-service'>Our Services</h2>
              <p className='text-service'>
                We offer a wide range of travel services, including flight
                tickets, hotel reservations, car rentals, and more. Our team of
                experts is dedicated to providing you with the best travel
                experience possible. Whether you're looking for a quick getaway
                or an extended vacation, we have something for everyone!
              </p>
            </Col>
          </Row>
        </Container>
      </section> */}
      <section>
        <Container className='my_container'>
          <Row className='my_row'>
            <Col lg={12} className='my-col-lg-12 mb-5'>
              <SectionTitle sectionTitle='Explore' />
              <h2 className='featured-tour-title'>Our featured tours</h2>
            </Col>
            <FeaturedToursList />
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Home
