import { gql } from "@apollo/client";

export const GET_PATIENT_BY_RUT_QUERY = gql`
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
      appointments {
        id
        date
        time
        type
        status
        box{
          id
          box
          branch{
            id
            address
          }
        }
        personnel{
          id
          rut
          first_name
          middle_name
          surname
          second_surname
          email
          role
          speciality
          
        }
      }
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
      id
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

export const GET_ALL_BRANCHES_WITH_PERSONNEL_QUERY = gql`
  query GetAllBranches {
    getAllBranches {
      id
      box_count
      address
      personnel{
        id
        rut
        first_name
        middle_name
        surname
        second_surname
        email
        role
        speciality
        availability{
          id
          day
          turn
        }
      }
    }
  }
`;

export const CHECK_SCHEDULE_QUERY = gql`
  query CheckSchedule($CheckScheduleInput: CheckScheduleInput!) {
    checkSchedule(input: $CheckScheduleInput) {
      success
      message
    }
  }
`;

