import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function AddEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    countInStock: "",
  });

  useEffect(() => {
    if (id) {
      API.get(`/products/${id}`).then((res) =>
        setForm(res.data)
      );
    }
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (id) {
      await API.put(`/products/${id}`, form);
    } else {
      await API.post("/products", form);
    }
    navigate("/admin");
  };

  return (
    <form onSubmit={submitHandler} className="max-w-md mx-auto p-4">
      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          value={form[key]}
          className="border w-full p-2 mb-3"
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
        />
      ))}
      <button className="bg-blue-600 text-white w-full py-2 rounded">
        Save
      </button>
    </form>
  );
}
