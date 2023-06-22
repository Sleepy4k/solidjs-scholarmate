import { Api } from "../services";
import { GridData } from "../components";
import AuthLayout from "../layouts/AuthLayout";
import { Component, createSignal } from "solid-js";
import { Println, setStorage, getStorage, deleteStorage } from "../utils";

const Students: Component = () => {
  const user = getStorage("user");
  const [students, setStudents] = createSignal([]);
  const [student, setStudent] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  const [loggedIn, setLoggedIn] = createSignal(false);
  const [data, setData] = createSignal({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    register_number: "",
    date_of_birth: "",
    region: "",
    toefl_score: 0,
    ielts_score: 0,
  });
  
  const field = [
    { field: "id", headerName: "ID" },
    { field: "first_name", headerName: "First Name" },
    { field: "last_name", headerName: "Last Name" },
    { field: "email" },
    { field: "phone" },
    { field: "date_of_birth", headerName: "DOB" },
    { field: "region" },
    { field: "register_number", headerName: "NIK" },
    { field: "toefl_score", headerName: "TOEFL" },
    { field: "ielts_score", headerName: "IELTS" }
  ];

  const handleChange = (e: any) => {
    if (e.target.name === "register_number") {
      setData({ ...data(), [e.target.name]: e.target.value });
    } else {
      setData({ ...data(), [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value });
    }
  }

  const handleValidation = () => {
    let formIsValid = true;
    setLoading(true);

    // Validasi buat Email
    if (!data().first_name) {
      formIsValid = false;
      Println("Students", "First Name cannot be empty!", "error");
    } else if (data().first_name.length < 3) {
      formIsValid = false;
      Println("Students", "Last Name is not valid!", "error");
    } else if (data().first_name.length > 255) {
      formIsValid = false;
      Println("Students", "Last Name is not valid!", "error");
    }

    if (!data().last_name) {
      formIsValid = false;
      Println("Students", "Last Name cannot be empty!", "error");
    } else if (data().last_name.length < 3) {
      formIsValid = false;
      Println("Students", "Last Name is not valid!", "error");
    } else if (data().last_name.length > 255) {
      formIsValid = false;
      Println("Students", "Last Name is not valid!", "error");
    }

    if (!data().register_number) {
      formIsValid = false;
      Println("Students", "register_number cannot be empty!", "error");
    }else if (data().register_number.length < 16) {
      formIsValid = false;
      Println("Students", "register_number is not valid!", "error");
    }

    if (!data().date_of_birth) {
      formIsValid = false;
      Println("Students", "Date Of Birth cannot be empty!", "error");
    } else if (data().date_of_birth.length < 10) {
      formIsValid = false;
      Println("Students", "Date Of Birth is not valid!", "error");
    }

    if (!data().region) {
      formIsValid = false;
      Println("Students", "Region cannot be empty!", "error");
    } else if (data().region.length > 255) {
      formIsValid = false;
      Println("Students", "Region is not valid!", "error");
    }

    if (!data().toefl_score) {
      formIsValid = false;
      Println("Students", "TOEFL cannot be empty!", "error");
    }

    if (!data().ielts_score) {
      formIsValid = false;
      Println("Students", "IELTS cannot be empty!", "error");
    }

    if (formIsValid) {
      setData({
        ...data(),
        email: user.email,
      });

      handleSubmit();
    } else {
      setLoading(false);
    }
  }

  // submit Button
  const handleSubmit = async () => {
    if (student() && loggedIn()) {
      Api.put("apply/" + student().id, data())
      .then((res) => {
        const value = res.data;

        if (value.status === "success") {
          Println("Students", value.message, "success");
          handleStudent(value.data[0]);
        } else if (value.status == "failed") {
          Println("Students", value.message, "error");
        } else {
          Println("Students", "Something went wrong!", "error");
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
    } else {
      Api.post("apply", data())
        .then((res) => {
          const value = res.data;
  
          if (value.status === "success") {
            Println("Students", value.message, "success");
            handleStudent(value.data[0]);
          } else if (value.status == "failed") {
            Println("Students", value.message, "error");
          } else {
            Println("Students", "Something went wrong!", "error");
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
  };

  const handleStudent = (data) => {
    deleteStorage("student");
    setStorage("student", data);
    setStudent(data);
    setLoggedIn(true);
  }

  const onFinish = () => {
    const pengguna = getStorage("user");
    const siswa = getStorage("student");

    if (siswa && pengguna && pengguna.role == "user") {
      setStudent(siswa);
      setData({
        first_name: siswa.first_name || "",
        last_name: siswa.last_name || "",
        email: siswa.email || "",
        phone: siswa.phone || "",
        register_number: siswa.register_number || 0,
        date_of_birth: siswa.date_of_birth || "",
        region: siswa.region || "",
        toefl_score: siswa.toefl_score || 0,
        ielts_score: siswa.ielts_score || 0,
      });

      setLoggedIn(true);
      setLoading(false);
    } else if (pengguna && pengguna.role == "admin") {
      Api.get("student")
        .then((res) => {
          const value = res.data;
          const data = value.data

          if (value.status === "success") {
            setStudents(data)
            setLoading(false)
          } else if (value.status == "failed") {
            Println("Students", value.message, "error");
          } else {
            Println("Students", "Something went wrong!", "error");
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
          setLoading(false)
        });
    } else {
      setLoading(false);
    }
  }

  return (
    <AuthLayout onFinish={onFinish}>
      {user.role == "user" ? (
        <section>
          <div class="py-12 h-full">
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-500">
              <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
                <div class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p class="text-center font-semibold mx-4 mb-0">Data Diri</p>
                </div>
                <div class="mb-3">
                  <label for="first_name">Nama Depan</label>
                  <input 
                    required
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="Depan"
                    value={data().first_name}
                    disabled={loading()}
                    onchange={handleChange} 
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
                  <label for="last_name">Nama Belakang</label>
                  <input 
                    required
                    type="text"
                    id="last_name"
                    name="last_name"
                    placeholder="Belakang"
                    value={data().last_name}
                    disabled={loading()}
                    onchange={handleChange} 
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
                  <label for="last_name">Handphone</label>
                  <input 
                    required
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder="812xxxxxxxx"
                    value={data().phone}
                    disabled={loading()}
                    onchange={handleChange} 
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
                  <label for="register_number">Nomor Induk Kependudukan (NIK)</label>
                  <input 
                    required
                    type="number"
                    id="register_number"
                    name="register_number"
                    placeholder="NIK"
                    value={data().register_number}
                    disabled={loading()}
                    onchange={handleChange} 
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
                  <label for="date_of_birth">Tanggal Lahir</label>
                  <input 
                    required
                    type="date"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={data().date_of_birth}
                    disabled={loading()}
                    onchange={handleChange} 
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
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
                <div class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p class="text-center font-semibold mx-4 mb-0">Nilai Akademik</p>
                </div>
                <div class="mb-3">
                <label for="toefl_score">TOEFL</label>
                  <input 
                    required
                    type="number"
                    id="toefl_score"
                    name="toefl_score"
                    placeholder="100"
                    value={data().toefl_score}
                    disabled={loading()}
                    onchange={handleChange} 
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
                  <label for="ielts_score">IELTS</label>
                  <input 
                    required
                    type="number"
                    id="ielts_score"
                    name="ielts_score"
                    placeholder="9"
                    value={data().ielts_score}
                    disabled={loading()}
                    onchange={handleChange} 
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                {student() == null && !loggedIn() ? (
                  <button
                    type="submit" onclick={handleValidation} disabled={loading()}
                    class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light">
                    Upload
                  </button>
                ) : (
                <button
                  type="submit" onclick={handleValidation} disabled={loading()}
                  class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light">
                  Ubah
                </button>
                )}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div class="w-full mt-12">
          {loading() ? null : <GridData data={students()} field={field} />}
        </div>
      )}
    </AuthLayout>
  );
};

export default Students;