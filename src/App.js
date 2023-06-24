import bg from './assets/video/nebula.mp4';
import avatar from './assets/images/avatar.jpg';
import Player from './components/musicPlayer/Player';
import { useEffect } from 'react';

export default function App() {
  return (
    <div className='relative flex justify-center items-center min-h-screen'>
      <video className='fixed top-0 left-0 min-h-screen w-screen object-cover'autoPlay muted loop>
        <source src={bg} type="video/mp4" />
      </video>
      <div className='relative z-10 p-4 w-full'>
        <div className='md:flex items-center gap-5 relative w-full border-2 border-slate-700 sm:max-w-screen-sm md:max-w-screen-md text-white p-4 bg-slate-900 rounded-lg shadow-xl mx-auto mb-5'>
          <img className='h-40 w-40 border-2 border-slate-700 rounded-full mb-2 mx-auto md:mx-0 md:mb-0' src={avatar} alt='Aidan Lee Avatar' />
          <div>
            <h1 className='text-3xl font-semibold'>Aidan Lee</h1>
            <p className='font-semibold'>Composer and Mixing Engineer</p>
            <p className='mb-2'>Hi, I'm Aidan, an Essex based composer with 12 years of experience.</p>
            <div className='flex items-start gap-3 flex-col md:flex-row md:items-center'>
                <a className='group flex items-center gap-2 text-sm text-orange-500 hover:underline' href='https://www.aidanklee.co.uk/music'>
                  <svg className='group-hover:scale-[120%] duration-300 fill-orange-500' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-43-61v-82q-35 0-59-26t-24-61v-44L149-559q-5 20-7 39.5t-2 39.5q0 130 84.5 227T437-141Zm294-108q22-24 38.5-51t28-56.5q11.5-29.5 17-60.5t5.5-63q0-106-58-192.5T607-799v18q0 35-24 61t-59 26h-87v87q0 17-13.5 28T393-568h-83v88h258q17 0 28 13t11 30v127h43q29 0 51 17t30 44Z"/></svg>
                  aidanklee.co.uk/music
                </a>
              <span className='hidden text-sm md:block'>|</span>
              <a className='group flex items-center gap-2 text-sm text-orange-500 hover:underline' href='mailto:aidankglee@googlemail.com'>
                <svg className='group-hover:scale-[120%] duration-300 fill-orange-500' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480v53q0 56-39.5 94.5T744-294q-36 0-68-17.5T627-361q-26 34-65 50.5T480-294q-78 0-132.5-54T293-480q0-78 54.5-133T480-668q78 0 132.5 55T667-480v53q0 31 22.5 52t54.5 21q31 0 53.5-21t22.5-52v-53q0-142-99-241t-241-99q-142 0-241 99t-99 241q0 142 99 241t241 99h214v60H480Zm0-274q53 0 90-36.5t37-89.5q0-54-37-91t-90-37q-53 0-90 37t-37 91q0 53 37 89.5t90 36.5Z"/></svg>
                aidankglee@gmail.com
              </a>
              <span className='hidden text-sm md:block'>|</span>
              <a className='group flex items-center gap-2 text-sm text-orange-500 hover:underline' href='tel:+447903632485'>
                <svg className='group-hover:scale-[120%] duration-300 fill-orange-500' xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="20"><path d="M260-40q-24 0-42-18t-18-42v-760q0-24 18-42t42-18h440q24 0 42 18t18 42v760q0 24-18 42t-42 18H260Zm0-150v90h440v-90H260Zm220.175 75q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM260-250h440v-520H260v520Zm0-580h440v-30H260v30Zm0 640v90-90Zm0-640v-30 30Z"/></svg>
                +447903632485
              </a>
            </div>
          </div>
        </div>
        <Player/>
      </div>
    </div>
  );
}
