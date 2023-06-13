import { createApexCharts } from "solid-apexcharts";
import { Component, createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Transition } from "solid-transition-group";
import { Icons } from "../../components/icon";
import { IconDetail } from "../../const/icon.const";
import  AKBarChart   from "../charts/barcharts"
import AKProgressBar from "../charts/progressbar";
import AKProgressChart from "../charts/progresschart";
import AuthLayout from "../../layouts/AuthLayout";
import Sidebar from "../../components/sidebar";
import Cards from "../../components/Cards"


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import 'swiper/css/scrollbar';

import { Swiper, SwiperSlide, } from 'swiper/solid';
import { Navigation, Pagination, Scrollbar, A11y, FreeMode } from 'swiper';

const Dashboard: Component = () => {
    var options = {
        chart: {
            height: 350,
            type: 'radialBar',
        },
        series: [70],
        labels: ['Progress'],
      }

    return (
        <AuthLayout onFinish={() => { }}>
            
            <div class="w-full">
                
                <div class="grid  gap-2 grid-cols-12">
                    <div class="col-span-12  sm:col-span-6 xl:col-span-3">
                        <div class="flex align-middle py-4 pl-4 pr-4 h-20 bg-white items-center space-x-4  rounded-lg border shadow-md  dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex-shrink-0">
                                {Icons["LEAD"](24, "#000000")}
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Total Applications
                                </p>
                                <p class=" text-gray-500 truncate dark:text-gray-400">
                                <AKProgressBar value="50"></AKProgressBar>
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                100
                            </div>
                        </div>
                    </div>
                    <div class="col-span-12  sm:col-span-6 xl:col-span-3">
                        <div class="flex align-middle py-4 h-20 pl-4 pr-4 items-center rounded-lg  bg-white space-x-4 border shadow-md  dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex-shrink-0">
                                {Icons["ORDER"](24, "#000000")}
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Applications Accepted
                                </p>
                                <p class=" text-gray-500 truncate dark:text-gray-400">
                                <AKProgressBar value="90"></AKProgressBar>
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                12
                            </div>
                        </div>
                    </div>
                    <div class="col-span-12  sm:col-span-6 xl:col-span-3">
                        <div class="flex align-middle py-4 h-20  pl-4 pr-4 items-center rounded-lg space-x-4 bg-white border shadow-md  dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex-shrink-0">
                                {Icons["BUSINESS"](24, "#000000")}
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Applications Pending
                                </p>
                                <p class=" text-gray-500 truncate dark:text-gray-400">
                                        <AKProgressBar value="100"></AKProgressBar>
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                5
                            </div>
                        </div>
                    </div>
                    <div class="col-span-12  sm:col-span-6 xl:col-span-3">
                        <div class="flex align-middle py-4  h-20  pl-4 pr-4 items-center space-x-4 rounded-lg bg-white border shadow-md  dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex-shrink-0">
                                {Icons["LEAD"](24, "#000000")}
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Applications Declined
                                </p>
                                <p class="text-gray-500 truncate dark:text-gray-400">
                                    <AKProgressBar value="30"></AKProgressBar>
                                </p>
                            </div>
                            <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                13
                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid gap-2 grid-cols-12 pt-2">
                    <div class="col-span-12 w-full px-6 sm:col-span-12 xl:col-span-3 bg-white rounded-lg border shadow-md  dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex justify-between items-center mb-4">
                            <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Forum Activity</h5>
                            <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                                View all
                            </a>
                        </div>
                        <div class="flow-root">
                            <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="./src/assets/img/1.jpg" alt="Neil image" />
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                M Naufal Hidayat
                                            </p>
                                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                Cara daftar ke UI gimana ges ama tips&trick
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            13:30
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="./src/assets/img/5.jpg" alt="Bonnie image" />
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Consultant EF ☑️
                                            </p>
                                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                email@windster.com
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            $3467
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="./src/assets/img/2.jpg" alt="Michael image" />
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                CS Binus ✅
                                            </p>
                                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                email@windster.com
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            $67
                                        </div>
                                    </div>
                                </li>
                                <li class="py-3 sm:py-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="./src/assets/img/3.jpg" alt="Lana image" />
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Lana Del Rey
                                            </p>
                                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                kemaren gw masuk keterima karna bikin cv bagus
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            $367
                                        </div>
                                    </div>
                                </li>
                                <li class="pt-3 pb-0 sm:pt-4">
                                    <div class="flex items-center space-x-4">
                                        <div class="flex-shrink-0">
                                            <img class="w-8 h-8 rounded-full" src="./src/assets/img/6.jpg" alt="Thomas image" />
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                Thomes Lean
                                            </p>
                                            <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                                                email@windster.com
                                            </p>
                                        </div>
                                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                            $2367
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-span-12 px-6 sm:col-span-3 xl:col-span-9  bg-white rounded-lg border shadow-md  dark:bg-gray-800 dark:border-gray-700">
             
                        
                        <h5 class="mb-3 text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                            My Applications
                        </h5>
                        <Swiper class="mySwiper"  pagination={{ clickable: true }} slides-per-view={300} space-between={30} freeMode={true} modules={[FreeMode, Pagination]}>
                        <SwiperSlide>
                            <Cards/>
                        </SwiperSlide>
                        <SwiperSlide>   
                            <Cards/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Cards/>
                        </SwiperSlide>
                        <SwiperSlide>
                            <Cards/>
                            </SwiperSlide>
                        <SwiperSlide>
                            <Cards/>
                            </SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>      
                        <SwiperSlide>Slide 9</SwiperSlide>
                     </Swiper>
                     
                    </div>

                    

                </div>
            </div>

            
        </AuthLayout>
    );
}

export default Dashboard;