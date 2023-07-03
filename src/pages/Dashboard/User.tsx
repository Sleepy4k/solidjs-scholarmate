import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Cards } from '@components';
import { For, Component } from 'solid-js';
import { Pagination, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/solid';

interface IUserProps {
  forum: any;
  myapplications: any;
}

const User: Component<IUserProps> = (props) => {
  return (
    <div class='grid gap-2 grid-cols-12 pt-2'>
      {props.forum.length > 0 ? (
        <div class='col-span-12 w-full px-6 sm:col-span-12 xl:col-span-3 bg-white rounded-lg border shadow-md dark:bg-gray-500 dark:border-gray-700'>
          <div class='flex justify-between items-center mb-4'>
            <h5 class='text-xl font-bold leading-none text-gray-900 dark:text-white mt-2'>Forum Activity</h5>
          </div>
          <div class='flow-root'>
            <ul role='list' class='divide-y divide-gray-200 dark:divide-gray-700'>
              <For each={props.forum.slice(0, 5)}>{item => 
                <li class='py-3 sm:py-4'>
                  <div class='flex items-center space-x-4'>
                    <div class='flex-shrink-0'>
                      <img class='w-8 h-8 rounded-full' src={item.image} alt='University' />
                    </div>
                    <div class='flex-1 min-w-0'>
                      <p class='text-sm font-medium text-gray-900 truncate dark:text-white'>
                        {item.alias}
                      </p>
                      <p class='text-sm text-gray-500 truncate dark:text-gray-400'>
                        {item.message}
                      </p>
                    </div>
                    <div class='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                      <a href={item.link} target='_blank'>Reply</a>
                    </div>
                  </div>
                </li>
              }</For>
            </ul>
          </div>
        </div>
      ) : null}
      {props.myapplications.length > 0 ? (
        <div class='col-span-12 w-full px-6 sm:col-span-12 xl:col-span-9 bg-white rounded-lg border shadow-md dark:bg-gray-500 dark:border-gray-700'>
          <h5 class='mb-3 text-base font-semibold text-gray-900 lg:text-xl dark:text-white'>
            My Applications
          </h5>
          <Swiper class='mySwiper' pagination={{ clickable: true }} slides-per-view={5} space-between={2} freeMode={true} modules={[FreeMode, Pagination]}>
            <For each={props.myapplications.slice(0, 5)}>{item => 
              <SwiperSlide>
                <Cards name={item.name} major={item.major} status={item.status} image={item.image} />
              </SwiperSlide>
            }</For>
          </Swiper>
        </div>
      ) : null}
    </div>
  );
};

export default User;