const BookElement = ({ id, label, type = 'text', value, onChange }) => {
  return (
    <div>
      <label className="text-xl me-4 text-gray-500" htmlFor={id}>
        {label}
      </label>
      <input
        className="border-2 border-gray-500 ps-4 py-2 w-full"
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default BookElement;