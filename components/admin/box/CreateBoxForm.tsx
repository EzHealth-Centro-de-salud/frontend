"use client";
import { useState } from "react";
import { CREATE_BOX_MUTATION } from "../../apollo/mutations";
import { GET_BRANCHES_QUERY } from "@/components/apollo/queries";
import { useMutation, ApolloProvider, useQuery } from "@apollo/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {  Select,  SelectContent,  SelectItem,  SelectTrigger,  SelectValue,} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import client from "@/components/apollo/ApolloClient";

interface Branch {
  id: string;
  box_count: number;
  address: string;
}

function CreateBoxForm() {
  const [idBranch, setIdBranch] = useState("");
  const [box, setBox] = useState("");
  const [loadingMutation, setLoadingMutation] = useState(false);

  const {
    loading: loadingBranches,
    error: errorBranches,
    data: dataBranches,
  } = useQuery(GET_BRANCHES_QUERY);
  const [
    createBox,
    { loading: loadingCreate, error: errorCreate, data: dataCreate },
  ] = useMutation(CREATE_BOX_MUTATION, { client });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //evita que se refresque la pagina al enviar el formulario
    setLoadingMutation(true);
    try {
      const result = await createBox({
        variables: {
          input: { id_branch: parseFloat(idBranch), box: parseFloat(box) },
        },
      });
      console.log(result);
      if (result.data.createBox.success) {
        console.log("inside if");
        setAlertType("success");
        setAlertMessage("Box creado correctamente");
      } else {
        console.log("inside else");
        setAlertType("error");
        setAlertMessage("Error al crear el box");
      }
    } catch (error) {
      console.log("inside catch");
      setAlertType("big error");
      setAlertMessage("Error al crear el box");
    } finally {
      setLoadingMutation(false);
    }
  };

  if (loadingBranches) return <p>Loading branches...</p>;
  if (errorBranches)
    return <p>Error loading branches: {errorBranches.message}</p>;

  return (
    <div className="space-y-8 w-[400px] ">
      <form onSubmit={onSubmit} className="space-y-8 ">
        <div className="grid w-full items-center gap-1.5">
          <Label className="text-[#26313c]">Número de Box</Label>
          <Input
            className="text-[#26313c]"
            required
            value={box}
            onChange={(e) => setBox(e.target.value)}
            id="box"
            type="text"
            placeholder="Ingrese el número de box"
            maxLength={12}
          />
        </div>
        <div>
          <Label className="text-[#26313c]">Branch</Label>
          <Select onValueChange={(value) => setIdBranch(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a branch" />
            </SelectTrigger>
            <SelectContent>
              {dataBranches.getBranches.map((branch: Branch) => (
                <SelectItem
                  value={branch.id + "\n" + branch.address}
                  key={branch.id}
                >
                  {branch.address}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full">
          
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={loadingMutation}
          >
            {loadingMutation ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Agregando...
              </span>
            ) : (
              "Agregar Box a Sucursal"
            )}
          </Button>
        </div>
      </form>
      {alertMessage && (
        <div className="fixed bottom-4 right-4">
          <Alert
            variant={alertType === "big error" ? "destructive" : "default"}
          >
            <AlertTitle>
              {alertType === "big error"
                ? "¡Oops, ocurrió un error!"
                : "¡Registro exitoso!"}
            </AlertTitle>
            <AlertDescription>{alertMessage}</AlertDescription>
          </Alert>
        </div>
      )}
      {errorCreate && <p>Error: {errorCreate.message}</p>}
      {dataCreate && <p>Box created successfully!</p>}
    </div>
  );
}
const CreateBoxFormComponent = () => (
  <ApolloProvider client={client}>
    <CreateBoxForm />
  </ApolloProvider>
);
CreateBoxFormComponent.displayName = "CreateBoxFormComponent";
export default CreateBoxFormComponent;
