export const BookContainer = ({ children }) => {
  return (
    <div className="flex flex-col border-2 border-sky-300 rounded-xl w-[600px] p-4 mx-auto">
      {children}
    </div>
  );
};

export const BookElement = ({ id, label, type = 'text', value, onChange }) => {
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
