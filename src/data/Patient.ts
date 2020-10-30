export interface PatientT {
    patient_id: string
    name1: string
    name2: string
    name3: string | null
    pesel: string | null
    sex: 'M' | 'F' | 'O'
    date_of_birth: string
    date_of_death: string
}