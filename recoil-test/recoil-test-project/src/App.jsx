import { RecoilRoot } from "recoil";
import Counter from "./components/test/Counter";
import CounterList from "./components/test/CounterList";


function App() {
  return (
    <RecoilRoot>
        <Counter />
        <CounterList/>
    </RecoilRoot>
  );
}

export default App;