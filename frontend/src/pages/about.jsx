import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import Newsletter from '../components/Newsletter'

const about = () => {
  return (
    <div >

      <div className='text-2xl text-center pt-8 border-t '>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16 '>
        <img className='w-full md:max-w-[450px]'src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Fashion corner was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes. </p>
          <p>Since our inception, we've worked firelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <b className='text-gray-700'>OUR MISSION</b>
          <p>At Fashion Corner, our mission is to redefine fashion e-commerce by offering high-quality, stylish, and affordable clothing with a seamless shopping experience. We are committed to providing trend-forward designs, exceptional customer service, and a hassle-free online shopping journey.

We believe fashion should be accessible to everyone, and we strive to deliver a diverse collection that caters to all styles and occasions. Through innovation, sustainability, and a customer-first approach, we aim to make online shopping enjoyable, convenient, and inspiring.

Your style, your way—delivered with quality and care. </p>
        </div>
      </div>
      <div className='text-2xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>      
        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className='text-gray-600'> we are committed to delivering the highest standards of quality in everything we do. Our dedicated Quality Assurance team ensures that every product, service, and process meets rigorous industry standards, guaranteeing reliability, performance, and customer satisfaction.

We follow strict testing protocols, continuous improvement strategies, and compliance measures to uphold excellence. By leveraging cutting-edge technology and best practices, we strive to exceed expectations and provide seamless, error-free experiences for our clients.

Your trust is our priority, and we are dedicated to maintaining the integrity, security, and quality of all our solutions.

</p>
          </div>
        </div>
        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className='text-gray-600'>we prioritize both quality and convenience to ensure a seamless experience for our customers. Our Quality Assurance processes are designed to guarantee top-tier reliability, efficiency, and ease of use in everything we offer.

We conduct rigorous testing, follow industry best practices, and continuously improve our services to eliminate hassles and save you time. Whether it's smooth functionality, secure transactions, or user-friendly solutions, we are committed to making your experience effortless and worry-free.

Your convenience matters, and we are dedicated to delivering excellence with every interaction.

</p>
          </div>
        </div>
        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className='text-gray-600'>we believe that exceptional customer service starts with a commitment to quality. Our Quality Assurance team works tirelessly to ensure that every interaction, product, and service meets the highest standards of excellence.

From prompt responses to personalized support, we continuously refine our processes to enhance your experience. We implement rigorous quality checks, gather customer feedback, and embrace innovation to deliver seamless, efficient, and friendly service every time.

Your satisfaction is our top priority, and we are dedicated to providing a hassle-free, reliable, and exceptional customer experience.

</p>
          </div>
        </div>
        <Newsletter/>
    </div>
  )
}

export default about
