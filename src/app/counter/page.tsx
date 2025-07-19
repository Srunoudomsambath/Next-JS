// // app/counter/page.tsx
// 'use client';

// import { useAppDispatch, useAppSelector } from '@/lib/hooks';
// import { increment, decrement } from '@/lib/slices/counterSlice';

// export default function CounterPage() {
//   const count = useAppSelector((state) => state.counter.value);
//   const dispatch = useAppDispatch();

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl">Redux Count: {count}</h1>
//       <button onClick={() => dispatch(increment())} className="px-3 py-1 bg-blue-600 text-white rounded mr-2">
//         +
//       </button>
//       <button onClick={() => dispatch(decrement())} className="px-3 py-1 bg-red-600 text-white rounded">
//         -
//       </button>
//     </div>
//   );
// }
