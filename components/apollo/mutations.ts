import { gql } from '@apollo/client';

export const REGISTER_PATIENT_MUTATION = gql`
    mutation CreatePatient($CreatePatientInput: CreatePatientInput!) {
        createPatient(patientInput: $CreatePatientInput) {
            success
            message
        }
    }   
`;

export const LOGIN_PATIENT_MUTATION = gql`
    mutation LoginPatient($LoginInput: LoginInput!) {
        loginPatient(loginInput: $LoginInput) {
            id
            access_token
            rut
            first_name
            surname
            email
        }
    }   
`;

export const RECOVERY_PATIENT_MUTATION = gql`
  mutation RecoveryPatient($recoveryInput: RecoveryUserInput!) {
    recoveryPatient(recoveryInput: $recoveryInput)
  }
`;

export const VALIDATE_RECOVERY_MUTATION = gql`
  mutation ValidateRecovery($recoveryInput: ValidateRecoveryUserInput!) {
    validateRecovery(recoveryInput: $recoveryInput) {
      success
      message
    }
  }
`;

