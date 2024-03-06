import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BookTable = ({ books }) => {

  const thClass = 'border border-slate-600 rounded-md';
  const tdlass = 'border border-slate-700 rounded-md text-center';

  return (
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
        {
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
        }
      </tbody>
    </table>
  )
}
export default BookTable