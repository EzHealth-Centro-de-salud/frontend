"use client"
import DataTable from "react-data-table-component";
import { Personnel } from "@/interfaces/Personnel";
import { useQuery } from "@apollo/client";
import { GET_ALL_PERSONNEL_QUERY } from "@/components/apollo/queries";
import { CiEdit, CiTrash } from "react-icons/ci";
import { encrypt } from "@/utils/cryptoUtils";
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';

export default function PersonnelTable() {
  const router = useRouter();
  const {
    loading: loadingPersonnel,
    error: errorPersonnel,
    data: dataPersonnel,
  } = useQuery(GET_ALL_PERSONNEL_QUERY);

  const personnel = dataPersonnel?.getAllPersonnel;

  if (loadingPersonnel) return <p>Loading...</p>;
  if (errorPersonnel) return <p>Error: {errorPersonnel.message}</p>;


  const handleEditClick = (row: Personnel) => {
    const encryptedRut = encrypt(row.rut);
    localStorage.setItem("personnelRut", encryptedRut);
    router.push("/admin/personnel/edit");
  };

  const handleDeactivateClick = (row: Personnel) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres desactivar al personal con RUT ${row.rut}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, desactivar!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Add your deactivation logic, such as calling an API to update the user's status
        Swal.fire(
          'Desactivado!',
          'El usuario ha sido desactivado.',
          'success'
        );
      }
    });
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
    {
      name: "Desactivar",
      cell: (row: Personnel) => (
        <CiTrash
          onClick={() => handleDeactivateClick(row)}
          style={{ cursor: "pointer" }}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    }
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