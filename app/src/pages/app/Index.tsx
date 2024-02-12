function Index() {
  return (
    <div className="h-full w-full flex items-center justify-center ">
      <div className="p-6 w-[24%] flex gap-2 flex-col items-center justify-center border rounded">
        <img
          alt="elon musk"
          draggable={false}
          className="h-24 w-24 rounded-full mx-auto"
          src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=elon_musk`}
        />
        <p className="pt-2 text-lg font-semibold">Elon Musk</p>
        <p className="text-sm">elon_musl@gmai.com</p>
        <div className="mt-5">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Index;
