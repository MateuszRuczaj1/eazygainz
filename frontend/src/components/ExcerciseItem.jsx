/* eslint-disable react/prop-types */
export default function ExcerciseItem({ name }) {
  return (
    <li className="flex items-center space-x-2">
      <span className="block w-2 h-2 bg-blue-500 rounded-full"></span>
      <span className="text-gray-600">{name}</span>
    </li>
  );
}
