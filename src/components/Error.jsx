const Error = ({children}) => {
  return (
    <div className="bg-red-800 mb-5 text-center font-bold rounded-lg p-3 text-white uppercase">
      <p>{children}</p>
    </div>
  );
};

export default Error;
