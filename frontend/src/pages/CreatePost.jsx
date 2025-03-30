import React, { useContext, useState } from 'react'
import { ImCross } from "react-icons/im";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState(null)
  const [cats, setCats] = useState([])
  const [cat, setCat] = useState('Artificial Inteligance')
  const { user } = useContext(UserContext)

  const navigate = useNavigate()

  const addCategory = () => {
    const updateCats = [...cats]
    updateCats.push(cat)
    setCat("")
    setCats(updateCats)
  }

  const deleteCats = (i) => {
    let updateCats = [...cats]
    updateCats.splice(i, 1)
    setCats(updateCats)
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const post = {
      title: title,
      desc: desc,
      username: user.username,
      userId: user._id,
      categories: cats
    }

    if (file) {
      const data = new FormData()
      const filename = Date.now() + file.name
      data.append("img", filename)
      data.append("file", file)
      post.photo = filename

      try {
        await axios.post("api/upload", data)
      } catch (err) {
        console.log(err)
      }
    }

    try {
      const res = await axios.post('api/posts/post/create', post, { withCredentials: true })
      navigate('/posts/post/' + res.data._id)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div>
        <Navbar />
        <h1 className="text-3xl font-bold text-center my-6">Create Post</h1>
      </div>
      <div className="flex flex-col items-center px-4">
        <form className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md" action="">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

<input
  type="file"
  onChange={(e) => setFile(e.target.files[0])}
  className="w-full mb-4 border border-gray-300 rounded-xl p-2 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
/>


          <div className="flex items-center gap-4 mb-4">
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Artificial Inteligance">Artificial Inteligance</option>
              <option value="Big Data">Big Data</option>
              <option value="Bock Chain">Bock Chain</option>
              <option value="Business managment">Business managment</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Data Base">Data Base</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Web Development">Web Development</option>
              <option value="Devops">Devops</option>
              <option value="App development">App development</option>
              <option value="Operating System">Operating System</option>
              <option value="EnterPrises">EnterPrises</option>
            </select>

            <div
              onClick={addCategory}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
            >
              ADD
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {cats.map((c, i) => (
              <div key={i} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                <p className="mr-2 text-sm">{c}</p>
                <p
                  onClick={() => deleteCats(i)}
                  className="text-red-500 cursor-pointer"
                >
                  <ImCross size={12} />
                </p>
              </div>
            ))}
          </div>

          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={9}
            cols={30}
            placeholder="Write your post..."
            className="w-full mb-4 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            onClick={handleCreate}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Create Post
          </button>
        </form>
      </div>
      <Footer />
    </>
  )
}

export default CreatePost
