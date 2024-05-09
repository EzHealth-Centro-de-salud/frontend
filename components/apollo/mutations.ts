import { gql } from "@apollo/client";

export const REGISTER_PATIENT_MUTATION = gql`
  mutation CreatePatient($CreatePatientInput: CreatePatientInput!) {
    createPatient(input: $CreatePatientInput) {
      success
      message
    }
  }
`;

export const LOGIN_PATIENT_MUTATION = gql`
  mutation LoginPatient($LoginInput: LoginInput!) {
    loginPatient(input: $LoginInput) {
      id
      access_token
      rut
      first_name
      surname
      email
    }
  }
`;

export const REGISTER_PERSONNEL_MUTATION = gql`
  mutation CreatePersonnel($input: CreatePersonnelInput!) {
    createPersonnel(input: $input) {
      success
      message
    }
  }
`;

export const LOGIN_PERSONNEL_MUTATION = gql`
  mutation LoginPersonnel($LoginInput: LoginInput!) {
    loginPersonnel(input: $LoginInput) {
      id
      access_token
      rut
      first_name
      surname
      email
      role
      speciality
    }
  }
`;

export const RECOVERY_PATIENT_MUTATION = gql`
  mutation RecoveryPatient($recoveryInput: RecoveryUserInput!) {
    recoveryPatient(input: $recoveryInput)
  }
`;

export const VALIDATE_RECOVERY_MUTATION = gql`
  mutation ValidateRecovery($recoveryInput: ValidateRecoveryUserInput!) {
    validateRecovery(input: $recoveryInput) {
      success
      message
    }
  }
`;

export const CHANGE_PASSWORD_PATIENT_MUTATION = gql`
  mutation ChangePasswordPatient($recoveryInput: ChangePasswordInput!) {
    changePasswordPatient(input: $recoveryInput) {
      success
      message
    }
  }
`;
