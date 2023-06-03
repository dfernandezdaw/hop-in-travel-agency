import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/home.css'
import { Container, Row, Col } from 'reactstrap'
import hero1 from '../assets/hero1.jpg'
import hero2 from '../assets/hero2.jpeg'
import hero_video from '../assets/hero-video.mp4'
import experienceImg from '../assets/experience.png'
import SectionTitle from '../shared/SectionTitle'

import SearchBar from '../shared/SearchBar'
import FeaturedToursList from '../components/featured-tours/FeaturedToursList'
import ImageGallery from '../components/image-gallery/ImageGallery'
import Testimonials from '../components/testimonials/Testimonials'

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
                  <Link to='/tours' className='btn primary__btn book-btn'>
                    Book Now
                  </Link>
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
      <section>
        <Container>
          <Row>
            <Col lg={6} className=''>
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
            </Col>
            <Col lg={6} className=''>
              <div className='experience-img'>
                <img src={experienceImg} alt='Experience Image' />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg={12}>
              <SectionTitle sectionTitle={'Gallery'} />
              <h2 className='gallery-title'>Visit our customers gallery</h2>
            </Col>
            <Col lg={12}>
              <ImageGallery />
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg={12}>
              <SectionTitle sectionTitle={'Testimonials'} />
              <h2 className='testimonial-title'>What our fans say about us</h2>
            </Col>
            <Col lg={12}>
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Home
