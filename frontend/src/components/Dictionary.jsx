import React, { useState } from 'react'


const Dictionary = () => {
    const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [gender, setGender] = useState("");

const handleAddWord = async () => {

}
  return (
    <div className="min-h-screen  text-white px-8 py-6">
    <h1 className="text-4xl font-bold mb-6 text-center">Dictionary</h1>

   
    <div className="max-w-5xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add a New Word</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Meaning"
          value={meaning}
          onChange={(e) => setMeaning(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddWord}
          className="bg-blue-600 px-6 py-2 rounded-md text-white font-semibold "
        >
          Add
        </button>
      </div>
    </div>

    
    
    </div>


  )
}

export default Dictionary
