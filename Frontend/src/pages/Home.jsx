import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let ignore = false;
    fetch('http://localhost:5000/books/', { method: 'GET' })
      .then((response) => response.json())
      .then((response) => {
        if (!ignore) {
          setBooks(response.books);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      ignore = true;
    };
  }, []);

  const thClass = 'border border-slate-600 rounded-md';
  const tdlass = 'border border-slate-700 rounded-md text-center';
  return (
    <div className="py-4 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-4xl text-sky-700" />
        </Link>
      </div>
      <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className={thClass}>#</th>
            <th className={thClass}>Title</th>
            <th className={thClass + ' max-md:hidden'}>Author</th>
            <th className={thClass + ' max-md:hidden'}>Publish Year</th>
            <th className={thClass}>Operation</th>
          </tr>
        </thead>
        <tbody>
          {books.length ? (
            books.map((book, index) => {
              return (
                <tr key={book._id} className='h-8'>
                  <td className={tdlass}>{index + 1}</td>
                  <td className={tdlass}>{book.title}</td>
                  <td className={tdlass + ' max-md:hidden'}>{book.author}</td>
                  <td className={tdlass + ' max-md:hidden'}>{book.publishYear}</td>
                  <td className={tdlass}>
                    <div className="flex justify-center gap-x-4">
                      <Link to={`/books/read/${book._id}`}>
                        <BsInfoCircle className='text-2xl text-green-800' />
                      </Link>
                      <Link to={`/books/update/${book._id}`}>
                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                      </Link>
                      <Link to={`/books/delete/${book._id}`}>
                        <MdOutlineDelete className='text-2xl text-red-600' />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <Spinner />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
