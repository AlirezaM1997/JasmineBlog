export default function Loading() {
  return (
    <div className=" bg-white" style={{ width: "-webkit-fill-available" }}>
      <div className="bg-[#607027] p-4 text-center w-1/4 mx-auto text-white mt-32 text-lg">
        <p>Please wait ....</p>
        <div class="lds-circle mt-3">
          <div></div>
        </div>
      </div>
    </div>
  );
}
