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
  mutation LoginPersonnel($input: LoginInput!) {
    loginPersonnel(input: $input) {
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

export const UPDATE_PATIENT_MUTATION = gql`
  mutation UpdatePatient($input: CreatePatientInput!) {
    createPatient(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_PERSONNEL_MUTATION = gql`
  mutation UpdatePersonnel($input: UpdatePersonnelInput!) {
    updatePersonnel(input: $input) {
      success
      message
      personnel {
        rut
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
  }
`;

export const CREATE_BRANCH_MUTATION = gql`
  mutation CreateBranch($input: CreateBranchInput!) {
    createBranch(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_BOX_MUTATION = gql`
  mutation CreateBox($input: CreateBoxInput!) {
    createBox(input: $input) {
      success
      message
    }
  }
`;

export const ASSIGN_AVAILABILITY_MUTATION = gql`
  mutation AssignAvailability($input: AssignAvailabilityInput!) {
    assignAvailability(input: $input) {
      success
      message
    }
  }
`;

export const CREATE_APPOINTMENT_MUTATION = gql`
  mutation CreateAppointment($input: CreateAppointmentInput!) {
    createAppointment(input: $input) {
      success
      message
    }
  }
`;

export const CONFIRM_APPOINTMENT_MUTATION = gql`
  mutation ConfirmAppointment($input: ConfirmAppointmentInput!) {
    confirmAppointment(input: $input) {
      success
      message
    }
  }
`;

