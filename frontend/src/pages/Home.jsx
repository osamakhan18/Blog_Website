import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import HomePost from '../components/HomePost'
import { URL } from '../url'
import Footer from '../components/Footer'
import { UserContext } from '../context/UserContext'
import { Link, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'

function Home() {
  const { search } = useLocation()
  const [post, setPost] = useState([])
  const [noresult, setNoResult] = useState(false)
  const [loader, setLoader] = useState(false)
  const { user } = useContext(UserContext)
  const [cat, setCat] = useState([])
  const [filterData, setFilterData] = useState([])

  const fetchPosts = async () => {
    setLoader(true)
    try {
      const res = await axios.get(URL + "/api/post/" + search)
      setPost(res.data)
      setFilterData(res.data)

      const sets = new Set()
      const cata = res.data.map((item) => item.categories)

      cata.forEach((category) => {
        category?.forEach((catas) => {
          if (category.length > 0) sets.add(catas)
        })
      })

      setCat(Array.from(sets))
      setNoResult(res.data.length === 0)
    } catch (err) {
      console.log(err)
    }
    setLoader(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [search])

  const fillterData = (selectedCategory) => {
    const newPost = post.filter((pos) =>
      pos.categories.includes(selectedCategory)
    )
    setFilterData(newPost)
  }

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {cat.map((category) => (
            <button
              key={category}
              onClick={() => fillterData(category)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition duration-300"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loader ? (
            <div className="col-span-full flex justify-center items-center min-h-[200px]">
              <Loader />
            </div>
          ) : !noresult ? (
            filterData.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
              >
                <Link to={user ? `/posts/post/${post._id}` : '/login'}>
                  <HomePost post={post} />
                </Link>
              </div>
            ))
          ) : (
            <h3 className="text-center text-gray-600 col-span-full">
              No posts available
            </h3>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Home
