export function VendaItemSkeleton() {
  return (
    <tr className="border-b animate-pulse">
      <td className="p-3 w-37.5">
        <div className="h-4 w-20 bg-gray-200 rounded-md" />
      </td>

      <td className="p-3 w-62.5">
        <div className="h-4 w-40 bg-gray-200 rounded-md" />
      </td>

      <td className="p-3 w-45">
        <div className="h-6 w-24 bg-gray-200 rounded-full" />
      </td>

      <td className="p-3 w-50">
        <div className="h-4 w-28 bg-gray-200 rounded-md" />
      </td>
    </tr>
  );
}
