import Headtitle from './Headtitle';
import Cardbox from './Cardbox';

const ContentFiles = () => {
  return (
    <section className="w-full flex flex-col py-[10px] justify-center items-center gap-[30px] z-[2]">
      <Headtitle />
      <Cardbox />
      <img src="background2.png" alt="backimage2" className=' absolute z-[-1] h-[300px] left-[58%] top-[20%]'/>
    </section>
  );
}

export default ContentFiles