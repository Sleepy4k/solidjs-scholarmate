import AuthLayout from "../layouts/AuthLayout";
import { useNavigate, A } from "@solidjs/router";
import { Component, createSignal } from "solid-js";
import { Api, Println, setStorage } from "../utils/index";

const Students: Component = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = createSignal(false);
  const [data, setData] = createSignal({
    firstName: "",
    lastName: "",
    nik: "",
    dob: "",
    region: "",
    toefl: "",
    ielts: "",
  });
  
  const handleChange = (e: any) => {
    setData({ ...data(), [e.target.name]: e.target.value });
  }

  const handleValidation = () => {
    let formIsValid = true;
    setLoading(true);

    // Validasi buat Email
    if (!data().firstName) {
      formIsValid = false;
      Println("Students", "First Name cannot be empty!", "error");
    } 
    if (!data().lastName) {
        formIsValid = false;
        Println("Students", "Last Name cannot be empty!", "error");
    } 
    if (!data().nik) {
        formIsValid = false;
        Println("Students", "NIK cannot be empty!", "error");
    }else if (!(data().nik.length !=16 ) ) {
          formIsValid = false;
          Println("Students", "NIK is not valid!", "error");
        }

    if (!data().dob) {
        formIsValid = false;
        Println("Students", "Date Of Birth cannot be empty!", "error");
    } 

    if (!data().region) {
        formIsValid = false;
        Println("Students", "Region cannot be empty!", "error");
    } 
    if (!data().toefl) {
        formIsValid = false;
        Println("Students", "TOEFL cannot be empty!", "error");
    } 
    if (!data().ielts) {
        formIsValid = false;
        Println("Students", "IELTS cannot be empty!", "error");
    } 


    if (formIsValid) {
      handleSubmit();
    } else {
      setLoading(false);
    }
  }

  // submit Button
  const handleSubmit = async () => {
    Api.post("/join", data())
      .then((res) => {
        const value = res.data;

        if (value.status === "success") {
          Println("Students", value.message, "success");
          handleStudents(value.data[0]);
        } else if (value.status == "failed") {
          Println("Students", value.message, "error");
        } else {
          Println("Students", "Something went wrong!", "error");
        }
      })
      .catch((err) => {
        Println("Students", err.message, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleStudents = (data: any) => {
    setStorage("user", data);
    navigate("/");
  }

  return (
    <AuthLayout onFinish={() => {}}>
      <section class="h-screen">
        <div class="py-12 h-full">
          <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
              <div class="mb-6">
              <div class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p class="text-center font-semibold mx-4 mb-0">Data Diri</p>
              </div>
                <label for="firstName">Nama Depan</label>
                <input 
                  required
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Depan"
                  value={data().firstName}
                  disabled={loading()}
                  onchange={handleChange} 
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />

                <label for="lastName">Nama Belakang</label>
                <input 
                  required
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Belakang"
                  value={data().lastName}
                  disabled={loading()}
                  onchange={handleChange} 
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />

                <label for="nik">Nomor Induk Kependudukan (NIK)</label>
                <input 
                  required
                  type="text"
                  id="nik"
                  name="nik"
                  placeholder="NIK"
                  value={data().nik}
                  disabled={loading()}
                  onchange={handleChange} 
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />

                <label for="dob">Tanggal Lahir</label>
                <input 
                  required
                  type="date"
                  id="dob"
                  name="dob"
                  value={data().dob}
                  disabled={loading()}
                  onchange={handleChange} 
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
                <label for="region">Daerah Asal</label>
                <input 
                  required
                  type="text"
                  id="region"
                  name="region"
                  placeholder="Daerah Asal"
                  value={data().region}
                  disabled={loading()}
                  onchange={handleChange} 
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />

                 
              </div>
              <div class="mb-6">
              <div class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p class="text-center font-semibold mx-4 mb-0">Nilai Akademik</p>
              </div>
              <label for="toefl">TOEFL</label>
                <input 
                  required
                  type="text"
                  id="toefl"
                  name="toefl"
                  placeholder="TOEFL"
                  value={data().toefl}
                  disabled={loading()}
                  onchange={handleChange} 
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />

                 <label for="ielts">IELTS</label>
                <input 
                  required
                  type="text"
                  id="ielts"
                  name="ielts"
                  placeholder="IELTS"
                  value={data().ielts}
                  disabled={loading()}
                  onchange={handleChange} 
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />   
              </div>
              <button
                type="submit" onclick={handleValidation} disabled={loading()}
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light">
                Upload
              </button>
              
            </div>
          </div>
        </div>
      </section>
    </AuthLayout>
  );
};

export default Students;