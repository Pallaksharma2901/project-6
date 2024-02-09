const Table = ({ data, onEdit, onDelete }) => {
    return (
        <>
            <div className="relative overflow-x-auto shadow-md">
                <table className="border border-sky-600 w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs border-b border-sky-600 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Gender
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Hobbies
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Course
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3"></th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((formData, idx) => {
                            return (
                                <tr className="bg-white hover:bg-gray-50" key={idx}>
                                    <td className="px-6 py-4 capitalize font-medium text-gray-900 whitespace-nowrap">
                                        {formData.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formData.email}
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        {formData.gender}
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        {formData.hobbies.join(', ')}
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        {formData.course}
                                    </td>
                                    <td className="px-6 py-4 capitalize">
                                        {formData.address}
                                    </td>
                                    <td>
                                        <button onClick={() => onEdit(idx)}>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => onDelete(idx)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {/* <Table data={data} onEdit={onEdit ? (idx) => handleEdit(idx) : undefined} onDelete={onDelete ? (idx) => handleDelete(idx) : undefined} /> */}
            </div>
        </>
    )
}
export default Table;