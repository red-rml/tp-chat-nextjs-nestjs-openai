"use client";

import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import "node_modules/flag-icons/css/flag-icons.min.css";
import ReactFlagsSelect from "react-flags-select";

const socket = io("http://localhost:4000");

export default function Home() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [selectLng, setSelectLng] = useState('FR')
  const [helps, setHelps] = useState('')

  useEffect(() => {
    socket.on('messages-update', (data) => {
      setMessages(data.messages)
      setHelps(data.help ?? '')
    })

    socket.on('translated', (data) => {
      setMessages(data)
    })

    return () => {
      socket.disconnect();
    };
  }, [])

  return (
    <div className="flex items-center justify-center h-full w-full">
      <div className="w-3/6 h-3/5 bg-gray-100 rounded-lg shadow-lg p-4 overflow-hidden relative">
        <div className="flex items-center justify-between mb-4 text-gray-800">
          <h2 className="text-lg font-semibold">Chat</h2>
          <ReactFlagsSelect
            selected={selectLng}
            customLabels={{
              FR: "FR",
              GB: "GB",
              PT: "PT",
            }}
            onSelect={(code) => {
              setSelectLng(code)
            }}
            countries={['FR', 'GB', 'PT']}
            showSelectedLabel={false}
          />
        </div>
        {messages.length > 0 && (
          <div className="overflow-auto p-2" style={{
            height: `calc(100% - ${helps.length > 0 ? '165px' : '120px'} )`
          }}>
            {messages.map((currentMessage, currentMessageIndex) => (
              <div key={currentMessage.id} className={`flex flex-col mb-2 mt-4 ${currentMessage.owner === socket.id ? 'items-end' : 'items-start'} `}>
                {currentMessage.owner === socket.id ? (
                  <div className="flex">
                    <div className="rounded-lg p-2 pl-4 bg-blue-500 relative">
                      <p className="text-white">{currentMessage.message}</p>
                      <div style={{ background: currentMessage.reliability, top: '0px', height: '40px', width: '10px', borderRadius: '4px' }} className="absolute left-0"></div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-end">
                    <div className="rounded-lg p-2 pl-4 bg-gray-300 relative">
                      <p className="text-gray-800">{currentMessage.message}</p>
                      <div style={{ background: currentMessage.reliability, top: '0px', height: '40px', width: '10px', borderRadius: '4px' }} className="absolute left-0"></div>
                      <div onClick={() => {
                        socket.emit('translation', { messages, index: currentMessageIndex, message: currentMessage.message, lng: selectLng })
                      }} style={{ background: 'black', top: '-20px', padding: '2px' }} className="absolute right-0 cursor-pointer rounded-full">trad</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}


        {helps.length > 0 && (
          <div style={{ width: "auto", height: '65px' }} className="flex items-center ml-4 relative overflow-x-hidden w-full">
            <div style={{ width: "5000px" }} className="flex items-center ml-4 overflow-x-auto absolute">
              {helps.split('/').map((help, index) => (
                <div onClick={(e) => {
                  const newMess = { id: messages.length + 1, message: e.target.innerText, owner: socket.id, reliability: 'none' }
                  setMessages([...messages, newMess])
                  socket.emit('messages-update', { messages: [...messages, newMess], message: newMess.message, index: messages.length })
                  setHelps('')
                }} className="cursor-pointer ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 focus:outline-none" key={help + index}>
                  {help}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ width: 'calc(100% - 64px)' }} className="flex items-center mt-4 ml-4 absolute bottom-[16px]">
          <div className="relative w-full">
            <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} type="text" className="w-full flex-grow bg-gray-200 rounded-full px-4 py-2 text-gray-700 focus:outline-none" placeholder="Evoyer un message" />
            <button className="absolute top-1/2 -translate-y-1/2 right-[16px] rounded-full aspect-square p-2 text-white hover:bg-white hover:text-gray-60 dark:text-gray-600 dark:hover:bg-gray-600 dark:hover:text-white" title="Dictate your prompt"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 false"><path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z"></path><path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z"></path></svg></button>
          </div>
          <button onClick={() => {
            const newMess = { id: messages.length + 1, message: newMessage, owner: socket.id, reliability: 'none' }
            setMessages([...messages, newMess])
            socket.emit('messages-update', { messages: [...messages, newMess], message: newMess.message, index: messages.length })
            setNewMessage('')
          }} type="button" className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 focus:outline-none">Envoyer</button>
        </div>
      </div>
    </div>
  );
}
