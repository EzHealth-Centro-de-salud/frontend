import DataTable from 'react-data-table-component';
import { Branch } from "@/interfaces/Branch";
import client from "@/components/apollo/ApolloClient";
import { useQuery } from '@apollo/client';
import { GET_BRANCHES_QUERY } from '@/components/apollo/queries';

const columns = [
    {
      name: 'Address',
      selector: (row: Branch) => row.address,
      sortable: true,
    },
    {
        name: 'Box Count',
        selector: (row: Branch) => row.box_count,
        sortable: true,
    }
    
];

export default function BranchesTable(){

    const {
        loading: loadingBranches,
        error: errorBranches,
        data: dataBranches,
    } = useQuery(GET_BRANCHES_QUERY, { client });

    const branches = dataBranches?.getBranches;


    if (loadingBranches) return <p>Loading...</p>;
    if (errorBranches) return <p>Error: {errorBranches.message}</p>;

    return (
        <div className="space-y-8 w-[1000px] ">
    
            <DataTable
                title="Lista de Sucursales"
                columns={columns}
                data={branches}
                pagination
            />
        </div>
    );

}

