export default function Loading() {
  return (
    <div className=" bg-white" style={{ width: "-webkit-fill-available" }}>
      <div className="bg-[#607027] p-4 rounded-full text-center w-[150px] h-[150px] flex flex-col justify-center mx-auto text-white my-32 text-lg">
        <p>Please wait</p>
        <div class="lds-circle mt-3">
          <div></div>
        </div>
      </div>
    </div>
  );
}
