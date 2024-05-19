import { gql } from "@apollo/client";

export const GET_PATIENT_QUERY = gql`
  query GetPatientByRut($rut: String!) {
    getPatientByRut(input: $rut) {
      id
      rut
      password
      birthdate
      first_name
      middle_name
      surname
      second_surname
      sex
      address
      region
      commune
      email
      phone
    }
  }
`;