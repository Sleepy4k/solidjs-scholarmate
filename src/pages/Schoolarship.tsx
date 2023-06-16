import swal from "sweetalert";
import { Api } from "../services";
import { Button } from "@suid/material";
import { GridData } from "../components";
import AuthLayout from "../layouts/AuthLayout";
import { Println, getStorage } from "../utils";
import { Component, createSignal } from "solid-js";

const Schoolarship: Component = () => {
  let field = []
  const student = getStorage("student")
  const [loading, setLoading] = createSignal(true);
  const [currentPage, setCurrentPage] = createSignal(1);
  const [application, setApplication] = createSignal([]);
  const [schoolarships, setSchoolarships] = createSignal([]);
  const [schoolarship, setSchoolarship] = createSignal({
    id: 0,
    name: "",
    major: "",
    quantity: "",
    description: "",
    requirement: "",
    univ_id: 0,
  });

  const handleChange = (e: any) => {
    setSchoolarship({ ...schoolarship(), [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value });
  };

  const handleApply = (params: any) => {
    Api.post("application", {
      schoolarship_id: params.data.id,
      univ_id: params.data.univ_id,
      student_id: student.id,
      status: "pending",
      major: params.data.major
    }).then((res) => {
      const value = res.data;

      if (value.status === "success") {
        Println("Students", value.message, "success");
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
    });
  }

  const handleEdit = (params: any) => {
    setSchoolarship({
      id: params.data.id,
      name: params.data.name,
      major: params.data.major,
      quantity: params.data.quantity,
      description: params.data.description,
      requirement: params.data.requirement,
      univ_id: params.data.univ_id,
    })

    setCurrentPage(2)
  }
  
  const handleValidation = () => {
    let formIsValid = true;

    if (!schoolarship().name) {
      formIsValid = false;
      Println("Students", "Name cannot be empty!", "error");
    }

    if (!schoolarship().major) {
      formIsValid = false;
      Println("Students", "Major cannot be empty!", "error");
    }

    if (!schoolarship().quantity) {
      formIsValid = false;
      Println("Students", "Quantity cannot be empty!", "error");
    }

    if (!schoolarship().description) {
      formIsValid = false;
      Println("Students", "Description cannot be empty!", "error");
    }

    if (!schoolarship().requirement) {
      formIsValid = false;
      Println("Students", "Requirement cannot be empty!", "error");
    }

    if (!schoolarship().univ_id) {
      formIsValid = false;
      Println("Students", "University cannot be empty!", "error");
    }

    if (formIsValid) {
      submitEdit()
    } else {
      Println("Students", "Failed to edit schoolarship!", "error");
    }
  }

  const submitEdit = () => {
    Api.put("schoolarship/" + schoolarship().id, schoolarship())
      .then((res) => {
        const value = res.data;

        if (value.status === "success") {
          Println("Students", value.message, "success");
          setCurrentPage(1)
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
      });
  }

  const handleDelete = (params: any) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this schoolarship!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Api.delete("schoolarship/" + params.data.id)
          .then((res) => {
            const value = res.data;

            if (value.status === "success") {
              Println("Students", value.message, "success");
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
          });
      };
    });
  }

  const onFinish = async () => {
    const pengguna = getStorage("user")
    const siswa = getStorage("student")

    if (pengguna.role != "admin") {
      await Api.get("application/" + siswa.id)
        .then((res) => {
          const value = res.data;
          const data = value.data

          if (value.status === "success") {
            setApplication(data)
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
        });
    }

    await Api.get("schoolarship")
      .then((res) => {
        const value = res.data;
        const data = value.data

        if (value.status === "success") {
          setSchoolarships(data)
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
      });

    field = [
      { field: "id", headerName: "ID" },
      { field: "name" },
      { field: "major" },
      { field: "univ_name", headerName: "University" },
      { field: "description" },
      { field: "quantity" },
      { field: "requirement" },
      { field: "action", cellRenderer: (params: any) => (
        <div class="space-x-3">
          <Button  variant="contained" color="success" onClick={() => handleEdit(params)}>
            Edit
          </Button>
          <Button  variant="contained" color="error" onClick={() => handleDelete(params)}>
            Delete
          </Button>
        </div>
      )}
    ];

    if (pengguna.role != "admin") {
      field = [
        { field: "name" },
        { field: "major" },
        { field: "univ_name", headerName: "University" },
        { field: "description" },
        { field: "quantity" },
        { field: "requirement" },
        { field: "action", cellRenderer: (params: any) => (
          <>
            {application().filter((item: any) => item.univ_id === params.data.univ_id).length > 0 && application().filter((item: any) => item.major === params.data.major).length > 0 ? (
              <Button variant="contained" color="warning" disabled>
                Applied
              </Button>
            ) : params.data.quantity > 0 ? (
              <Button variant="contained" color="success" onClick={() => handleApply(params)}>
                Apply
              </Button>
            ) : (
              <Button variant="contained" color="error" disabled>
                Full
              </Button>
            )}
          </>
        )}
      ];
    }

    setLoading(false)
  }

  return (
    <AuthLayout onFinish={onFinish}>
      {currentPage() === 1 ? (
        <div class="w-full mt-12">
          {loading() ? null : <GridData data={schoolarships()} field={field} />}
        </div>
      ) : (
        <section>
          <div class="py-12 h-full">
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
              <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
                <div class="mb-3">
                  <label for="name">Name</label>
                  <input 
                    required
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={schoolarship().name}
                    disabled={loading()}
                    onchange={handleChange} 
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
                  <label for="major">Major</label>
                  <input 
                    required
                    type="text"
                    id="major"
                    name="major"
                    placeholder="Major"
                    value={schoolarship().major}
                    disabled={loading()}
                    onchange={handleChange} 
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
                  <label for="quantity">Quantity</label>
                  <input 
                    required
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="0"
                    value={schoolarship().quantity}
                    disabled={loading()}
                    onchange={handleChange} 
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
                  <label for="description">Description</label>
                  <input 
                    required
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Description"
                    value={schoolarship().description}
                    disabled={loading()}
                    onchange={handleChange} 
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
                  <label for="requirement">Requirement</label>
                  <input 
                    required
                    type="text"
                    id="requirement"
                    name="requirement"
                    value={schoolarship().requirement}
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
                  Ubah
                </button>
                <button
                  type="submit" onclick={() => setCurrentPage(1)} disabled={loading()}
                  class="mt-5 inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light">
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </AuthLayout>
  );
};

export default Schoolarship;