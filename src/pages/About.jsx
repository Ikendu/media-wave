import bg_image from '../assets/images/about/about_bg.png'
import preview from '../assets/images/about/preview.png'
import preview1 from '../assets/images/about/preview1.png'
import preview3 from '../assets/images/about/preview3.png'
import preview4 from '../assets/images/about/preview4.png'
import SectionOne from '../components/about/SectionOne'
import SectionThree from '../components/about/SectionThree'
import SectionTwo from '../components/about/SectionTwo'
import Layout from '../components/common/Layout'
// testing git
const About = () => {
  return (
    <Layout>
      <div>
        <div className="w-full flex flex-col relative">
          <div
            style={{
              backgroundImage: `url(${bg_image})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              height: '100%',
            }}
          >
            <SectionOne />
            <SectionTwo />
          </div>
          <SectionThree />

          <img
            src={preview4}
            alt=""
            className="absolute top-40 right-36 -z-10"
          />
          <img
            src={preview1}
            alt=""
            className="absolute top-[65rem] left-0 md:left-36"
          />
          <img
            src={preview}
            alt=""
            className="absolute top-[80rem] right-0 -z-10"
          />
          <img
            src={preview3}
            alt=""
            className="absolute bottom-[18rem] right-0 -z-10"
          />
          <img
            src={preview3}
            alt=""
            className="absolute bottom-0 left-20 -z-10"
          />
          <img
            src={preview4}
            alt=""
            className="absolute -bottom-64 right-[30%] -z-10"
          />
        </div>
      </div>
    </Layout>
  )
}

export default About
