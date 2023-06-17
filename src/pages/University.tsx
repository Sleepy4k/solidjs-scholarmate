import swal from "sweetalert";
import { Api } from "../services";
import { Button } from "@suid/material";
import { GridData } from "../components";
import { Println, getStorage } from "../utils";
import AuthLayout from "../layouts/AuthLayout";
import { Component, createSignal } from "solid-js";

const University: Component = () => {
  let field = []
  const [loading, setLoading] = createSignal(true);
  const [currentPage, setCurrentPage] = createSignal(1);
  const [universities, setUniversities] = createSignal([]);
  const [university, setUniversity] = createSignal({
    id: 0,
    name: "",
    major: "",
    description: "",
    quantity: 0,
    image: "",
    link: "",
    alias: "",
  });

  const handleChange = (e: any) => {
    setUniversity({ ...university(), [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value });
  };

  const handleEdit = (params: any) => {
    setUniversity({
      id: params.data.id,
      name: params.data.name,
      major: params.data.major,
      description: params.data.description,
      quantity: params.data.quantity,
      image: params.data.image,
      link: params.data.link,
      alias: params.data.alias,
    })

    setCurrentPage(2)
  }
  
  const handleValidation = () => {
    let formIsValid = true;

    if (!university().name) {
      formIsValid = false;
      Println("Students", "Name cannot be empty!", "error");
    }

    if (!university().major) {
      formIsValid = false;
      Println("Students", "Major cannot be empty!", "error");
    }

    if (!university().quantity) {
      formIsValid = false;
      Println("Students", "Quantity cannot be empty!", "error");
    }

    if (!university().description) {
      formIsValid = false;
      Println("Students", "Description cannot be empty!", "error");
    }

    if (!university().image) {
      formIsValid = false;
      Println("Students", "Image cannot be empty!", "error");
    }

    if (!university().link) {
      formIsValid = false;
      Println("Students", "Link cannot be empty!", "error");
    }

    if (!university().alias) {
      formIsValid = false;
      Println("Students", "Alias cannot be empty!", "error");
    }

    if (formIsValid) {
      submitEdit()
    } else {
      Println("Students", "Failed to edit university!", "error");
    }
  }

  const submitEdit = () => {
    Api.put("university/" + university().id, university())
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
      text: "Once deleted, you will not be able to recover this university!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Api.delete("university/" + params.data.id)
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
    const user = getStorage("user")

    await Api.get("university")
      .then((res) => {
        const value = res.data;
        const data = value.data

        if (value.status === "success") {
          setUniversities(data)
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
      { field: "alias" },
      { field: "major" },
      { field: "description" },
      { field: "quantity" },
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
  
    if(user.role != "admin"){
      field = [
        { field: "name" },
        { field: "major" },
        { field: "description" },
        { field: "quantity" },
      ];
    }
    
    setLoading(false)
  }

  return (
    <AuthLayout onFinish={onFinish}>
      {currentPage() === 1 ? (
        <div class="w-full mt-12">
          {loading() ? null : <GridData data={universities()} field={field} />}
        </div>
      ) : (
        <section>
          <div class="py-12 h-full">
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-500">
              <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
                <div class="mb-3">
                  <label for="name">Name</label>
                  <input 
                    required
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={university().name}
                    disabled={loading()}
                    onchange={handleChange} 
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
                  <label for="alias">Alias</label>
                  <input 
                    required
                    type="text"
                    id="alias"
                    name="alias"
                    value={university().alias}
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
                    value={university().major}
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
                    value={university().quantity}
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
                    value={university().description}
                    disabled={loading()}
                    onchange={handleChange} 
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
                  <label for="link">Web Url</label>
                  <input 
                    required
                    type="text"
                    id="link"
                    name="link"
                    value={university().link}
                    disabled={loading()}
                    onchange={handleChange} 
                    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div class="mb-3">
                  <label for="image">Image Url</label>
                  <input 
                    required
                    type="text"
                    id="image"
                    name="image"
                    value={university().image}
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

export default University;