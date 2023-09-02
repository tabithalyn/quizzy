import Game from "./Game";

function App() {

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-sky-500 to-indigo-500 flex flex-wrap items-center justify-center">
      <div className="flex flex-wrap items-center justify-center w-1/2">
        <h1 className="font-sans bg-indigo-200 w-full py-4 text-center text-2xl rounded-t-lg">Quizzy</h1>
        <div className="w-full bg-sky-50 flex flex-wrap items-center justify-center py-5 px-3 rounded-b-lg">
          <Game />
        </div>
      </div>
    </div>
  );
}

export default App;
