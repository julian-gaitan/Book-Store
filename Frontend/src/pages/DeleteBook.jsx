import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const DeleteBook = () => {
  const [isSending, setIsSending] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  function handleDeleteBook() {
    setIsSending(true);
    fetch(`http://localhost:5000/books/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw new Error(response.error);
        }
        navigate('/');
      })
      .catch((error) => {
        alert(`Something went wrong:\n${error.message}`);
        console.log(error);
      })
      .finally(() => setIsSending(false));
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      <div className="flex flex-col items-center border-2 border-sky-300 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        {!isSending ? (
          <button
            onClick={handleDeleteBook}
            className="p-4 bg-red-600 text-white mt-8 w-full"
          >
            Yes, Delete it
          </button>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default DeleteBook;
