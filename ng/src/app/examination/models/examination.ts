export class Examination {
    id: string;
    bodyTemperature?: string;
    heartRate?: string;
    bloodPressure?: string;
    respiratoryRate?: string;
    postedAt: Date;
    patient: string;
    postedBy: string;
}
