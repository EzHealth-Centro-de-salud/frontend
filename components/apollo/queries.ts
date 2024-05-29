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
      first_name
      middle_name
      surname
      second_surname
      email
      role
      speciality
      branch{
        id
        address
      }
    }
  }
`;

export const GET_ALL_BRANCHES_QUERY = gql`
  query GetAllBranches {
    getAllBranches {
      id
      box_count
      address
    }
  }
`;

export const GET_ALL_PATIENTS_QUERY = gql`
  query GetAllPatients {
    getAllPatients {
      id
      rut
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

export const GET_ALL_PERSONNEL_QUERY = gql`
  query GetAllPersonnel {
    getAllPersonnel {
      rut
      first_name
      middle_name
      surname
      second_surname
      email
      role
      speciality
      branch{
        id
        box_count
        address
      }
    }
  }
`;