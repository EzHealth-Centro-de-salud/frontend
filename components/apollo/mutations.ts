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
    mutation LoginPatient($loginInput: loginInput!) {
        loginPatient(loginInput: $loginInput) {
            id
            access_token
            rut
            first_name
            surname
            email
        }
    }   
`;