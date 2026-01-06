import React, { useState } from 'react';

import axios from 'axios';

import Scanner from '../components/Scanner';

import { useNavigate } from 'react-router-dom';



const Verify = () => {

  const [certId, setCertId] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  const handleVerify = async () => {

    setLoading(true);

    try {

      const response = await axios.post(

        'http://localhost:5000/api/certificates/verify',

        { certificateId: certId }

      );



      setTimeout(() => {

        setLoading(false);

        // Verify.jsx ke andar ye line aisi honi chahiye:

      navigate('/result', { state: { result: response.data } });

      }, 3000);



    } catch (error) {

      setLoading(false);

      alert("Verification Failed!");

    }

  };



  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">

      {loading ? (

        <Scanner />

      ) : (

        <div className="flex flex-col gap-4">

          <h1 className="text-3xl font-bold">Verify Credential</h1>



          <input

            className="p-3 rounded bg-gray-900 border border-gray-700"

            placeholder="Enter Certificate ID"

            value={certId}

            onChange={(e) => setCertId(e.target.value)}

          />



          <button

            onClick={handleVerify}

            className="bg-blue-600 p-3 rounded-lg"

          >

            Start Forensic Scan

          </button>

        </div>

      )}

    </div>

  );

};



export default Verify;