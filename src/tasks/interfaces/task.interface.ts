export default interface ITask {
    id: number;
    user_id: number;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}