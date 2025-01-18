// src/components/CounterList.jsx
import { useRecoilState } from 'recoil';
import { counterFamily } from '../../recoil/atoms/counterAtom';

function CounterItem({ id }) {
  const [count, setCount] = useRecoilState(counterFamily(id));

  return (
    <>
      <h3 className="text-lg">카운터 {id}: {count}</h3>
        <button 
          className="bg-blue-500 px-4 py-2"
          onClick={() => setCount(count + 1)}
        >
          증가
        </button>
        <button 
          className="bg-red-500 px-4 py-2"
          onClick={() => setCount(count - 1)}
        >
          감소
        </button>
    </>
  );
}

function CounterList() {
  // 예시로 3개의 카운터를 생성
  return (
    <>
      <h2 className="text-2xl mb-4">카운터 리스트</h2>
      <CounterItem id={1} />
      <CounterItem id={2} />
      <CounterItem id={3} />
    </>
  );
}

export default CounterList;