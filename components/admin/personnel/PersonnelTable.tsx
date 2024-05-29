"use client"
import DataTable from "react-data-table-component";
import { Personnel } from "@/interfaces/Personnel";
import { useQuery } from "@apollo/client";
import { GET_ALL_PERSONNEL_QUERY } from "@/components/apollo/queries";




const columns = [

  { name: "Rut", selector: (row: Personnel) => row.rut, sortable: true },
  { name: "Full name", selector: (row: Personnel) => row.first_name + " " + row.middle_name+ " " + row.surname+ " " + row.second_surname, sortable: true },
  { name: "Especialidad" , selector: (row: Personnel) => row.speciality, sortable: true },
  //{ name: "Sucursal" , selector: (row: Personnel) => row.id_branch || "", sortable: true },
  { name: "Email" , selector: (row: Personnel) => row.email, sortable: true },
  
];

export default function PersonnelTable() {
  const {
    loading: loadingPersonnel,
    error: errorPersonnel,
    data: dataPersonnel,
  } = useQuery(GET_ALL_PERSONNEL_QUERY);

  const Personnel = dataPersonnel?.getAllPersonnel;


  const filteredPersonnel = Personnel?.map((personnel: Personnel) => ({
    ...personnel,
    id_branch: personnel.branch?.address,
  }));


  if (loadingPersonnel) return <p>Loading...</p>;
  if (errorPersonnel) return <p>Error: {errorPersonnel.message}</p>;

  return (
    <div className="space-y-8 w-[1400px] ">
      <DataTable
        title="Lista de Personal"
        columns={columns}
        data={filteredPersonnel}
        pagination
      />
    </div>
  );
}