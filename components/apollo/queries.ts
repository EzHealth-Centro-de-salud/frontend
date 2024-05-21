import { gql } from "@apollo/client";

export const GET_PATIENT_QUERY = gql`
  query GetPatientByRut($rut: String!) {
    getPatientByRut(rut: $rut) {
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

export const GET_PERSONNEL_QUERY = gql`
  query GetPersonnelByRut($rut: String!) {
    getPersonnelByRut(rut: $rut) {
      rut
      password
      firstName
      middleName
      surname
      secondSurname
      email
      role
      speciality
      idBranch
    }
  }
`;

export const GET_BRANCHES_QUERY = gql`
  query GetBranches {
    getBranches {
      id
      box_count
      address
    }
  }
`;