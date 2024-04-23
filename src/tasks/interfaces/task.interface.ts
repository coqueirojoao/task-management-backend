export default interface ITask {
    id: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    finished_at: Date;
}