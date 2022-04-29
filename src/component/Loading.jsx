export default function Loading() {
  return (
    <div className="h-screen bg-white">
      <div className="bg-gray-400 p-4 text-center w-1/4 mx-auto rounded-3xl text-white mt-40 text-lg">
        <p>Please wait ....</p>
        <i className="block fa fa-circle-o-notch fa-spin"></i>
      </div>
    </div>
  );
}
