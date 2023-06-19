import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Api } from "../services";
import { Pagination, FreeMode } from 'swiper';
import AuthLayout from "../layouts/AuthLayout";
import { Println, getStorage } from '../utils';
import { Cards, PieChart } from "../components";
import { Swiper, SwiperSlide } from 'swiper/solid';
import { Component, createSignal, For } from "solid-js";

const Dashboard: Component = () => {
  const user = getStorage("user");
  const [forum, setForum] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [universities, setUniversities] = createSignal([]);
  const [scholarships, setScholarships] = createSignal([]);
  const [myapplications, setMyApplications] = createSignal([]);
  const [applications, setApplications] = createSignal({
    total: 0,
    pending: 0,
    accepted: 0,
    declined: 0,
  });

  const onFinish = async () => {
    const pengguna = getStorage("user");
    const student = getStorage("student");

    if (student && pengguna && pengguna.role === "user") {
      await Api.get("application/" + student.id)
        .then((res) => {
          const value = res.data;
  
          if (value.status === "success") {
            const total = value.data.length;
            const pending = value.data.filter((item: any) => item.status === "pending").length;
            const accepted = value.data.filter((item: any) => item.status === "accepted").length;
            const declined = value.data.filter((item: any) => item.status === "declined").length;
  
            setMyApplications(value.data);
            setApplications({
              total,
              pending,
              accepted,
              declined,
            });
          } else if (value.status === "failed") {
            Println("Dashboard", value.message, "error");
          } else {
            Println("Dashboard", "Something went wrong!", "error");
          }
        })
        .catch((err) => {
          if (err.response) {
            Println("Students", err.response.data.message, "error")
          } else {
            Println("Students", err.message, "error")
          }
        });

      await Api.get("forum/" + student.id)
        .then((res) => {
          const value = res.data;

          if (value.status === "success") {
            setForum(value.data);
          } else if (value.status === "failed") {
            Println("Dashboard", value.message, "error");
          } else {
            Println("Dashboard", "Something went wrong!", "error");
          }
        })
        .catch((err) => {
          if (err.response) {
            Println("Students", err.response.data.message, "error")
          } else {
            Println("Students", err.message, "error")
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (pengguna && pengguna.role === "admin") {
      await Api.get("application")
        .then((res) => {
          const value = res.data;
  
          if (value.status === "success") {
            const total = value.data.length;
            const pending = value.data.filter((item: any) => item.status === "pending").length;
            const accepted = value.data.filter((item: any) => item.status === "accepted").length;
            const declined = value.data.filter((item: any) => item.status === "declined").length;
  
            setApplications({
              total,
              pending,
              accepted,
              declined,
            });
          } else if (value.status === "failed") {
            Println("Dashboard", value.message, "error");
          } else {
            Println("Dashboard", "Something went wrong!", "error");
          }
        })
        .catch((err) => {
          if (err.response) {
            Println("Students", err.response.data.message, "error")
          } else {
            Println("Students", err.message, "error")
          }
        });

      await Api.get("scholarship")
        .then((res) => {
          const value = res.data;
  
          if (value.status === "success") {
            setScholarships(value.data);
          } else if (value.status === "failed") {
            Println("Dashboard", value.message, "error");
          } else {
            Println("Dashboard", "Something went wrong!", "error");
          }
        })
        .catch((err) => {
          if (err.response) {
            Println("Students", err.response.data.message, "error")
          } else {
            Println("Students", err.message, "error")
          }
        });

      await Api.get("university")
        .then((res) => {
          const value = res.data;

          if (value.status === "success") {
            setUniversities(value.data);
          } else if (value.status === "failed") {
            Println("Dashboard", value.message, "error");
          } else {
            Println("Dashboard", "Something went wrong!", "error");
          }
        })
        .catch((err) => {
          if (err.response) {
            Println("Students", err.response.data.message, "error")
          } else {
            Println("Students", err.message, "error")
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  return (
    <AuthLayout onFinish={onFinish}>
      <div class="w-full">
        <div class="grid gap-2 grid-cols-12">
          <div class="col-span-12 sm:col-span-6 xl:col-span-3">
            <div class="flex align-middle py-4 pl-4 pr-4 h-20 bg-white items-center space-x-4 rounded-lg border shadow-md dark:bg-gray-500 dark:border-gray-700">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Total Applications
                </p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {applications().total}
              </div>
            </div>
          </div>
          <div class="col-span-12  sm:col-span-6 xl:col-span-3">
            <div class="flex align-middle py-4 h-20 pl-4 pr-4 items-center rounded-lg  bg-white space-x-4 border shadow-md  dark:bg-gray-500 dark:border-gray-700">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Applications Accepted
                </p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {applications().accepted}
              </div>
            </div>
          </div>
          <div class="col-span-12  sm:col-span-6 xl:col-span-3">
            <div class="flex align-middle py-4  h-20  pl-4 pr-4 items-center space-x-4 rounded-lg bg-white border shadow-md  dark:bg-gray-500 dark:border-gray-700">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Applications Declined
                </p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {applications().declined}
              </div>
            </div>
          </div>
          <div class="col-span-12  sm:col-span-6 xl:col-span-3">
            <div class="flex align-middle py-4 h-20  pl-4 pr-4 items-center rounded-lg space-x-4 bg-white border shadow-md  dark:bg-gray-500 dark:border-gray-700">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Applications Pending
                </p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {applications().pending}
              </div>
            </div>
          </div>
        </div>
        {user.role === "user" ? (
          <div class="grid gap-2 grid-cols-12 pt-2">
            <div class="col-span-12 w-full px-6 sm:col-span-12 xl:col-span-3 bg-white rounded-lg border shadow-md dark:bg-gray-500 dark:border-gray-700">
              <div class="flex justify-between items-center mb-4">
                <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white mt-2">Forum Activity</h5>
              </div>
              <div class="flow-root">
                <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
                  <For each={forum().slice(0, 5)}>{(item, index) => 
                    <li class="py-3 sm:py-4">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0">
                          <img class="w-8 h-8 rounded-full" src={item.image} />
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {item.alias}
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {item.message}
                          </p>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          <a href={item.link} target="_blank">Reply</a>
                        </div>
                      </div>
                    </li>
                  }</For>
                </ul>
              </div>
            </div>
            <div class="col-span-12 w-full px-6 sm:col-span-12 xl:col-span-9 bg-white rounded-lg border shadow-md dark:bg-gray-500 dark:border-gray-700">
              <h5 class="mb-3 text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                My Applications
              </h5>
              <Swiper class="mySwiper"  pagination={{ clickable: true }} slides-per-view={5} space-between={2} freeMode={true} modules={[FreeMode, Pagination]}>
                <For each={myapplications().slice(0, 5)}>{(item, index) => 
                  <SwiperSlide>
                    <Cards name={item.name} major={item.major} status={item.status} image={item.image} />
                  </SwiperSlide>
                }</For>
              </Swiper>
            </div>
          </div>
        ) : (
          <div class="grid gap-2 grid-cols-12 pt-2">
            <div class="col-span-12 w-full px-6 sm:col-span-12 xl:col-span-6 bg-white rounded-lg border shadow-md dark:bg-gray-200 dark:border-gray-700">
              {loading() ? null : <PieChart name="Scholarships Program" tag="my-app-data" category="name" value="quantity" data={scholarships()} />}
            </div>
            <div class="col-span-12 w-full px-6 sm:col-span-12 xl:col-span-6 bg-white rounded-lg border shadow-md dark:bg-gray-200 dark:border-gray-700">
              {loading() ? null : <PieChart name="Universities Quota" tag="univ-data" category="alias" value="quantity" data={universities()} />}
            </div>
          </div>
        )}
      </div>        
    </AuthLayout>
  );
}

export default Dashboard;