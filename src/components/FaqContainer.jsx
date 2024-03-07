import faq_img from '../assets/images/home/faq.png'
import Layout from './common/Layout'
import FaqCard from './utils/reusables/FaqCard'
import InputComponent from './utils/reusables/InputComponent'

const items = [
  {
    id: 0,
    question: 'How Long Does it take to Complete a course?',
    answer:
      'Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.',
  },
  {
    id: 1,
    question: 'Will i get a certificate at the end of the course?',
    answer:
      'Nibh quisque suscipit fermentum netus nulla cras porttitor euismod nulla. Orci, dictumst nec aliquet id ullamcorper venenatis.',
  },
]

const FaqContainer = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center w-full min-h-[100vh] bg-[#fbfbfb]">
        <img src={faq_img} alt="" className="lg:h-[35rem]" />

        <div className="w-[90%] lg:w-[50%] min-h-[20rem]">
          <p className="text-[#575D60] font-medium text-xl mb-[1rem]">
            Frequently Asked Questions
          </p>

          {items?.map((item, idx) => (
            <FaqCard key={idx} item={item} />
          ))}
        </div>

        <div className="w-[90%] lg:w-[50%]">
          <p className="font-medium text-[#575D60] text-left">
            Ask your questions
          </p>
          <div className="flex items-center mx-auto w-full mb-[3rem]">
            <div className="flex-1">
              <InputComponent placeholder={'Enter your question here'} />
            </div>
            <button className="py-3 px-5 bg-[#3E7EDE] border border-[#3E7EDE] text-white font-semibold mb-3 rounded-r-sm">
              Send
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default FaqContainer
