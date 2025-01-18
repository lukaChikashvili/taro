import React, { useState } from 'react'
import { useCreateWordMutation, useDeleteWordMutation, useGetAllWordsQuery } from '../../redux/api/dictSlice';
import { useGetSpecificLangQuery } from '../../redux/api/languageSlice';
import { useParams } from 'react-router';
import { Trash2 } from 'lucide-react';

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [gender, setGender] = useState("");

  const [createWord] = useCreateWordMutation();

  

  const { id: langId } = useParams();
  const { data: allLangs } = useGetSpecificLangQuery(langId);
  const { data: allWords, refetch, isLoading } = useGetAllWordsQuery();

  const filteredWords = allWords?.filter((word) => word.language === langId);

  const [deleteWord] = useDeleteWordMutation();

  const handleAddWord = async () => {
    try {
      const language = allLangs;
      console.log(language);

      const res = await createWord({ word, meaning, gender, language }).unwrap();
      refetch();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };


  

  const handleWordDelete = async(id) => {
      let answer = window.confirm("do you realy want to delete?");

      if(!answer) return;

      await deleteWord(id).unwrap();
      refetch();
  }

  return (
    <div className="min-h-screen text-white px-8 py-6">
      <h1 className="text-4xl font-bold mb-6 text-center">Dictionary ({filteredWords?.length})</h1>

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
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleAddWord}
            className="bg-blue-600 px-6 py-2 rounded-md text-white font-semibold"
          >
            Add
          </button>
        </div>
      </div>

    
      <div className="overflow-x-auto mt-8 rounded-md shadow-lg max-w-5xl m-auto">
        <table className="min-w-full table-auto bg-gray-800 text-white border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Word</th>
              <th className="px-6 py-3 text-left font-semibold">Meaning</th>
              <th className="px-6 py-3 text-left font-semibold">Gender</th>
         
            </tr>
          </thead>
          <tbody>
            {filteredWords?.map((word) => (
              <tr key={word._id} className="hover:bg-gray-700">
                <td className="px-6 py-4">{word?.word}</td>
                <td className="px-6 py-4">{word?.meaning}</td>
                <td className="px-6 py-4">{word?.gender}</td>
                <td className="px-6 py-4"><Trash2 size = {20} className='text-red-400 cursor-pointer' 
                 onClick={() => handleWordDelete(word._id)}/></td>
             
                
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dictionary;
