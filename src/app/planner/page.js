"use client"; // Client Component로 설정

import { useState } from 'react';
import Nav from '../components/nav';

export default function Planner() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  // 추가
  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      setItems((prevItems) => [...prevItems, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold">일일 플래너</h1>
        <p>일일 플래너에 계획을 추가해보세요!</p>
        {}
        <div className="mb-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1"
            placeholder="항목 입력"
          />
          <button
            onClick={handleAddItem}
            className="bg-green-500 text-white px-4 py-1 rounded ml-2"
          >
            추가
          </button>
        </div>

        {}
        <div className="w-full max-w-md">
          <ul className="list-disc pl-5">
            {items.map((item, index) => (
              <li key={index} className="border-b border-gray-200 py-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}
