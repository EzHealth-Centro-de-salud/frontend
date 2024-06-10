"use client"
import DataTable from "react-data-table-component";
import { Personnel } from "@/interfaces/Personnel";
import { useQuery } from "@apollo/client";
import { GET_ALL_PERSONNEL_QUERY } from "@/components/apollo/queries";
import { CiEdit } from "react-icons/ci";
import { encrypt } from "@/utils/cryptoUtils";
import { useRouter } from "next/navigation";

export default function PersonnelTable() {
  const router = useRouter();
  const {
    loading: loadingPersonnel,
    error: errorPersonnel,
    data: dataPersonnel,
  } = useQuery(GET_ALL_PERSONNEL_QUERY);

  const personnel = dataPersonnel?.getAllPersonnel;

  if (loadingPersonnel) return <p>Loading...</p>;
  if (errorPersonnel) return <p>Error: {errorPersonnel.message + " sdfsdf"}</p>;


  const handleEditClick = (row: Personnel) => {
    const encryptedRut = encrypt(row.rut);
    localStorage.setItem("personnelRut", encryptedRut);
    router.push("/admin/personnel/edit");
  };

  const columns = [
    { name: "Rut", selector: (row: Personnel) => row.rut, sortable: true },
    {
      name: "Full name",
      selector: (row: Personnel) => {
        let fullName = `${row.first_name}`;
  
        if (row.middle_name) {
          fullName += ` ${row.middle_name}`;
        }
        fullName += ` ${row.surname}`;
        if (row.second_surname) {
          fullName += ` ${row.second_surname}`;
        }
        return fullName;
      },
      sortable: true,
    },
    { name: "Especialidad" , selector: (row: Personnel) => row.speciality, sortable: true },
    { name: "Email" , selector: (row: Personnel) => row.email, sortable: true },
    {
      name: "Editar",
      cell: (row: Personnel) => (
        <CiEdit
          onClick={() => handleEditClick(row)}
          style={{ cursor: "pointer" }}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="space-y-8 w-[1400px] ">
      <DataTable
        title="Lista de Personal"
        columns={columns}
        data={personnel}
        pagination
      />
    </div>
  );
}