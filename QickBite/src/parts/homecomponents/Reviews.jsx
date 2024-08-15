import React from 'react'
import Review from '../layouts/Review'
import img1 from '../../assets/pic1.png'
import img2 from '../../assets/pic2.png'
import img3 from '../../assets/pic3.png'
function Reviews() {
  return (
    <div className='min-h-screen flex flex-col items-center md:px-32 px-5'>
        <h1 className='text-4xl font-semibold text-center lg:pt-16 pt-24 pb-10'>Customer Reviews</h1>
        <div className='flex flex-col md:flex-row gap-5 mt-5 '>
            <Review img={img1} name="Samira Azura" descr="Exceptional dining experience! The food was fresh and bursting with flavor. The service was attentive and made us feel like valued guests. Highly recommend for anyone looking for a great meal out."></Review>
            <Review img={img2} name="Ahmed Cena" descr="I’ve never tasted anything quite like it! The dishes were both creative and delicious. The ambiance was perfect for a relaxed evening, and the staff were incredibly friendly and efficient"></Review>
            <Review img={img3} name="Rahma Jenner" descr="Absolutely fantastic! Every aspect, from the food to the service, exceeded our expectations. The attention to detail and quality is evident, making it a top choice for any food lover."></Review>
            
        </div>
    </div>
  )
}

export default Reviews