import FormCreateMessage from '@/components/feature/message/FormCreateMessage';
import ListMessage from '@/components/feature/message/ListMessage';

export default function Home() {
 return (
    <div className='flex justify-center items-center flex-col gap-6'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pt-3'>
        WSForum
      </h1>

      <FormCreateMessage />
      <ListMessage />
    </div>
  );
}
