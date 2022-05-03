export default function Loading() {
  return (
    <div className="h-screen bg-white" style={{width: '-webkit-fill-available'}}>
      <div className="bg-gray-400 p-4 text-center w-1/4 mx-auto rounded-3xl text-white mt-40 text-lg">
        <p>Please wait ....</p>
        <i className="block fa fa-circle-o-notch fa-spin mt-6"></i>
      </div>
    </div>
  );
}
